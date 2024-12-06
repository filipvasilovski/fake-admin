import axios from '@/api/axios';
import { AxiosResponse } from 'axios';
import { Dispatch, ReactNode, createContext, useState } from 'react';

import { AUTH_STATUS } from '@/config/constants';

type User = {
  id: string;
  email: string;
  accessToken: string;
};

interface AuthContextValues {
  user: User | undefined;
  status: AUTH_STATUS;
  code: string;
  setUser: Dispatch<React.SetStateAction<User | undefined>>;
  setStatus: Dispatch<React.SetStateAction<AUTH_STATUS>>;
  setCode: Dispatch<React.SetStateAction<string>>;
  login: (
    email: string,
    password: string
  ) => Promise<AxiosResponse<LoginResponse>>;
}

export const AuthContext = createContext<AuthContextValues | null>(null);

interface LoginResponse {
  data: {
    email: string;
    password: string;
    access_token: string;
  };
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState<AUTH_STATUS>(
    AUTH_STATUS.unauthenticated
  );
  const [code, setCode] = useState<string>('');

  const login = async (email: string, password: string) => {
    const response = await axios.post<LoginResponse>('/auth/login', {
      email,
      password,
    });

    return response;
  };

  const values = {
    user,
    status,
    code,
    setUser,
    setStatus,
    setCode,
    login,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
