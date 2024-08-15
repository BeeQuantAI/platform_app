import React, { Suspense, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useUserContext } from '@/hooks/userHooks';
import { THEME } from '@/shared/constants/storage';
import Select from './_component/Select';
import { FormContainer } from '@/shared/components/form/FormElements';
import { useRouter } from '@/config/navigation';
import { getNextLocale } from '@/shared/utils/actions';

type FormValues = {
  language: string;
  theme: string;
};
type locales = 'en' | 'zh-cn';

export const AppSettingFormLayout = () => {
  const t = useTranslations('');
  const { control } = useForm<FormValues>({});
  const { store, setStore } = useUserContext();
  const [currentLocale, setCurrentLocale] = useState<locales>('en');
  const [currentTheme, setCurrentTheme] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Locales switch function and rules
  const localesSwitchRules = {
    'English': 'en',
    '中文': 'zh-cn',
    'en': 'English',
    'zh-cn': '中文',
  };
  const optionalLocales = ['en', 'zh-cn'];

  const switchLanguageValue = (lang: keyof typeof localesSwitchRules): string => {
    return localesSwitchRules[lang];
  };

  const isLocale = (value: string): value is locales => {
    return optionalLocales.includes(value);
  };

  // Theme switch function
  const switchOptionToTheme = (option: string): string => {
    switch (option) {
      case t('Shared.darkTheme'):
        return 'dark';
      case t('Shared.lightTheme'):
        return 'light';
      default:
        return '';
    }
  };

  const switchThemeToOption = (theme: string): string => {
    switch (theme) {
      case 'dark':
        return t('Shared.darkTheme');
      case 'light':
        return t('Shared.lightTheme');
      default:
        return '';
    }
  };

  useEffect(() => {
    getNextLocale().then((locale) => {
      if (isLocale(locale)) {
        setCurrentLocale(locale);
        setLoading(false);
      }
    });
    const theme = localStorage.getItem(THEME);
    if (theme) {
      const themeOption = switchThemeToOption(theme);
      setCurrentTheme(themeOption);
    }
  }, []);

  const changeTheme = (color: string) => {
    setStore({
      ...store,
      themeColor: color,
    });
    localStorage.setItem(THEME, color);
    setCurrentTheme(color);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as keyof typeof localesSwitchRules;
    const destination = switchLanguageValue(value);
    if (isLocale(destination)) {
      router.replace('/appsetting', { locale: destination });
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    console.log(option);
    const theme = switchOptionToTheme(option);
    if (theme) {
      changeTheme(theme);
      setCurrentTheme(option);
    }
  };

  // Testing array, to be removed after implement the real language switching function
  const languagesList: string[] = ['English', '中文'];
  const themeList: string[] = [`${t('Shared.darkTheme')}`, `${t('Shared.lightTheme')}`];

  return (
    !loading && (
      <Suspense>
        <FormContainer $horizontal>
          <Controller
            name="language"
            control={control}
            render={() => (
              <Select
                value={switchLanguageValue(currentLocale)}
                fieldName={t('AppSettingPage.language')}
                options={languagesList}
                onChangeHandler={handleLanguageChange}
              />
            )}
          />
          <Controller
            name="theme"
            control={control}
            render={() => (
              <Select
                value={currentTheme}
                fieldName={t('Shared.theme')}
                options={themeList}
                onChangeHandler={handleThemeChange}
              />
            )}
          />
        </FormContainer>
      </Suspense>
    )
  );
};
