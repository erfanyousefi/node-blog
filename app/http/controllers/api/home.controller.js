const createError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { BlogModel } = require("../../../models/blogs");
const Controller = require("../controller");
module.exports = new (class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      return res.status(200).send("Index Page Store");
    } catch (error) {
      next(error);
    }
  }
  async getOneBlogById(req, res, next){
    try {
        const {id} = req.params;
        const blog = await this.findBlog(id);
        return res.status(HttpStatus.OK).json({
            statusCode : HttpStatus.OK,
            data : {
                blog
            }
        })
    } catch (error) {
        next(error)
    }
}
async getListOfBlogs(req, res, next){
    try {

        const blogs = await BlogModel.find({})
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
                blogs
            }
        })
    } catch (error) {
        next(error)
    }
}
async findBlog(id) {
  const blog = await BlogModel.findById(id);
  if(!blog) throw createError.NotFound("مقاله ای یافت نشد");
  return blog
}
})();
