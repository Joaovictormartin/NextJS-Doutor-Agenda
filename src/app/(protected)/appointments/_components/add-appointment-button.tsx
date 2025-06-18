"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { doctorsTable, patientsTable } from "@/db/schema";
import { AddAppointmentForm } from "./add-appointment-form";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface AddAppointmentButtonProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

export const AddAppointmentButton = ({
  patients,
  doctors,
}: AddAppointmentButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Novo agendamento
        </Button>
      </DialogTrigger>

      <AddAppointmentForm
        isOpen={isOpen}
        doctors={doctors}
        patients={patients}
        onSuccess={() => setIsOpen(false)}
      />
    </Dialog>
  );
};
