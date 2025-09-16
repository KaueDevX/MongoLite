const MongoLite = require("mongolitedb");

const Database = new MongoLite("MyBase.db");

const schema = Database.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Users = Database.model("users", schema);

const result = Users.find({
  name: "EU",
});

console.log(result);
