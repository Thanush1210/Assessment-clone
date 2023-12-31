import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Post from "./Post";

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  comment: string;

  @column({ columnName: "post_id" })
  postId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Post, {
    foreignKey: "post_id",
  })
  public customer: BelongsTo<typeof Post>;
}
