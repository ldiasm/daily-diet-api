import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'

import { knex } from '../database'
import { checkSessionIdSession } from '../middlewares/check-session-id-exists'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (req: FastifyRequest, res: FastifyReply) => {
    const createUserBodySchema = z.object({
      email: z.string().email('Email inválido'),
      password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
      firstName: z.string().nonempty('Nome não pode estar vazio'),
      lastName: z.string().nonempty('Sobrenome não pode estar vazio'),
      photoUrl: z.string().url().optional(),
    })

    const validationResult = createUserBodySchema.safeParse(req.body)

    if (!validationResult.success) {
      return res.status(400).send({
        message: validationResult.error.errors,
      })
    }

    const { email, password, firstName, lastName, photoUrl } = validationResult.data

    // Verifica se o email já está em uso
    const existingUser = await knex('users')
      .where({ email })
      .first()

    if (existingUser) {
      return res.status(400).send({
        message: 'Email já está em uso',
      })
    }

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      })
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await knex('users').insert(
      {
        id: randomUUID(),
        email,
        password: hashedPassword,
        last_name: lastName,
        photo_url: photoUrl,
        session_id: sessionId,
        first_name: firstName,
      },
      '*',
    )

    res.send({ user })
  })

  app.post('/login', async (req: FastifyRequest, res: FastifyReply) => {
    const loginSchema = z.object({
      email: z.string().email('Email inválido'),
      password: z.string().min(6, 'Senha inválida'),
    })

    const validationResult = loginSchema.safeParse(req.body)

    if (!validationResult.success) {
      return res.status(400).send({
        message: validationResult.error.errors,
      })
    }

    const { email, password } = validationResult.data

    const user = await knex('users')
      .where({ email })
      .first()

    if (!user) {
      return res.status(401).send({
        message: 'Email ou senha inválidos',
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).send({
        message: 'Email ou senha inválidos',
      })
    }

    const sessionId = randomUUID()
    res.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
    })

    await knex('users')
      .where({ id: user.id })
      .update({ session_id: sessionId })

    res.send({ user })
  })

  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    const { firstName, lastName } = req.query as { firstName?: string; lastName?: string };
    const { sessionId } = req.cookies;

    let query = knex('users')
      .select('id', 'first_name', 'last_name', 'photo_url', 'email', 'created_at')
      .orderBy('created_at', 'desc');

    // Se não houver parâmetros de busca e houver um cookie de sessão, retorna apenas o usuário autenticado
    if (!firstName && !lastName && sessionId) {
      query = query.where({ session_id: sessionId });
    }
    // Se houver parâmetros de busca, filtra por nome e sobrenome
    else if (firstName && lastName) {
      query = query.where({
        first_name: firstName,
        last_name: lastName,
      });
    }

    const users = await query;

    res.send({ users });
  })

  app.get(
    '/metrics',
    {
      preHandler: [checkSessionIdSession],
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      const { sessionId } = req.cookies

      const { id } = await knex('users')
        .select('id')
        .where({ session_id: sessionId })
        .first()

      const meals = await knex('meals')
        .select('on_diet')
        .where({ user_id: id })
        .orderBy('updated_at')

      let bestSequence = 0
      let currentSequence = 0

      for (const meal of meals) {
        if (meal.on_diet === 1) {
          currentSequence++
          bestSequence = Math.max(bestSequence, currentSequence)
        } else {
          currentSequence = 0
        }
      }

      const onDiet = meals.filter((meal) => meal.on_diet).length

      res.send({
        total: meals.length,
        onDiet,
        offDiet: meals.length - onDiet,
        bestSequence,
      })
    },
  )

  app.delete('/', async (req: FastifyRequest, res: FastifyReply) => {
    const { sessionId } = req.cookies;

    if (!sessionId) {
      return res.status(401).send({
        message: 'Não autorizado',
      });
    }

    const user = await knex('users')
      .where({ session_id: sessionId })
      .first();

    if (!user) {
      return res.status(401).send({
        message: 'Não autorizado',
      });
    }

    // Deletar todas as refeições do usuário
    await knex('meals')
      .where({ user_id: user.id })
      .delete();

    // Deletar o usuário
    await knex('users')
      .where({ id: user.id })
      .delete();

    // Limpar o cookie de sessão
    res.clearCookie('sessionId');

    return res.status(200).send({
      message: 'Conta deletada com sucesso',
    });
  });
}
