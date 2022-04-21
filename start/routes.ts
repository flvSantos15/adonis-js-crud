/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { gretting: 'Hello World flvSantos!' }
  })

  // qnd acesso a rota moments, quero acesso o controler e a função dentro dele
  // pq posso ter mais de uma função dentro do mesmo controller
  // post pq quero inserir algo
  // se eu quiser apenas uma rota de post uso como abaixo
  // Route.post('/moments', 'MomentsController.store')
  // agr se quero mais de um uso dessa forma a baixo
  // o resource vai me retornar todos metodos
  // apiOnly() vai me retornar apenas os metodos de api
  Route.resource('/moments', 'MomentsController').apiOnly()

  Route.resource('/moments/:momentId/comments', 'CommentsController').apiOnly()
  // Route.post('/moments/:momentId/comments', 'CommentsController.store')
}).prefix('/api')

// const flvSantos = {
//   name: 'Flavio',
//   age: 27,
//   address: 'Rua 7 casa 8-c',
// }

// Route.get('/user/:userName', async ({ params }) => {
//   const user = params.userName
//   if (user === flvSantos.name) {
//     return { message: `Welcome ${user}` }
//   } else {
//     return { message: `You're not him!` }
//   }
// })
