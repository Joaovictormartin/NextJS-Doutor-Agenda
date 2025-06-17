import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageTitle,
  PageHeader,
  PageActions,
  PageContent,
  PageContainer,
  PageDescription,
  PageHeaderContent,
} from "@/components/page-container";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { patientsTable } from "@/db/schema";
import { AddPatientButton } from "./_components/add-patient-button";
import { DataTablePatients } from "./_components/data-table-patients";

const PatientsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/authentication");
  if (!session.user.clinic) redirect("/clinic-form");

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session.user.clinic.id),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes da sua clínica
          </PageDescription>
        </PageHeaderContent>

        <PageActions>
          <AddPatientButton />
        </PageActions>
      </PageHeader>

      <PageContent>
        <DataTablePatients data={patients} />
      </PageContent>
    </PageContainer>
  );
};

export default PatientsPage;
