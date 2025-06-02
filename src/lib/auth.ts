import { eq } from "drizzle-orm";
import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema,
    provider: "pg",
    usePlural: true,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      const [clinics] = await db.query.usersToClinicsTable.findMany({
        where: eq(schema.usersToClinicsTable.userId, user.id),
        with: { clinic: true },
      });

      return {
        session,
        user: {
          ...user,
          clinic: { id: clinics.clinicId, name: clinics.clinic.name },
        },
      };
    }),
  ],
  user: {
    modelName: "usersTable",
  },
  session: {
    modelName: "sessionsTable",
  },
  account: {
    modelName: "accountsTable",
  },
  verification: {
    modelName: "verificationsTable",
  },
  emailAndPassword: {
    enabled: true,
  },
});
