'use client';

import LoadUser from '@/shared/components/LoadUser';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useUserContext } from '@/hooks/userHooks';
import { THEME } from '@/shared/constants/storage';

function page() {
  const { store } = useUserContext();
  const themeColor = store.themeColor || localStorage.getItem(THEME) || 'dark';

  return (
    <>
      <LoadUser>
        <ThemeProvider
          theme={{
            mode: themeColor,
            direction: 'ltr',
            shadow: 'on',
            border: 'on',
          }}
        >
          <div>page</div>
        </ThemeProvider>
      </LoadUser>
    </>
  );
}

export default page;
