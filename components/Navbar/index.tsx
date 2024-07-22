'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button";
import { useState } from "react";

// image
import CMT from "@/public/images/cmt-full-logo.svg";

const links = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Who we are", href: "/whoweare" },
  { id: 3, name: "What we do", href: "/whatwedo" },
  { id: 4, name: "Our Portfolio", href: "/portfolio" },
  { id: 5, name: "Our Blog", href: "/blog" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <header className="hidden justify-between items-center lg:flex">
      <div className="w-32 md:w-48">
        <Image src={CMT} alt={"cmt log"} className="w-full" />
      </div>

      <div className="hidden w-[450px] lg:block xl:w-[600px]">
        <ul className="flex justify-between items-center">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="text-white hover:text-[#4173CB] active:text-[#4173CB] focus:text-[#4173CB] transition-all"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Button className="bg-[#FFFFFF] text-primaryBlue text-sm px-4 py-3 rounded-[10px] hover:bg-[#c9c9c9] transition-all">
          Contact us
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
