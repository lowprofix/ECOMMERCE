"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type AvailabilityColumn = {
  id: string;
  startTime: string;
  endTime: string;
  product: string;
  category: string;
  createdAt: string;
};

export const columns: ColumnDef<AvailabilityColumn>[] = [
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: ({ row }) => row.original.category,
  },
  {
    accessorKey: "productId",
    header: "Product & Service",
    cell: ({ row }) => row.original.product,
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "endTime",
    header: "End Time",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];