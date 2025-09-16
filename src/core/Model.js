const Collection = require("./Collection");

class Model {
  constructor(name, schema, db) {
    this.name = name;
    this.schema = schema;
    this.db = db;
  }

  insertOne(doc) {
    this.schema.validate(doc);
    return new Collection(this.name, this.db).insertOne(doc);
  }

  insertMany(docs) {
    if (!Array.isArray(docs)) {
      throw new Error("InsertMany requires an array of documents.");
    }
    for (const doc of docs) {
      this.schema.validate(doc);
    }
    return new Collection(this.name, this.db).insertMany(docs);
  }

  findOne(filter) {
    return new Collection(this.name, this.db).findOne(filter);
  }

  find(filter) {
    return new Collection(this.name, this.db).find(filter);
  }

  updateOne(filter, updated) {
    this.schema.validate(updated);
    return new Collection(this.name, this.db).updateOne(filter, updated);
  }

  updateMany(filter, updated) {
    if (!Array.isArray(updated)) {
      throw new Error("UpdateMany requires an array of updated documents.");
    }
    for (const doc of updated) {
      this.schema.validate(doc);
    }
    return new Collection(this.name, this.db).updateMany(filter, updated);
  }

  deleteOne(filter) {
    return new Collection(this.name, this.db).deleteOne(filter);
  }

  deleteMany(filter) {
    return new Collection(this.name, this.db).deleteMany(filter);
  }
}

module.exports = Model;
