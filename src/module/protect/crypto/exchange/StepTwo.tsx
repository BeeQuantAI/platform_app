'use client';

import React from 'react';
import { FormGroup, FormGroupLabel } from '@/shared/components/form/FormElements';
import {
  WizardButtonToolbar,
  WizardFormContainer,
  WizardTitle,
  StyledButton,
} from '@/shared/components/form/WizardFormElements';
import { CREATE_USER_EXCHANGE } from '@/graphql/user';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import styled from 'styled-components';
import { exchangePlatformsGroup } from '../../../../app/(protected)/crypto/exchange/exchangePlatforms';

interface StepTwoProps {
  onSubmit: (data: any) => void;
  defaultValues: Record<string, any>;
  previousPage: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onSubmit, previousPage, defaultValues }) => {
  const [message, setMessage] = useState('');

  const [createUserExchange] = useMutation(CREATE_USER_EXCHANGE, {
    onCompleted: (data) => {
      onSubmit(data);
    },
    onError: (error) => {
      setMessage(`Error: ${error.message}`);
    },
  });
  const [displayName, setDisplayName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedExchange = defaultValues.exchange;
    const exchangePlatforms = exchangePlatformsGroup.find(
      (platform) => platform.radioValue === selectedExchange
    );

    if (displayName.trim() === '') {
      setMessage('Display name cannot be null.');
      return;
    }

    if (apiKey.trim() === '') {
      setMessage('Api key cannot be null.');
      return;
    }

    if (apiSecret.trim() === '') {
      setMessage('Api secret cannot be null.');
      return;
    }

    try {
      await createUserExchange({
        variables: {
          input: {
            name: displayName,
            exchangeName: exchangePlatforms?.label.toLowerCase() || 'unknown',
            accessKey: apiKey,
            secretKey: apiSecret,
          },
        },
      });
    } catch (error) {
      setMessage('invalid api key and secret');
    }
  };

  return (
    <WizardFormContainer onSubmit={handleSubmit}>
      <WizardTitle>Fill your API keys</WizardTitle>

      <FormGroup>
        <FormGroupLabel className="col-md-3">Display name</FormGroupLabel>
        <input
          id="Display name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display name"
        />
      </FormGroup>
      <FormGroup>
        <FormGroupLabel className="col-md-3">API key</FormGroupLabel>
        <input
          id="API key"
          type="text"
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="API key"
        />
      </FormGroup>
      <FormGroup>
        <FormGroupLabel className="col-md-3">API secret</FormGroupLabel>
        <input
          id="API secret"
          type="text"
          onChange={(e) => setApiSecret(e.target.value)}
          placeholder="API secret"
        />
      </FormGroup>
      <WizardButtonToolbar>
        <StyledButton type="button" onClick={previousPage}>
          Back
        </StyledButton>
        <StyledButton type="submit">Submit</StyledButton>
      </WizardButtonToolbar>
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </WizardFormContainer>
  );
};

export default StepTwo;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  border: 1px;
  solid #f5c6cb;
  border-radius: 5px;
  text-align: center;
`;
