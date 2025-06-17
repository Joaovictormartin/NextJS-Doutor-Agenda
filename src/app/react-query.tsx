"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ReactQueryProvider {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: ReactQueryProvider) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
