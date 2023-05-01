'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import AuthProvider from '@/middlewares/AuthProvider';
import { store } from '@/store/store';
interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="rounded flex font-sans bg-dark-blue">
          <Provider store={store}>
            <AuthProvider child={children} />
          </Provider>
    </div>
  );
}
