"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UpsertDoctorForm } from "./upsert-doctor-form";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export const AddDoctorButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-fit">
          <Plus />
          Adicionar médico
        </Button>
      </DialogTrigger>
      <UpsertDoctorForm onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
};
