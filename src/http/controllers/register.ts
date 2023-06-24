import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeregisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const useCase = makeregisterUseCase()
    await useCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send(error.message)
    }

    throw error
  }

  return reply.status(201).send()
}
