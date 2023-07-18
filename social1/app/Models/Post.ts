import { DateTime } from 'luxon'
import { BaseModel, column , hasMany , HasMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  tweet: string;

  @column()
  caption: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Comment, {
    foreignKey: "post_id",
  })
  public orders: HasMany<typeof Comment>;
  comment: any;
}
