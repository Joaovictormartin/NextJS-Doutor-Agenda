import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "./react-query";
import { ProgressWrapper } from "./progress-wrapper";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ReactQueryProvider>
      <ProgressWrapper>
        <NuqsAdapter>{children}</NuqsAdapter>
      </ProgressWrapper>

      <Toaster position="bottom-center" theme="light" richColors />
    </ReactQueryProvider>
  );
};

export default Providers;
