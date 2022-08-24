const { createBlogSchema } = require("../../../validators/admin/blog.schema")
const Controller = require("../../controller")
const path = require("path");
const { BlogModel } = require("../../../../models/blogs");
const { StatusCodes:HttpStatus} = require("http-status-codes")
const createError = require("http-errors");
const { unlinkSync } = require("fs");
class BlogController extends Controller {
    async createBlog(req, res, next){
        try {
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            req.body.image =path.join(blogDataBody.fileUploadPath, blogDataBody.filename)
            req.body.image = req.body.image.replace(/\\/g, "/")
            const {title, description, header, author} = blogDataBody;
            const image =  req.body.image
            await BlogModel.create({title,image, description, header, author})
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data : {
                    message : "ایجاد بلاگ با موفقیت انجام شد"
                }
            })
        } catch (error) {
            unlinkSync(req.file.path)
            next(error)
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
    async deleteBlogById(req, res, next){
        try {
            const {id} = req.params;
            await this.findBlog(id);
            const result = await BlogModel.deleteOne({_id : id});
            if(result.deletedCount == 0) throw createError.InternalServerError("حذف انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    message : "حذف مقاله با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlogById(req, res, next){
        try {
            const {id} = req.params;
            await this.findBlog(id);
            if(req?.body?.fileUploadPath &&  req?.body?.filename){
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename)
                req.body.image = req.body.image.replace(/\\/g, "/")
            }
            const data = req.body;
            let nullishData = ["", " ", "0", 0, null, undefined]
            let blackListFields = ["_id"]
            Object.keys(data).forEach(key => {
                if(blackListFields.includes(key)) delete data[key]
                if(typeof data[key] == "string") data[key] = data[key].trim();
                if(Array.isArray(data[key]) && data[key].length > 0 ) data[key] = data[key].map(item => item.trim()) 
                if(nullishData.includes(data[key])) delete data[key];
            })
            const updateResult = await BlogModel.updateOne({_id : id}, {$set : data})
            if(updateResult.modifiedCount == 0) throw createError.InternalServerError("به روز رسانی انجام نشد")

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data : {
                    message : "به روز رسانی بلاگ با موفقیت انجام شد"
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
}

module.exports = {
    AdminBlogController : new BlogController()
}