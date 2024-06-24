import { gql } from '@apollo/client';

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
