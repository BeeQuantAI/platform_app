// StepOne.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepOne from './StepOne';
import { exchangePlatformsGroup } from '../../../../app/(protected)/crypto/exchange/exchangePlatforms';
// Mock props
const defaultValues = {};
const onSubmit = jest.fn();

describe('StepOne Component', () => {
  beforeEach(() => {
    render(<StepOne onSubmit={onSubmit} defaultValues={defaultValues} />);
    onSubmit.mockClear();
  });

  test('renders StepOne correctly', () => {
    expect(screen.getByText('Select your exchange')).toBeInTheDocument();
    exchangePlatformsGroup.forEach((item) => {
      expect(screen.getByLabelText(item.label)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  test('submits the form with selected exchange', async () => {
    fireEvent.click(screen.getByLabelText('Binance'));

    const radioButton = screen.getByLabelText('Binance') as HTMLInputElement;
    console.log('Radio button checked state:', radioButton.checked);
    expect(radioButton).toBeChecked();

    await fireEvent.click(await screen.findByRole('button', { name: /Next/i }));

    expect(onSubmit).toHaveBeenCalledWith({ exchange: '1' });
  });

  test('does not submit the form without selecting exchange', () => {
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
