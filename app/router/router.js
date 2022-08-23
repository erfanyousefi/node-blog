// const { CategoryApiPrisma } = require("./prisma-api/category.api");
const { HomeRoutes } = require("./api");
const { AdminRoutes } = require("./admin/admin.routes");
const router = require("express").Router();

router.use("/admin", AdminRoutes)
router.use("/", HomeRoutes)
module.exports = {
    AllRoutes : router
}