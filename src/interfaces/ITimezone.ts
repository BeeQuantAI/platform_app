import { ReactNode } from 'react';

export interface ITimezone {
  [x: string]: ReactNode;
  id: string;
  displayName: string;
}
