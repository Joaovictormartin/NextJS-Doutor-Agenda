"use client";

import { AppProgressProvider } from "@bprogress/next";

interface ProgressWrapperProps {
  children: React.ReactNode;
}

export const ProgressWrapper = ({ children }: ProgressWrapperProps) => {
  return (
    <AppProgressProvider
      height="4px"
      shallowRouting
      color="#2b7fff"
      options={{ showSpinner: false }}
    >
      {children}
    </AppProgressProvider>
  );
};
