import { useContext } from 'react';

import { AuthContext } from '@/context/auth-context';

export const useAuth = () => {
  const values = useContext(AuthContext);

  if (!values) {
    throw new Error('Auth context error');
  }

  return values;
};
