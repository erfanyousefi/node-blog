const { AdminApiBlogRouter } = require("./blog");
const AdminRoutes = require("express").Router();
AdminRoutes.use("/blogs", AdminApiBlogRouter)
module.exports = {
    AdminRoutes
}