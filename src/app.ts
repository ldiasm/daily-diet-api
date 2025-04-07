import { fastify } from 'fastify'
import cookie from '@fastify/cookie'

import { mealsRoutes } from './routes/meals-routes'
import { usersRoutes } from './routes/users-routes'

export const app = fastify()

// Handler para requisições OPTIONS (preflight)
app.options('*', (request, reply) => {
  reply.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  reply.header('Access-Control-Allow-Headers', 'Content-Type')
  reply.header('Access-Control-Allow-Credentials', 'true')
  reply.send()
})

app.addHook('onRequest', (request, reply, done) => {
  reply.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  reply.header('Access-Control-Allow-Headers', 'Content-Type')
  reply.header('Access-Control-Allow-Credentials', 'true')
  done()
})

app.register(cookie)

app.register(mealsRoutes, {
  prefix: 'meals',
})

app.register(usersRoutes, {
  prefix: 'users',
})
