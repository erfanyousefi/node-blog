const Application = require("./app/server");
new Application(+process.env.APPLICATION_PORT, "mongodb://localhost:27017/storeDB")