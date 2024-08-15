export const config = {
  referenceName: process.env.VITE_APP_REFERENCE_NAME || 'Default_Reference_Name',
};

export const defaultLocale = 'en' as const;
export const locales = ['en', 'zh-cn'] as const;
