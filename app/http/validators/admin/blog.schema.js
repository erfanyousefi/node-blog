const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans");
const createBlogSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    description: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    header: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    author: Joi.string().error(createError.BadRequest("نام نویسنده ارسال شده صحیح نمیباشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    fileUploadPath : Joi.allow()
});

module.exports = {
    createBlogSchema
}