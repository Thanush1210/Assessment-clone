import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Post from "App/Models/Post";
import Comment from "App/Models/Comment";

export default class PostsController {

  public async store({ request, response }: HttpContextContract) {
    const postValidator = schema.create({
      tweet: schema.string(),
      caption: schema.string(),
    });

    const commentValidator = schema.create({
      comments: schema.array().members(schema.string()),
    });

    const payload = await request.validate({ schema: postValidator });
    const commentPayload = await request.validate({ schema: commentValidator });

    const post = await Post.create(payload);
    if (commentPayload.comments.length > 0) {
      commentPayload.comments.map(async (commentText) => {
        await Comment.create({
          comment: commentText,
          postId: post.id,
        });
      });
    }
    return response.json({ message: "Posted successfully!" });
  }

  public async index({ response }: HttpContextContract) {
    const posts = await Post.query()
      .join("comments", "posts.id", "comments.post_id")
      .select("posts.*", "comments.comment")
      .orderBy("posts.id", "asc");

    const postData = posts.map((list) => {
      return {
        id: list.$original.id,
        tweet: list.$original.tweet,
        caption: list.$original.caption,
        comments: list.$extras.comment,
      };
    });
    // console.log(posts);
    return response.json(postData);
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { tweet, caption } = await request.validate({
        schema: schema.create({
          tweet: schema.string(),
          caption: schema.string(),
        }),
      });
      const postData = await Post.findOrFail(params.id);
      postData.tweet = tweet;
      postData.caption = caption;
      await postData.save();
      return response.json({ message: "Updated Successfully!" });
    } catch (error) {
      console.log(error);
    }
  }

  public async delete({ params }: HttpContextContract) {
    try {
      const { id } = params;
      await Comment.query().where("postId", id).delete();
      const post = await Post.findOrFail(id);
      await post.delete();
      return post;
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }
}
