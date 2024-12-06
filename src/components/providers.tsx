import { Outlet } from 'react-router-dom';

import { AuthProvider } from '@/context/auth-context';

export function Providers() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
