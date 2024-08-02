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
import { THEME, LANGUAGE } from '@/shared/constants/storage';
import CustomDropdownList from '@/shared/components/form/CustomDropdown';

const AppSetting = () => {
  const { control } = useForm();
  const { store, setStore } = useUserContext();
  const [themeColor, setThemeColor] = useState(store.themeColor || 'dark');
  const [language, setLanguage] = useState(store.language || 'eng');
  const languagesList: string[] = ['English', '中文'];
  const themeList: string[] = ['Light', 'Dark'];
  const languagesListId: string = 'languagesList';
  const themeListId: string = 'themeList';

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

  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE) || language;
    setLanguage(storedLanguage);
    if (store.language !== storedLanguage) {
      setStore({ ...store, language: storedLanguage });
    }
  }, []);

  const changeLanguage = (newLanguage: string) => {
    // eslint-disable-next-line no-console
    console.log(`${newLanguage}`);
    setStore({});
  };

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
                      rules={{ required: 'Language selection is required' }}
                      defaultValue="English"
                      render={({ field: { onChange, value } }) => (
                        <CustomDropdownList
                          list={languagesList}
                          listName={languagesListId}
                          onChange={(selectedLanguage) => {
                            onChange(selectedLanguage);
                            changeLanguage(selectedLanguage);
                          }}
                          value={value}
                          defaultValue="English"
                        />
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
                      defaultValue="Dark"
                      render={({ field: { onChange, value } }) => (
                        <CustomDropdownList
                          list={themeList}
                          listName={themeListId}
                          onChange={(theme) => {
                            onChange(theme);
                            changeTheme();
                          }}
                          value={value}
                          defaultValue="Dark"
                        />
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
