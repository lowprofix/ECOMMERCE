import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import Image from "next/image";
import getStore from "@/actions/get-stores";


const Navbar = async () => {
  const categories = await getCategories();
  const store = await getStore();
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 justify-between">
          <div className="flex items-center gap-x-2">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <div className="flex items-center transition-transform duration-500 ease-in-out hover:scale-110">
              <Image
                src={store?.logoUrl}
                alt="logo"
                width={500}
                height={500}
                className="w-8 h-8  sm:w-11 sm:h-11 "
              />
              <div className="font-bold text-2xl hidden sm:block">{store?.name}</div>
            </div>
          </Link>
          <MainNav data={categories} />
         </div>
      
          <div className="flex gap-x-2">
       
            <NavbarActions />
          </div>
          
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
