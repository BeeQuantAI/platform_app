import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import TimezoneSelector from './TimezoneSelector';
import { GET_TIMEZONES, UPDATE_TIMEZONE } from '@/graphql/user';

const mocks = [
  {
    request: {
      query: GET_TIMEZONES,
    },
    result: {
      data: {
        getTimezones: [
          { id: '1', displayName: 'America/New_York' },
          { id: '2', displayName: 'Europe/Berlin' },
        ],
      },
    },
  },
  {
    request: {
      query: UPDATE_TIMEZONE,
      variables: {
        userId: '123',
        timezone: '1',
      },
    },
    result: {
      data: {
        updateTimezone: {
          success: true,
        },
      },
    },
  },
];

describe('TimezoneSelector', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: jest.fn() },
    });
  });

  it('renders without error', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TimezoneSelector userId="123" />
      </MockedProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows timezones after loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TimezoneSelector userId="123" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('America/New_York')).toBeInTheDocument();
      expect(screen.getByText('Europe/Berlin')).toBeInTheDocument();
    });
  });

  it('updates timezone and refreshes the page', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TimezoneSelector userId="123" />
      </MockedProvider>
    );

    await waitFor(() => fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } }));

    expect(window.location.reload).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
