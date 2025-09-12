const insertMethods = require("./methods/Insert");
const updateMethods = require("./methods/Update");
const deleteMethods = require("./methods/Delete");
const findMethods = require("./methods/Find");

class Collection {
  constructor(name, db) {
    this.name = name;
    this.db = db;
  }
  insertMany(doc) {
    return insertMethods.insertMany.call(this, doc);
  }
  insertOne(doc) {
    return insertMethods.insertOne.call(this, doc);
  }
  find(query, options) {
    return findMethods.find.call(this, query, options);
  }
  findOne(query, options) {
    return findMethods.findOne.call(this, query, options);
  }
  updateOne(filter, update) {
    return updateMethods.updateOne.call(this, filter, update);
  }
  updateMany(filter, update) {
    return updateMethods.updateMany.call(this, filter, update);
  }
  deleteOne(filter) {
    return deleteMethods.deleteOne.call(this, filter);
  }
  deleteMany(filter) {
    return deleteMethods.deleteMany.call(this, filter);
  }
}

module.exports = Collection;
module.exports.default = Collection;
