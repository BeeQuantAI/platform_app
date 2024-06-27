import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepThree from './StepThree';
import { MockedProvider } from '@apollo/client/testing';

describe('StepThree Component', () => {
  test('renders StepThree component correctly', () => {
    render(
      <MockedProvider>
        <StepThree />
      </MockedProvider>
    );

    // Check if the image is rendered
    const image = screen.getByAltText(/success/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/img/success.png');

    // Check if the title is rendered
    const title = screen.getByText(/Your exchange key is added successfully/i);
    expect(title).toBeInTheDocument();

    // Check if the "Cool!" accent is rendered
    const coolAccent = screen.getByText(/Cool!/i);
    expect(coolAccent).toBeInTheDocument();

    // Check if the button is rendered
    const button = screen.getByRole('link', { name: /Back to Exchange Management/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/crypto/exchange/details');
  });
});
