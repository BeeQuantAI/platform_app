import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    getAllUserInfo {
      id
      email
      realName
      displayName
      mobile
    }
  }
`;

export const GET_USER = gql`
  query getUserInfo {
    getUserInfo {
      id
      displayName
    }
  }
`;

export const FIND_USER = gql`
  query getUserById($id: String!) {
    getUserById(id: $id) {
      id
      email
      realName
      displayName
      mobile
      ref
    }
  }
`;

export const FIND_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      displayName
      ref
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input)
  }
`;
