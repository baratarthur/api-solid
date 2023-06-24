import { type UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { type User } from '@prisma/client'

interface RegisterUseCaseDTO {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor (
    private readonly usersRepository: UserRepository
  ) {}

  async execute ({ name, email, password }: RegisterUseCaseDTO): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail !== null) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash
    })

    return {
      user
    }
  }
}
