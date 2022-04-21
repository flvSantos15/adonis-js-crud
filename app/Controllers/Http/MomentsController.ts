// import a version 4 desse pacote
import { v4 as uuidv4 } from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import Application from '@ioc:Adonis/Core/Application'

// 1rst crio o controller depois link no routes

export default class MomentsController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }
  // store de guardar/salvar/inserir
  public async store({ request, response }: HttpContextContract) {
    // preciso dos dados(req, res)
    const body = request.body()

    const image = request.file('image', this.validationOptions)
    // antes de enviar a image
    if (image) {
      // preciso dar novos nome, pois as vezes as imagens vem com nomes iguais
      const imageName = `${uuidv4()}.${image.extname}`

      // depois faço subo a imagem p uploads dentro do db
      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      // altero o nome da img com o nome aleatório
      body.image = imageName
    }

    // crio um novo moment
    const moment = await Moment.create(body)
    // digo que a responsta é de sucesso
    response.status(201)
    // retorno uma msg com o dado criado
    return {
      message: 'Momento criado com sucesso!',
      data: moment,
    }
  }

  // aqui vou resgatar todos os registros
  public async index() {
    // put all datas from Moment in a variable and its comments
    const moments = await Moment.query().preload('comments')

    //return all moments inside data
    return {
      data: moments,
    }
  }

  // aqui vou resgatar um único registro por um id especifico
  public async show({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)

    await moment.load('comments')

    return {
      data: moment,
    }
  }

  // aqui deletoum único registro pelo id
  public async destroy({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)

    await moment.delete()

    return {
      message: 'Momento excluido com sucesso!',
      data: moment,
    }
  }

  // agora o metodo de update
  public async update({ params, request }: HttpContextContract) {
    // preciso dos dados do body
    const body = request.body()

    // verificar se existe esse momento
    const moment = await Moment.findOrFail(params.id)

    // se existe quero alterar o title e description
    moment.title = body.title
    moment.description = body.description

    // verifico se a image q quero alterar é a mesma do body
    // e se existe essa image
    if (moment.image !== body.image || !moment.image) {
      // vou pegar a image nova e fazer a validação
      const image = request.file('image', this.validationOptions)

      // verifico se veio imagem
      if (image) {
        // gero um novo nome aleatório pra essa image
        const imageName = `${uuidv4()}.${image.extname}`

        await image?.move(Application.tmpPath('uploads'), {
          name: imageName,
        })

        moment.image = imageName
      }
    }

    await moment.save()

    return {
      message: 'Momento updated com sucesso!',
      data: moment,
    }
  }
}
