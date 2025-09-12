module.exports = {
  updateOne(filter, update) {
    try {
      const collection = this.db.data.body[this.name];
      const index = collection.findIndex((doc) =>
        Object.keys(filter).every((key) => doc[key] === filter[key])
      );
      if (index === -1) {
        return { success: false, message: "No document matches the filter." };
      }
      collection[index] = { ...collection[index], ...update };
      this.db._persist();
      return { success: true, document: collection[index] };
    } catch (error) {
      console.error("UpdateOne Error:", error.message);
      return { success: false };
    }
  },
  updateMany(filter, update) {
    try {
      const collection = this.db.data.body[this.name];
      let updatedCount = 0;
      collection.forEach((doc, index) => {
        if (Object.keys(filter).every((key) => doc[key] === filter[key])) {
          collection[index] = { ...doc, ...update };
          updatedCount++;
        }
      });
      this.db._persist();
      return { success: true, updatedCount };
    } catch (error) {
      console.error("UpdateMany Error:", error.message);
      return { success: false };
    }
  },
};
