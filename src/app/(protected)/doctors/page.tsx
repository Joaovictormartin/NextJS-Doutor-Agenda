import { eq } from "drizzle-orm";
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
import { doctorsTable } from "@/db/schema";
import DoctorCard from "./_components/doctor-card";
import { AddDoctorButton } from "./_components/add-doctor-button";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/authentication");
  if (!session.user.clinic) redirect("/clinic-form");

  const douctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinic.id),
  });

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
          <AddDoctorButton />
        </PageActions>
      </PageHeader>

      <PageContent>
        <div className="grid grid-cols-3 gap-6">
          {douctors.length ? (
            douctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              Nenhum médico cadastrado
            </p>
          )}
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
