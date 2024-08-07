import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

interface StepProps {
  onSubmit: (data: any) => void;
  previousPage?: () => void;
  defaultValues: any;
}

const MockStepOne: React.FC<StepProps> = ({ onSubmit, defaultValues }) => (
  <div data-testid="step-one">
    StepOne
    <div>Default: {JSON.stringify(defaultValues)}</div>
    <button onClick={() => onSubmit({ step: 'one' })}>Next</button>
  </div>
);

const MockStepTwo: React.FC<StepProps> = ({ onSubmit, previousPage, defaultValues }) => (
  <div data-testid="step-two">
    StepTwo
    <div>Default: {JSON.stringify(defaultValues)}</div>
    <button onClick={previousPage}>Previous</button>
    <button onClick={() => onSubmit({ step: 'two' })}>Next</button>
  </div>
);

const MockStepThree: React.FC<Omit<StepProps, 'onSubmit'>> = ({ defaultValues }) => (
  <div data-testid="step-three">
    StepThree
    <div>Default: {JSON.stringify(defaultValues)}</div>
  </div>
);

jest.mock('./StepOne', () => MockStepOne);
jest.mock('./StepTwo', () => MockStepTwo);
jest.mock('./StepThree', () => MockStepThree);

interface WizardFormProps {
  onSubmit: (data: any) => void;
}
const WizardForm: React.FC<WizardFormProps> = require('./WizardForm').default;

describe('WizardForm', () => {
  test('renders StepOne initially with empty defaultValues', () => {
    render(<WizardForm onSubmit={() => {}} />);
    expect(screen.getByTestId('step-one')).toBeInTheDocument();
    expect(screen.getByText('Default: {}')).toBeInTheDocument();
  });

  test('navigates to StepTwo and passes correct defaultValues', () => {
    render(<WizardForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByTestId('step-two')).toBeInTheDocument();
    expect(screen.getByText('Default: {"step":"one"}')).toBeInTheDocument();
  });

  test('navigates back to StepOne and resets defaultValues', () => {
    render(<WizardForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByText('Next')); // To StepTwo
    fireEvent.click(screen.getByText('Previous')); // Back to StepOne
    expect(screen.getByTestId('step-one')).toBeInTheDocument();
    expect(screen.getByText('Default: {}')).toBeInTheDocument();
  });

  test('navigates to StepThree and passes accumulated defaultValues', () => {
    render(<WizardForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByText('Next')); // To StepTwo
    fireEvent.click(screen.getByText('Next')); // To StepThree
    expect(screen.getByTestId('step-three')).toBeInTheDocument();
  });
});
