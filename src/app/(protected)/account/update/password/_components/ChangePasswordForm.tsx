'use client';

import { useState } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import PasswordField from '@/shared/components/form/Password';
import { Card, CardBody, CardTitleWrap, CardTitle, CardSubhead } from '@/shared/components/Card';
import {
  FormButtonToolbar,
  FormContainer,
  FormGroup,
  FormGroupField,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import { Button } from '@/shared/components/Button';
import { Controller, useForm } from 'react-hook-form';
import { passwordPatten } from '@/shared/utils/helpers';
import { colorBlue } from '@/styles/palette';
import ChangePasswordSuccess from './ChangePasswordSuccess';

type ChangePasswordFormProps = {
  onSubmit: (data: any) => void;
  success: string;
  error: string;
};

const ChangePasswordForm = ({ onSubmit, success = '', error = '' }: ChangePasswordFormProps) => {
  const { handleSubmit, control, watch } = useForm();
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const prepareFormData = (data: any) => {
    const { repeatNewPassword, ...formData } = data;
    onSubmit(formData);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitleWrap>
                <CardTitle>Reset Password</CardTitle>
                <CardSubhead>Update your password</CardSubhead>
              </CardTitleWrap>
              <FormContainer $horizontal onSubmit={handleSubmit(prepareFormData)}>
                <ChangePasswordSuccess success={success} />
                <Alert variant="danger" show={!!error}>
                  {error}
                </Alert>
                <FormGroup>
                  <FormGroupLabel>Current Password</FormGroupLabel>
                  <FormGroupField>
                    <Controller
                      name="oldPassword"
                      control={control}
                      render={({ field, fieldState }) => (
                        <PasswordField
                          input={field}
                          meta={{
                            touched: !!fieldState.error,
                            error: fieldState.error?.message,
                          }}
                          placeholder="Current Password"
                          keyIcon={false}
                          isAboveError
                        />
                      )}
                      rules={{ required: 'This is a required field' }}
                      defaultValue=""
                    />
                  </FormGroupField>
                </FormGroup>
                <FormGroup>
                  <FormGroupLabel>New Password</FormGroupLabel>
                  <FormGroupField>
                    <Controller
                      name="newPassword"
                      control={control}
                      render={({ field, fieldState }) => (
                        <PasswordField
                          input={{ ...field, onBlur: () => setShowPasswordHint(false) }}
                          meta={{
                            touched: !!fieldState.error,
                            error: fieldState.error?.message,
                          }}
                          placeholder="New Password"
                          keyIcon={false}
                          isAboveError
                          onFocus={() => setShowPasswordHint(true)}
                        />
                      )}
                      rules={{
                        required: 'This is a required field',
                        pattern: {
                          value: passwordPatten,
                          message:
                            'must contain 8 to 32 characters, including letter, number and special character',
                        },
                      }}
                      defaultValue=""
                    />
                  </FormGroupField>
                  {/* eslint-disable-next-line react/self-closing-comp */}
                  <FormGroupLabel></FormGroupLabel>
                  <FormGroupField>
                    {showPasswordHint && (
                      <div style={{ color: colorBlue, marginTop: '5px' }}>
                        Password must contain 8 to 32 characters, including letter, number and
                        special character.
                      </div>
                    )}
                  </FormGroupField>
                </FormGroup>
                <FormGroup>
                  <FormGroupLabel>Repeat New Password</FormGroupLabel>
                  <FormGroupField>
                    <Controller
                      name="repeatNewPassword"
                      control={control}
                      render={({ field, fieldState }) => (
                        <PasswordField
                          input={field}
                          meta={{
                            touched: !!fieldState.error,
                            error: fieldState.error?.message,
                          }}
                          placeholder="Repeat Password"
                          keyIcon={false}
                          isAboveError
                        />
                      )}
                      rules={{
                        required: 'This is a required field',
                        validate: (value) =>
                          value === watch('newPassword') || 'Passwords do not match!',
                      }}
                      defaultValue=""
                    />
                  </FormGroupField>
                </FormGroup>
                <FormButtonToolbar>
                  {/* eslint-disable-next-line max-len */}
                  {/* @ts-ignore - Ignoring because of complex union types that are not correctly inferred */}
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </FormButtonToolbar>
              </FormContainer>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePasswordForm;
