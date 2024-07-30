"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// image
import CMT from "@/public/images/cmt-full-logo.svg";

const links = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Who we are", href: "/whoweare" },
  { id: 3, name: "What we do", href: "/whatwedo" },
  { id: 4, name: "Our Portfolio", href: "/portfolio" },
  { id: 5, name: "Our Blog", href: "/blogs" },
];

const Navbar = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop === 0) {
        setIsScrollingDown(true); // Show navbar when at the top
      } else if (currentScrollTop > lastScrollTop) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div
      className={`hidden fixed w-full z-10 transition-transform duration-300 lg:block ${
        isScrollingDown ? "translate-y-0" : "-translate-y-full"
      } shadow-sm py-8 bg-black bg-opacity-80 bg-clip-padding blur-backdrop-filter`}
    >
      <nav className="relative container px-auto justify-between items-center flex lg:shadow-none">
        <div className="absolute inset-0 z-0 block w-full h-full shadow-md opacity-50"></div>
        <div className="w-48 z-10">
          <Link href="/">
            <Image src={CMT} alt={"cmt log"} className="w-full" />
          </Link>
        </div>

        <div className="hidden w-[450px] z-10 lg:block xl:w-[600px]">
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

        <div className="z-10">
          <Button className="bg-[#FFFFFF] text-primaryBlue text-sm px-4 py-3 rounded-[10px] hover:bg-[#c9c9c9] transition-all">
            Contact us
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
