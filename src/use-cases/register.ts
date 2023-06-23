import { type UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterUseCaseDTO {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor (
    private readonly usersRepository: UserRepository
  ) {}

  async execute ({ name, email, password }: RegisterUseCaseDTO): Promise<void> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail !== null) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash
    })
  }
}
