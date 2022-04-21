import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'

export default class Moment extends BaseModel {
  // digo q ele tem varios comments
  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  // aqui crio como coluna um id que será unico e do tipo number
  @column({ isPrimary: true })
  public id: number

  // column title type string
  @column()
  public title: string

  // column description type string
  @column()
  public description: string

  // column image also type string
  @column()
  public image: string

  // aqui crio outra coluna que será criada automaticamente do tipo Date na criação
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // aqui crio outra coluna que será criada automaticamente do tipo Date no update
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
