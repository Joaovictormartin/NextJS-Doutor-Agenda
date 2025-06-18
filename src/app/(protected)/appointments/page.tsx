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
import { AddAppointmentButton } from "./_components/add-appointment-button";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { DataTableAppointments } from "./_components/data-table-appointments";

const AppointmentsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/authentication");
  if (!session.user.clinic) redirect("/clinic-form");

  const [patients, doctors, appointments] = await Promise.all([
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, session.user.clinic.id),
    }),

    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, session.user.clinic.id),
    }),

    db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.clinicId, session.user.clinic.id),
      with: { patient: true, doctor: true },
    }),
  ]);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Agendamentos</PageTitle>
          <PageDescription>
            Gerencie os agendamentos da sua clínica
          </PageDescription>
        </PageHeaderContent>

        <PageActions>
          <AddAppointmentButton patients={patients} doctors={doctors} />
        </PageActions>
      </PageHeader>

      <PageContent>
        <DataTableAppointments appointments={appointments} />
      </PageContent>
    </PageContainer>
  );
};

export default AppointmentsPage;
