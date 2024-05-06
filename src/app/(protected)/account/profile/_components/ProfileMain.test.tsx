import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileMain from './ProfileMain';

import { MockedProvider } from '@apollo/client/testing';
import { FIND_USER_BY_EMAIL, UPDATE_USER } from '@/graphql/user';

const mocks = [
  {
    request: {
      query: FIND_USER_BY_EMAIL,
      variables: { email: 'test@example.com' },
    },
    result: {
      data: {
        getUserByEmail: {
          id: '1',
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
      variables: { id: '1', input: { displayName: 'Updated User' } },
    },
    result: {
      data: {
        updateUser: {
          id: '1',
          displayName: 'Updated User',
        },
      },
    },
  },
];

test('renders profile information', async () => {
  localStorage.setItem('email', 'test@example.com');

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
  localStorage.setItem('email', 'test@example.com');

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
