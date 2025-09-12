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
      this.db.data.body[this.name].push(document);
      this.db._persist();
      return { success: true, document };
    } catch (error) {
      console.error("InsertOne Error:", error.message);
      return { success: false };
    }
  },
};
