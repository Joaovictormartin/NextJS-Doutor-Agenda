interface Props {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: Props) => {
  return <div className="w-full space-y-6 p-6">{children}</div>;
};

export const PageHeader = ({ children }: Props) => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
      {children}
    </div>
  );
};

export const PageHeaderContent = ({ children }: Props) => {
  return <div className="w-full space-y-1">{children}</div>;
};

export const PageTitle = ({ children }: Props) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export const PageDescription = ({ children }: Props) => {
  return <p className="text-muted-foreground text-sm">{children}</p>;
};

export const PageActions = ({ children }: Props) => {
  return (
    <div className="flex w-full items-center justify-end gap-2">{children}</div>
  );
};

export const PageContent = ({ children }: Props) => {
  return <div className="space-y-6">{children}</div>;
};
