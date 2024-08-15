'use server';
import { defaultLocale } from '../../config/config';
import { cookies } from 'next/headers';

export async function getNextLocale() {
  const cookieStore = cookies();
  const result = await cookieStore.get('NEXT_LOCALE');
  if (!result) {
    return defaultLocale;
  }
  const nextLocale = result?.value;
  return nextLocale;
}
