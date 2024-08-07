'use client';

import React, { useState, useEffect } from 'react';
import { FormGroup, FormGroupField } from '@/shared/components/form/FormElements';
import styled from 'styled-components';
import {
  WizardButtonToolbar,
  WizardFormContainer,
  WizardTitle,
  StyledButton,
  WizardLabel,
} from '@/shared/components/form/WizardFormElements';
import { exchangePlatformsGroup } from '../../../../app/(protected)/crypto/exchange/exchangePlatforms';

interface StepOneProps {
  onSubmit: (data: any) => void;
  defaultValues: Record<string, any>;
}

const StepOne: React.FC<StepOneProps> = ({ onSubmit, defaultValues }) => {
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  const handlePlatformSelect = (platform: string) => {
    setFormData((prevData) => ({
      ...prevData,
      exchange: platform,
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.exchange) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <>
      <WizardFormContainer onSubmit={handleNext}>
        <WizardTitle>Select your exchange</WizardTitle>
        <FormGroup>
          <div>
            {exchangePlatformsGroup.map((item) => (
              <FormGroupField key={`index_${item.label}`}>
                <WizardLabel>
                  <Input
                    type="radio"
                    value={item.radioValue}
                    checked={formData.exchange === item.radioValue}
                    onChange={() => handlePlatformSelect(item.radioValue)}
                  />
                  {item.label}
                </WizardLabel>
              </FormGroupField>
            ))}
          </div>
        </FormGroup>
        <WizardButtonToolbar>
          <StyledButton type="submit" className="next">
            Next
          </StyledButton>
        </WizardButtonToolbar>
      </WizardFormContainer>
    </>
  );
};

export default StepOne;

const Input = styled.input`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;
