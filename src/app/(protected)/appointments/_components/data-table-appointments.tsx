"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  appointmentsTableColumns,
  AppointmentWithRelations,
} from "../_components/table-columns";
import { DataTable } from "@/components/ui/data-table";

interface DataTableAppointmentsProps {
  appointments: AppointmentWithRelations[];
}

export const DataTableAppointments = ({
  appointments,
}: DataTableAppointmentsProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: appointments,
    state: { sorting },
    columns: appointmentsTableColumns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return <DataTable table={table} />;
};
