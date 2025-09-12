module.exports = {
  deleteOne(filter) {
    try {
      const collection = this.db.data.body[this.name];
      const index = collection.findIndex((doc) =>
        Object.keys(filter).every((key) => doc[key] === filter[key])
      );
      if (index === -1) {
        return { success: false, message: "No document matches the filter." };
      }
      const deletedDocument = collection.splice(index, 1)[0];
      this.db._persist();
      return { success: true, document: deletedDocument };
    } catch (error) {
      console.error("DeleteOne Error:", error.message);
      return { success: false };
    }
  },
  deleteMany(filter) {
    try {
      const collection = this.db.data.body[this.name];
      const initialLength = collection.length;
      this.db.data.body[this.name] = collection.filter(
        (doc) => !Object.keys(filter).every((key) => doc[key] === filter[key])
      );
      const deletedCount = initialLength - this.db.data.body[this.name].length;
      this.db._persist();
      return { success: true, deletedCount };
    } catch (error) {
      console.error("DeleteMany Error:", error.message);
      return { success: false };
    }
  },
};
