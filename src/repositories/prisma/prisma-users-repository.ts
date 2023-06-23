import { prisma } from '@/db/prisma'
import { type User, type Prisma } from '@prisma/client'
import { type UserRepository } from '../users-repository'

export class PrismaUserRepository implements UserRepository {
  async findByEmail (email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async create (data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({ data })
  }
}
