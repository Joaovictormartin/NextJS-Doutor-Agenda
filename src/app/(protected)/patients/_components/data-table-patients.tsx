"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

import { patientsTable } from "@/db/schema";
import { DataTable } from "@/components/ui/data-table";
import { patientsTableColumns } from "../_components/table-columns";

interface DataTablePatientsProps {
  data: (typeof patientsTable.$inferSelect)[];
}

export const DataTablePatients = ({ data }: DataTablePatientsProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    state: { sorting },
    columns: patientsTableColumns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return <DataTable table={table} />;
};
