import { eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageTitle,
  PageHeader,
  PageActions,
  PageContainer,
  PageDescription,
  PageHeaderContent,
  PageContent,
} from "@/components/page-container";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { usersToClinicsTable } from "@/db/schema";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/authentication");

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinics.length === 0) redirect("/clinic-form");

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
