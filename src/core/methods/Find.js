module.exports = {
  findOne(query) {
    return this.db.data.body[this.name].find((doc) =>
      Object.keys(query).every((key) => doc[key] === query[key])
    );
  },

  find(query = {}) {
    return this.db.data.body[this.name].filter((doc) =>
      Object.keys(query).every((key) => doc[key] === query[key])
    );
  },
};
