const msgpack = require("msgpack-lite");
const crypto = require("crypto");
const zlib = require("zlib");
const path = require("path");
const fs = require("fs");

const Collection = require("./core/Collection");

function generateHash(obj) {
  const json = JSON.stringify(obj);
  return crypto.createHash("sha256").update(json).digest("hex");
}
class MongoLite {
  constructor(MongoFilePath) {
    if (!MongoFilePath) {
      throw new Error("You must provide a valid path to the database file.");
    }
    this.filePath = path.resolve(process.cwd(), MongoFilePath);
    if (!this.filePath.endsWith(".db")) {
      throw new Error("The database file must have a .db extension.");
    }
    if (!fs.existsSync(this.filePath)) {
      this.data = {
        header: {
          signature: "MongoLiteDB",
          version: "1.0.2",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          hash: "",
        },
        body: {},
      };
      this._persist();
    }
    this.loadFromDisk();
  }

  collection(name) {
    if (!this.data.body[name]) {
      this.data.body[name] = [];
      this._persist();
    }
    return new Collection(name, this);
  }

  _persist() {
    this.data.header.updatedAt = new Date().toISOString();
    this.data.header.hash = generateHash(this.data.body);
    const buffer = msgpack.encode(this.data);
    const compressed = zlib.gzipSync(buffer);
    const tempPath = this.filePath + ".tmp";
    fs.writeFileSync(tempPath, compressed);
    fs.renameSync(tempPath, this.filePath);
  }

  loadFromDisk() {
    const compressed = fs.readFileSync(this.filePath);
    const buffer = zlib.gunzipSync(compressed);
    this.data = msgpack.decode(buffer);

    if (this.data.header?.signature !== "MongoLiteDB") {
      throw new Error("File is not a valid MongoLite database.");
    }

    const bodyHash = generateHash(this.data.body);
    if (bodyHash !== this.data.header.hash) {
      throw new Error("File integrity check failed. Data may be corrupted.");
    }
  }
}

module.exports = MongoLite;
module.exports.default = MongoLite;
