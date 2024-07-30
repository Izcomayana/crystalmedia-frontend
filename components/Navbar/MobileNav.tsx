"use client";
import * as React from "react";
import { useRef, useState } from "react";
import { motion, sync, useCycle } from "framer-motion";
import { MenuToggle } from "./components/MenuToggle";
import { Navigation } from "./components/Navigation";
import Image from "next/image";

import CMT from "@/public/images/cmt-full-logo.svg";
import Link from "next/link";

const sidenavbar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 0px 0px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const MobileNav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop === 0) {
        setIsScrollingDown(true); 
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
    <div className="nav lg:hidden">
      <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
        <motion.div className="background" variants={sidenavbar} />
        <div
          className={`flex justify-between items-center p-4 bg-black shadow-sm ${
            isScrollingDown ? "translate-y-0" : "-translate-y-full"
          } transition-transform duration-300 z-10 relative bg-opacity-80 bg-clip-padding blur-backdrop-filter`}
        >
          <div className="absolute inset-0 z-[-100] block w-full h-full shadow-md opacity-50"></div>
          <div className={`w-40 md:w-48 ${isOpen ? "opacity-0" : "opacity-1"}`}>
            <Link href="/">
              <Image src={CMT} alt={"cmt log"} className="w-full" />
            </Link>
          </div>
          <div className="">
            <MenuToggle toggle={toggleOpen} />
          </div>
        </div>
        <Navigation toggleOpen={toggleOpen} isOpen={isOpen} />
      </motion.nav>
    </div>
  );
};

export default MobileNav;
