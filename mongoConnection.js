const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://webslinger74:${process.env.PASSWORD}@clustersteven.5yh4t.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
/* client.connect(err => {
  const collection = client.db("test").collection("devices");
    console.log("connected to the database");
  // perform actions on the collection object
  client.close();
}); */

module.exports = client;