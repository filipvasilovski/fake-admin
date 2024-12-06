import { ProtectRoute } from './protect-route';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { NotFoundPage } from '@/pages/404';
import HomePage from '@/pages/home-page';
import { SignInPage } from '@/pages/sign-in-page';

import { ErrorBoundary } from '@/components/error-boundary';
import { Providers } from '@/components/providers';

import { ROUTES } from '@/config/routes';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Providers />} errorElement={<ErrorBoundary />}>
      <Route path={ROUTES.signIn} element={<SignInPage />} />

      <Route element={<ProtectRoute />}>
        <Route path={ROUTES.home} element={<HomePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
