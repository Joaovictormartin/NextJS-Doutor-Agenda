"use client";

import { Calendar } from "lucide-react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import {
  appointmentsTableColumns,
  AppointmentWithRelations,
} from "../../appointments/_components/table-columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TodayAgendaProps {
  todayAppointments: AppointmentWithRelations[];
}

export const TodayAgenda = ({ todayAppointments }: TodayAgendaProps) => {
  const table = useReactTable({
    data: todayAppointments,
    columns: appointmentsTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Calendar className="text-muted-foreground" />
          <CardTitle className="text-base">Agendamentos de hoje</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable table={table} />
      </CardContent>
    </Card>
  );
};
