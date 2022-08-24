const homeController = require("../../http/controllers/api/home.controller");
const router = require("express").Router();

router.get("/", homeController.indexPage);
router.get("/blogs", homeController.getListOfBlogs);
router.get("/blogs/:id", homeController.getOneBlogById);
module.exports = {
    HomeRoutes : router
}