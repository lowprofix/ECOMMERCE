import { Availability } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/availabilities`;

const getAvailabilities = async (): Promise<Availability[]> => {
  const res = await fetch(URL);
  return res.json();
};

export default getAvailabilities;

