import { Store } from "@/types";

const URL = `${process.env.NEXT_STORE_API_URL}`;
const store = `${process.env.NEXT_STORE_ID}`;

const getStore = async (): Promise<Store> => {
  const res = await fetch(`${URL}/${store}`);

  return res.json();
};

export default getStore;
