"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UpsertPatientForm } from "./upsert-patient-form";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export const AddPatientButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-fit">
          <Plus />
          Adicionar paciente
        </Button>
      </DialogTrigger>

      <UpsertPatientForm onSuccess={() => setIsOpen(false)} isOpen={isOpen} />
    </Dialog>
  );
};
