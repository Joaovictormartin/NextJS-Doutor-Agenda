import dayjs from "dayjs";
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
import { auth } from "@/lib/auth";
import { getDashboard } from "@/data/get-dashboard";
import { StatsCards } from "./_components/stats-cards";
import { TopDoctors } from "./_components/top-doctors";
import { DatePicker } from "./_components/date-picker";
import { TodayAgenda } from "./_components/today-agenda";
import { TopSpecialties } from "./_components/top-specialties";
import { AppointmentsChart } from "./_components/appointments-chart";

interface DashboardPageProps {
  searchParams: Promise<{ from: string; to: string }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/authentication");
  if (!session.user.clinic) redirect("/clinic-form");
  // if (!session.user.plan) redirect("/new-subscription");

  const { from, to } = await searchParams;

  if (!from || !to) {
    redirect(
      `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
    );
  }

  const {
    topDoctors,
    totalRevenue,
    totalDoctors,
    totalPatients,
    topSpecialties,
    totalAppointments,
    todayAppointments,
    dailyAppointmentsData,
  } = await getDashboard({
    from,
    to,
    session: {
      user: {
        clinic: { id: session.user.clinic.id },
      },
    },
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>
            Tenha uma visão geral da sua clínica.
          </PageDescription>
        </PageHeaderContent>

        <PageActions>
          <DatePicker />
        </PageActions>
      </PageHeader>

      <PageContent>
        <StatsCards
          totalDoctors={totalDoctors.total}
          totalPatients={totalPatients.total}
          totalAppointments={totalAppointments.total}
          totalRevenue={totalRevenue.total ? Number(totalRevenue.total) : null}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2.25fr_1fr]">
          <AppointmentsChart dailyAppointmentsData={dailyAppointmentsData} />
          <TopDoctors doctors={topDoctors} />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2.25fr_1fr]">
          <TodayAgenda todayAppointments={todayAppointments} />
          <TopSpecialties topSpecialties={topSpecialties} />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DashboardPage;
