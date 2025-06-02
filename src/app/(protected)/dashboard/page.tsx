import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { usersToClinicsTable } from "@/db/schema";

const DashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/authentication");

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinics.length === 0) redirect("/clinic-form");

  return <div>Dashboard</div>;
};

export default DashboardPage;
