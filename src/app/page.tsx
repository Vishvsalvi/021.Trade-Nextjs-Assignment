"use client"

import  { ColumnDef} from "@tanstack/react-table"


import { Data, dummyData } from "./Dummydata";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "lucide-react";
import { DataTable } from "@/components/DataTable";

export const columns: ColumnDef<Data>[] = [
  {
    id: "select",
    header: () => null,
    cell: ({ row }) => (
      <div className="opacity-0 absolute">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "time",
    header: "Time"
  },
  {
    accessorKey: "client",
    header: "Client"
  },
  {
    accessorKey: "ticker",
    header: "Ticker",
    cell: ({ row, getValue }) => {
      return (
        <div className="flex items-center gap-2">
          {row.getIsSelected() && <Radio className="h-4 w-4 text-blue-500" />}
          <span>{getValue() as string}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "side",
    header: "Side"
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    accessorKey: "product",
    header: "Product"
  },
  {
    accessorKey: "price",
    header: "Price"
  }
]

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-start justify-start gap-4 px-16 py-6">
      <h1 className="text-2xl font-bold">Order Table</h1>
      <div className="w-full">
        <DataTable columns={columns} data={dummyData} />
      </div>
    </main>
  );
}



