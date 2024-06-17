'use client';

import { IPropChild } from '@/utils/types';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from '@/i18n/en.json';
import sChinese from '@/i18n/zh-cn.json';
import { useEffect } from 'react';

const I18nWrapper = ({ children }: IPropChild) => {
  useEffect(() => {
    i18n.use(initReactI18next).init({
      fallbackLng: 'en',
      lng: 'en',
      resources: {
        en: {
          translation: english,
        },
        zhcn: {
          translation: sChinese,
        },
      },
    });
  }, []);

  return <>{children}</>;
};

export default I18nWrapper;
