"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { doctorsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";

export const deleteDoctor = actionClient
  .schema(z.object({ id: z.string().uuid() }))
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) throw new Error("Unauthorized");

    const doctor = await db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, parsedInput.id),
    });

    if (!doctor) throw new Error("Médico não encontrado");

    if (doctor.clinicId !== session.user.clinic?.id) {
      throw new Error("Médico não encontrado");
    }

    await db.delete(doctorsTable).where(eq(doctorsTable.id, parsedInput.id));
    revalidatePath("/doctors");
  });
