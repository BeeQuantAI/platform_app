import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USER, UPDATE_USER } from '@/graphql/user';
import { AUTH_TOKEN } from '@/shared/constants/storage';
import ProfileMain from './ProfileMain';

const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: {
        getUserInfo: {
          id: '1332332',
          email: 'test@example.com',
          ref: 'ref123',
          displayName: 'Test User',
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_USER,
      variables: { id: '1332332', input: { displayName: 'Updated User' } },
    },
    result: {
      data: {
        updateUser: {
          id: '1332332',
          displayName: 'Updated User',
        },
      },
    },
  },
];

test('renders profile information', async () => {
  localStorage.setItem(AUTH_TOKEN, 'mock-token');
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ProfileMain />
    </MockedProvider>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
  expect(screen.getByText('test@example.com')).toBeInTheDocument();
  expect(screen.getByText('ref123')).toBeInTheDocument();
});

test('updates display name', async () => {
  localStorage.setItem(AUTH_TOKEN, 'mock-token');

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ProfileMain />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  const input = screen.getByDisplayValue('Test User');
  fireEvent.change(input, { target: { value: 'Updated User' } });
  const button = screen.getByText('Submit');
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByDisplayValue('Updated User')).toBeInTheDocument();
  });
});
