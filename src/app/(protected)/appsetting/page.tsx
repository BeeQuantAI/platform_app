'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Card, CardBody, CardTitleWrap, CardTitle, CardSubhead } from '@/shared/components/Card';
import {
  FormContainer,
  FormGroup,
  FormGroupField,
  FormGroupLabel,
} from '@/shared/components/form/FormElements';
import { Controller, useForm } from 'react-hook-form';

import { useUserContext } from '@/hooks/userHooks';
import { THEME } from '@/shared/constants/storage';

const AppSetting = () => {
  const { control } = useForm();
  const { store, setStore } = useUserContext();
  const [themeColor, setThemeColor] = useState(store.themeColor || 'dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME) || themeColor;
    setThemeColor(storedTheme);
    if (store.themeColor !== storedTheme) {
      setStore({ ...store, themeColor: storedTheme });
    }
  }, [store, setStore]);

  const changeTheme = () => {
    // TO DO: CP-33
    setStore({});
  };

  // Testing array, to be removed after implement the real language switching function
  const languagesList: String[] = ['English', 'Chinese', 'Japanese', 'Korean'];

  return (
    <Container>
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody data-testid="card-body">
              <CardTitleWrap>
                <CardTitle>App Settings</CardTitle>
                <CardSubhead>Change your app settings</CardSubhead>
              </CardTitleWrap>
              <FormContainer $horizontal>
                <FormGroup>
                  <FormGroupLabel>Language</FormGroupLabel>
                  <FormGroupField>
                    <Controller
                      name="Language"
                      control={control}
                      rules={{ required: 'Theme selection is required' }}
                      defaultValue="English"
                      render={({ field: { onChange, value, ref } }) => (
                        <select
                          name="language-select"
                          aria-label="language-select"
                          id="language-select"
                          ref={ref}
                          value={value}
                          onChange={(e) => {
                            onChange(e);
                            // TO IMPLEMENT: CHANGE LANGUAGE
                          }}
                        >
                          {languagesList.map((language) => (
                            <option key={`${language}`} value={`${language}`}>
                              {language}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </FormGroupField>
                </FormGroup>

                <FormGroup>
                  <FormGroupLabel>Theme</FormGroupLabel>
                  <FormGroupField>
                    <Controller
                      name="Theme"
                      control={control}
                      rules={{ required: 'Theme selection is required' }}
                      defaultValue={themeColor}
                      render={({ field: { onChange, value, ref } }) => (
                        <select
                          name="theme"
                          aria-label="theme"
                          ref={ref}
                          value={value}
                          onChange={(e) => {
                            onChange(e);
                            changeTheme(); // TO DO CP-33
                          }}
                        >
                          <option key="light" value="light">
                            Light
                          </option>
                          <option key="dark" value="dark">
                            Dark
                          </option>
                        </select>
                      )}
                    />
                  </FormGroupField>
                </FormGroup>
              </FormContainer>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppSetting;
