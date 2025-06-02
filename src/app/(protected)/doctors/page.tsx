import { Plus } from "lucide-react";

import {
  PageTitle,
  PageHeader,
  PageActions,
  PageContainer,
  PageDescription,
  PageHeaderContent,
  PageContent,
} from "@/components/page-container";
import { Button } from "@/components/ui/button";

const DoctorsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>
            Gerencie seus médicos da sua clínica
          </PageDescription>
        </PageHeaderContent>

        <PageActions>
          <Button>
            Adicionar médicos
            <Plus />
          </Button>
        </PageActions>
      </PageHeader>

      <PageContent>
        <h1>Médicos</h1>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
