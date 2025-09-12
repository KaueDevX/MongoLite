const crypto = require("crypto");

function generateId() {
  const timestamp = Date.now().toString(16);
  const randomPart = Math.floor(Math.random() * 1e12).toString(36);
  const id = (timestamp + randomPart).slice(0, 25);
  return `_${id}`;
}

module.exports = {
  insertMany(documents) {
    try {
      if (!Array.isArray(documents)) {
        throw new Error("Documents must be an array of objects.");
      }
      documents.forEach((doc) => this.insertOne(doc));
      return {
        success: true,
        insertedCount: documents.length,
        documents,
      };
    } catch (error) {
      console.error("Insert Error:", error.message);
      return {
        success: false,
        insertedCount: 0,
      };
    }
  },
  insertOne(document) {
    try {
      if (
        typeof document !== "object" ||
        Array.isArray(document) ||
        document === null
      ) {
        throw new Error("Document must be a non-null object.");
      }
      document._id = document._id || generateId();
      this.db.data.body[this.name].push(document);
      this.db._persist();
      return { success: true, document };
    } catch (error) {
      console.error("InsertOne Error:", error.message);
      return { success: false };
    }
  },
};
