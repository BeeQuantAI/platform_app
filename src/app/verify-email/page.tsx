'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { VERIFY_EMAIL } from '@/graphql/verifyEmail';
import { useMutation } from '@apollo/client';
import Loading from '@/shared/components/Loading';
import VerifySuccess from './_components/VerifySuccess';
import VerifyFail from './_components/VerifyFail';

const Search = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [verifyEmail] = useMutation(VERIFY_EMAIL);
  const [mutationError, setMutationError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchAndVerifyEmail = async () => {
      try {
        const result = await verifyEmail({
          variables: {
            email,
            token,
          },
        });

        if (result.data.verifyEmail.code === 200) {
          setIsVerified(true);
          setIsLoading(false);
        } else {
          setMutationError(`${result.data.verifyEmail.message}`);
          setIsLoading(false);
        }
      } catch (e) {
        setMutationError('An error occurred');
        setIsLoading(false);
      }
    };

    fetchAndVerifyEmail();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isVerified) {
    return <VerifySuccess />;
  }

  return <VerifyFail error={mutationError} />;
};

export default function Page() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
