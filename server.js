const http = require("http");
require("dotenv").config();

const mongoDBConnect = require("./db/mongoDB");

const app = require("./app");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    await mongoDBConnect();
    server.listen(PORT, () => {
      console.log(`Server Listening to PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
