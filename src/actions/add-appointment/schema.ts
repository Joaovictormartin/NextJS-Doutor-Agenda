import { z } from "zod";

export const addAppointmentSchema = z.object({
  date: z.date({ message: "Data é obrigatória." }),
  time: z.string().min(1, { message: "Horário é obrigatório." }),
  doctorId: z.string().uuid({ message: "Médico é obrigatório." }),
  patientId: z.string().uuid({ message: "Paciente é obrigatório." }),
  appointmentPriceInCents: z
    .number()
    .min(1, { message: "Valor da consulta é obrigatório." }),
});
