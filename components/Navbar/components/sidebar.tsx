"use client";
import * as React from "react";
import { useRef } from "react";
import { motion, sync, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import Image from "next/image";

import CMT from "@/public/images/cmt-full-logo.svg";

const sidenavbar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
    zIndex: 3
  }),
  closed: {
    clipPath: "circle(0px at 0px 0px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
    zIndex: 0
  },
};

const Sidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  return (
    <div className="nav lg:hidden">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        ref={containerRef}
      >
        <motion.div className="background" variants={sidenavbar} />
        <div className="flex justify-between items-center m-4">
          <div className="w-40 md:w-48">
            <Image src={CMT} alt={"cmt log"} className="w-full" />
          </div>
          <MenuToggle toggle={() => toggleOpen()} />
        </div>
        <Navigation />
      </motion.nav>
    </div>
  );
};

export default Sidebar;
