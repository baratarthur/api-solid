import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { type UserRepository } from '@/repositories/users-repository'
import { beforeEach } from 'node:test'

let userRepository: UserRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Arthur',
      email: 'a@b.c',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash the password ', async () => {
    const { user } = await sut.execute({
      name: 'Arthur',
      email: 'a@b.c',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should throws an error when trying to create 2 users with the same email', async () => {
    const testMail = 'test@test.test'

    await sut.execute({
      name: 'Arthur',
      email: testMail,
      password: '123456'
    })

    await expect(
      sut.execute({
        name: 'test',
        email: testMail,
        password: 'test'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
