import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username')
      table.string('text')

      // faço uma relaçao
      // um comentário só pode ter 1 momento
      // um momento pde ter varios comentarios
      // cada comentário tera um id
      // .onDelete('CASCADE') se eu deletar 1 momento todos os comentarios são deletados
      table.integer('moment_id').unsigned().references('moments.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
