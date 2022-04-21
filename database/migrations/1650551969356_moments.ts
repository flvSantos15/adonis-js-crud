import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Moments extends BaseSchema {
  protected tableName = 'moments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // no moment crei arquivos q serão colunas, aqui vou inserir esses dados no db
      table.increments('id') // insiro o id
      table.string('title') // insiro o title
      table.string('description') // insiro a description
      table.string('image') // insiro a image

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }) // insiro as duas datas tmb
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
