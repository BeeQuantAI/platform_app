import { gql } from './codegen/';

export const GET_USER = gql(`
  query getUserInfo {
    getUserInfo {
      id
      displayName
    }
  }
`);

export const FIND_USER = gql(`
  query getUserById($id: String!) {
    getUserById(id: $id) {
      id
      email
      realName
      displayName
      mobile
    }
  }
`);

export const UPDATE_USER = gql(`
  mutation updateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input)
  }
`);

export const CREATE_USER_EXCHANGE = gql(`
  mutation CreateUserExchange($input: CreateUserExchangeInput!) {
    createUserExchange(input: $input) {
      code
      message
    }
  }
`);
