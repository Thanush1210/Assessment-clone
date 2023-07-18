import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Media from "App/Models/Media";

export default class MediaController {
  public async store({ request }: HttpContextContract) {
    const inputData = request.only(["tweet", "caption", "comment"]);
    const media = await Media.create(inputData);
    return media;
  }

  public async index() {
    const media = await Media.all();
    return media;
  }

  public async destroy({ params }: HttpContextContract) {
    const media = await Media.findOrFail(params.id);
    await media.delete();
    return { message: "Post deleted successfully" };
  }

  public async update({ request, params, response }: HttpContextContract) {
    const media = await Media.findOrFail(params.id);
    const inputData = request.only(["tweet", "caption", "comment"]);
    media.merge(inputData);
    await media.save();
    return response.json(media);
  }
}
