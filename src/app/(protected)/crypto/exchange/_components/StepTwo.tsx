'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import PasswordField from '@/shared/components/form/Password';
import { FormGroup, FormGroupField, FormGroupLabel } from '@/shared/components/form/FormElements';
import { Button } from '@/shared/components/Button';
import {
  WizardButtonToolbar,
  WizardFormContainer,
  WizardTitle,
} from '@/shared/components/form/WizardFormElements';
import FormField from '@/shared/components/form/FormField';

interface StepTwoProps {
  onSubmit: (data: any) => void;
  defaultValues: Record<string, any>;
  previousPage: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onSubmit, previousPage, defaultValues }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });
  return (
    <WizardFormContainer $horizontal onSubmit={handleSubmit(onSubmit)}>
      <WizardTitle>Fill your API keys</WizardTitle>
      <FormGroup>
        <FormGroupLabel className="col-md-3">Display name</FormGroupLabel>
        <FormField
          name="Display name"
          as="input"
          errors={errors}
          placeholder="Display name"
          control={control}
          defaultValue=""
        />
      </FormGroup>
      <FormGroup>
        <FormGroupLabel className="col-md-3">API key</FormGroupLabel>
        <FormField
          name="API key"
          as="input"
          errors={errors}
          placeholder="API key"
          control={control}
          defaultValue=""
        />
      </FormGroup>
      <FormGroup>
        <FormGroupLabel className="col-md-3">API secret</FormGroupLabel>
        <FormGroupField className="w-100">
          <Controller
            name="API secret"
            control={control}
            defaultValue=""
            render={({ field }) => <PasswordField input={field} placeholder="Password" />}
          />
        </FormGroupField>
      </FormGroup>
      <WizardButtonToolbar>
        <Button variant="primary" className="previous" onClick={previousPage}>
          Back
        </Button>
        <Button variant="primary" type="submit" className="next">
          Submit
        </Button>
      </WizardButtonToolbar>
    </WizardFormContainer>
  );
};

export default StepTwo;
