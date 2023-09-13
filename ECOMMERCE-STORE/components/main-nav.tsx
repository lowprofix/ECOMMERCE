"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const categoryOrder = [
    "004707c8-2d8d-44da-a50b-b272dbbc2b0d",
    "2381e18e-18aa-4bd6-b99b-572795c44625",
    "22f1e680-97c0-4442-9922-5746f489d18d",
  ];

  const routes = data
    .sort((a, b) => categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id))
    .map((route) => ({
      href: `/category/${route.id}`,
      label: route.name,
      active: pathname === `/category/${route.id}`,
    }));

  return (
    <nav className="mx-4 flex items-center space-x-3 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
