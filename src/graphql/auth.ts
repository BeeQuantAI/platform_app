import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      code
      message
      data
    }
  }
`;

export const USER_REGISTER = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input) {
      code
      message
      data
    }
  }
`;

export const GET_GOOGLE_OAUTH_URL = gql`
  query GetGoogleOAuthUrl {
    getGoogleOAuthUrl
  }
`;

export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($code: String!) {
    googleLogin(code: $code) {
      code
      message
      data
    }
  }
`;

// export const GET_GOOGLE_USER = gql`
//   mutation GetGoogleUser($code: String!) {
//     getGoogleUser(code: $code) {
//       email
//       name
//       picture
//       accessToken
//     }
//   }
// `;

// export const GOOGLE_LOGIN = gql`
//   mutation GoogleLogin($oauthLoginUserInput: OAuthLoginUserInput!) {
//     googleLogin(oauthLoginUserInput: $oauthLoginUserInput) {
//       code
//       message
//       data
//     }
//   }
// `;
