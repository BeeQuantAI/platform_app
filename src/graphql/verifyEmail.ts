import { gql } from '@apollo/client';

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token) {
      code
      message
    }
  }
`;
