const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors")
require("dotenv").config()
const { AllRoutes } = require("./router/router");
const expressBasicAuth = require("express-basic-auth");

module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    this.#app.use(cors())
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      expressBasicAuth({
        users: {'behrooz': "blog-nodejs-123"},
        challenge: true,
      }),
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "PersonalBlog",
              version: "2.0.0",
              description:
                "nodejs weblog",
              contact: {
                name: "Erfan Yousefi",
                url: "https://freerealapi.com",
                email: "erfanyousefi.co@gmail.com",
              },
            },
            servers: [
              {
                url: "http://localhost:2000",
              }
            ],
            components : {
              securitySchemes : {
                BearerAuth : {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                  
                }
              }
            },
            security : [{BearerAuth : [] }]
          },
          apis: ["./app/router/**/*.js"],
        }),
        {explorer: true},
      )
    );
  }
  createServer() {
    const http = require("http");
    const server = http.createServer(this.#app)
    server.listen(this.#PORT, () => {
      console.log("swagger run > http://localhost:" + this.#PORT + "/api-doc");
    });
  }
  connectToMongoDB() {
    mongoose.connect(this.#DB_URI, (error) => {
      if (!error) return console.log("conected to MongoDB");
      return console.log(error.message);
    });
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to DB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("mongoose connection is disconnected");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("disconnected");
      process.exit(0);
    });
  }
  createRoutes() {
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        statusCode,
        errors: {
          message,
        },
      });
    });
  }
};
