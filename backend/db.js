const mongoose = require("mongoose");

const mongooseURI = process.env.MONGOURI;
const connectionParams = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
};
const connectToMongo = () => {
  mongoose
    .connect(mongooseURI, connectionParams)
    .then((result) => {
      console.log("Connect to mongo successfully");
    })
    .catch((err) => {
      console.log("Connection is failed");
    });
};

module.exports.connectToMongo = connectToMongo;
