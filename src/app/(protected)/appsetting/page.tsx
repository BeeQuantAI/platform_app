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
import { useTranslation } from 'react-i18next';

const AppSetting = () => {
  const { control } = useForm();
  const { store, setStore } = useUserContext();
  const [themeColor, setThemeColor] = useState(store.themeColor || 'dark');
  const [language, setLanguage] = useState(store.language || 'eng');
  const { t, i18n } = useTranslation();

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

  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE);
    console.log('language after setLanguage:', storedLanguage);
    console.log(`1language in hook: ${language}`);
  }, [language]);

  const changeLanguage = (newLanguage: string) => {
    console.log('changeLanguage fired');
    console.log(`language from Select: ${newLanguage}`);
    let matchedLauguage = '';
    newLanguage === '中文' ? (matchedLauguage = 'zhcn') : (matchedLauguage = 'en');
    console.log(`matchedLauguage = ${matchedLauguage}`);
    i18n.changeLanguage(matchedLauguage);
    setLanguage(matchedLauguage);
    setStore({ ...store, language: matchedLauguage });
  };

  // Testing array, to be removed after implement the real language switching function
  const languagesList: String[] = ['English', '中文'];

  return (
    <Container>
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardBody data-testid="card-body">
              <CardTitleWrap>
                <CardTitle>{t('appsetting.card-title')}</CardTitle>
                <CardSubhead>{t('appsetting.card-subhead')}</CardSubhead>
              </CardTitleWrap>
              <FormContainer $horizontal>
                <FormGroup>
                  <FormGroupLabel>{t('appsetting.form-group-label-language')}</FormGroupLabel>
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
                            changeLanguage(e.target.value);
                          }}
                        >
                          {languagesList.map((languageOption) => (
                            <option key={`${languageOption}`} value={`${languageOption}`}>
                              {languageOption}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </FormGroupField>
                </FormGroup>

                <FormGroup>
                  <FormGroupLabel>{t('appsetting.form-group-label-theme')}</FormGroupLabel>
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
                            {t('appsetting.option-dark')}
                          </option>
                          <option key="dark" value="dark">
                            {t('appsetting.option-light')}
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
