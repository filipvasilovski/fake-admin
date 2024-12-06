import axios from '@/api/axios';
import { useEffect, useState } from 'react';

import { Icons } from '@/components/icons';

import { useIsMounted } from '@/hooks/is-mounted';
import { useAuth } from '@/hooks/use-auth';

export function Code() {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted()) {
      const getCode = async () => {
        try {
          const response = await axios.get<{
            data: string;
          }>('/code', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user?.accessToken}`,
            },
          });

          setCode(response.data.data);
        } catch {
          console.log('[error getting the code]');
        } finally {
          setLoading(false);
        }
      };

      if (!code) {
        getCode();
      } else {
        setLoading(false);
      }
    }
  }, [isMounted, code]);

  return loading ? (
    <Icons.spinner className="animate-spin" />
  ) : (
    <span className="text-2xl font-bold" aria-label="testers-challenge-code">
      {code}
    </span>
  );
}
