'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup, FormGroupField } from '@/shared/components/form/FormElements';
import { Button } from '@/shared/components/Button';
import {
  WizardButtonToolbar,
  WizardFormContainer,
  WizardTitle,
} from '@/shared/components/form/WizardFormElements';
import FormField from '@/shared/components/form/FormField';
import renderRadioButtonField from '@/shared/components/form/RadioButton';
import { exchangePlatformsGroup } from '../exchangePlatforms';

interface StepOneProps {
  onSubmit: (data: any) => void;
  defaultValues: Record<string, any>;
}

const StepOne: React.FC<StepOneProps> = ({ onSubmit, defaultValues }) => {
  const { handleSubmit } = useForm({ defaultValues });
  return (
    <WizardFormContainer $horizontal onSubmit={handleSubmit(onSubmit)}>
      <WizardTitle>Select your exchange</WizardTitle>
      <FormGroup>
        <div>
          {exchangePlatformsGroup.map((item) => (
            <FormGroupField key={`index_${item.label}`}>
              <FormField
                component={renderRadioButtonField}
                label={item.label}
                radioValue={item.radioValue}
                initialValue={item.initialValue}
                disabled={item.disabled}
              />
            </FormGroupField>
          ))}
        </div>
      </FormGroup>
      <WizardButtonToolbar>
        <Button variant="primary" type="submit" className="next">
          Next
        </Button>
      </WizardButtonToolbar>
    </WizardFormContainer>
  );
};

export default StepOne;
