import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6)
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const useCase = makeAuthenticateUseCase()
    await useCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send(error.message)
    }

    throw error
  }

  return reply.status(200).send()
}
