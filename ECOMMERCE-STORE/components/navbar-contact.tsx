import Link from "next/link";



const NavbarContact = () => {

  return ( 
    <div className="ml-auto flex items-center gap-x-4">
      <Link href="/contact">
        Contact
        </Link>
    </div>
  );
}
 
export default NavbarContact; 