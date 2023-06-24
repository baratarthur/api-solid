import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeregisterUseCase (): RegisterUseCase {
  const userRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUseCase(userRepository)

  return registerUseCase
}
