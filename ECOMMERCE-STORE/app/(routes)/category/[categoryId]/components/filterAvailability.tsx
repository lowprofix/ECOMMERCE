"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Availability } from "@/types";

interface FilterAvailabilityProps {
  data: Availability[];
  name: string;
  valueKey: string;
};

const FilterAvailability: React.FC<FilterAvailabilityProps> = ({
  data,
  name,
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);
  
  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, { skipNull: true });

    router.push(url);
  }

  return ( 
    <div className="mb-8">
      <h3 className="text-lg font-semibold">
        {name}
      </h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => {
          const startTime = new Date(filter.startTime);
          const endTime = new Date(filter.endTime);
      
          return (
            <div key={filter.id} className="flex items-center">
              <Button
                className={cn(
                  'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
                  selectedValue === filter.id && 'bg-black text-white'
                )}
                onClick={() => onClick(filter.id)}
              >
                {startTime.toLocaleDateString()} - {endTime.toLocaleDateString()}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterAvailability;