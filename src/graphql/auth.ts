import { gql } from './codegen/';
export const USER_LOGIN = gql(`
  mutation Login($email: String!, $password: String!, $stay_signed_in: Boolean!) {
    login(email: $email, password: $password, stay_signed_in: $stay_signed_in) {
      code
      message
      data
    }
  }
`);

export const USER_REGISTER = gql(`
  mutation Register($input: CreateUserInput!) {
    register(input: $input) {
      code
      message
      data
    }
  }
`);

export const LOGOUT = gql(`
  mutation Logout {
  logout
  }
`);
