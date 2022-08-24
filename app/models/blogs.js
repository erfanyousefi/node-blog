const { default: mongoose } = require("mongoose");
const BlogSchema = new mongoose.Schema({
    author : {type : String, required : true},
    title : {type : String, required : true},
    header : {type : String, required : true},
    description : {type : String, required : true},
    image : {type : String, required : true}
}, {
    timestamps : true, 
    versionKey : false,
    toJSON : {
        virtuals: true
    }
});

BlogSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})
module.exports = {
    BlogModel : mongoose.model("blog", BlogSchema)
}