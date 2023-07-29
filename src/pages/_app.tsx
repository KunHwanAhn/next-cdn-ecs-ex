import React, { useState } from 'react';
import type { AppProps as NextAppProps } from 'next/app';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from '@tanstack/react-query';

import '@/styles/globals.scss';

import DefaultLayout from '@/components/DefaultLayout';

export type CustomPageProps = {
  dehydratedState: DehydratedState;
};
export type AppProps = {
  pageProps: CustomPageProps;
} & Omit<NextAppProps, 'pageProps'>;

const DEFAULT_STALE_TIME = 60 * 1000;
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
      },
    },
  }));
  const { dehydratedState, ...restPageProps } = pageProps;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <DefaultLayout>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...restPageProps} />
        </DefaultLayout>
      </Hydrate>
    </QueryClientProvider>
  );
}
