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
    }
  }
`;

export const GET_TIMEZONES = gql`
  query GetTimezones {
    getTimezones
  }
`;

export const UPDATE_TIMEZONE = gql`
  mutation UpdateTimezone($userId: String!, $timezone: String!) {
    updateTimezone(userId: $userId, timezone: $timezone) {
      success
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input)
  }
`;
