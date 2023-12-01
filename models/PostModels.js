const { model, Schema, Model } = require("mongoose");

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    likes: [],
    image: String,
  },
  { timestamps: true }
);

const PostModel =  model("posts" , PostSchema) 
module.exports = PostModel
