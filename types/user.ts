export interface IUserInput {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  password: string
}

export interface IUserLoginInput {
  email: string
  password: string
}

export interface UserRegistrationInput {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  password: string
  confirmPassword: string
}

export interface IAuthUser {
  _id: string
  firstName: string
  lastName: string
  email: string
}
