import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/use-auth';

import { AUTH_STATUS } from '@/config/constants';
import { ROUTES } from '@/config/routes';

export function ProtectRoute() {
  const { status } = useAuth();
  const location = useLocation();

  return status === AUTH_STATUS.authenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.signIn} state={{ from: location }} replace />
  );
}
