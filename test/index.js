const MongoLite = require("../src");

const Database = new MongoLite("MyBase.db");

const users = Database.collection("Usuarios");

console.log(users.findOne({ name: "John" }));
//console.log(users.insertOne({ name: "John", age: 30 }));
