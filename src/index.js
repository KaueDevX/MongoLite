const path = require("path");
const fs = require("fs");

const Collection = require("./core/Collection");

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
          createdAt: new Date().toISOString(),
          version: "1.0.0",
        },
        body: {},
      };
      this._persist();
    } else {
      this.data = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
      if (this.data.header?.signature !== "MongoLiteDB") {
        throw new Error("File is not a valid MongoLite database.");
      }
    }
  }
  collection(name) {
    if (!this.data.body[name]) {
      this.data.body[name] = [];
      this._persist();
    }
    return new Collection(name, this);
  }
  _persist() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }
}

module.exports = MongoLite;
module.exports.default = MongoLite;
