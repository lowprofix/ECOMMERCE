"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, AvailabilityColumn } from "./columns";

interface AvailabilityClientProps {
  data: AvailabilityColumn[];
}

export const AvailabilityClient: React.FC<AvailabilityClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Availabilities (${data.length})`} description="Manage availabilities for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/availabilities/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="service" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Availabilities" />
      <Separator />
      <ApiList entityName="availabilities" entityIdName="availabilityId" />
    </>
  );
};