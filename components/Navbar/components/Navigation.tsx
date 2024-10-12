"use client";
import * as React from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import Image from "next/image";
import CMT from "@/public/images/cmt-full-logo.svg";
import { useState } from "react";

const variants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
      y: { stiffness: 1000, velocity: -100 },
    },
    y: 0,
    opacity: 1,
    zIndex: 6,
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      y: { stiffness: 1000 },
    },
    y: 50,
    opacity: 0,
    zIndex: -100,
  },
};

const style = { color: "white" };
const itemIds = [0, 1, 2, 3, 4, 5];

export const Navigation = ({
  toggleOpen,
  isOpen,
}: {
  toggleOpen: () => void;
  isOpen: boolean;
}) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleDropdownToggle = (index: number | null) => {
    setActiveDropdown(index === activeDropdown ? null : index);
  };

  const closeNav = () => {
    toggleOpen();
    setActiveDropdown(null);
  };

  return (
    <div>
      <motion.ul
        variants={variants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="w-80 mb-16" style={style}>
          <Image src={CMT} alt={"cmt-log"} className="w-full" />
        </div>
        {itemIds.map((i) => (
          <MenuItem
            i={i}
            key={i}
            hasDropdown={i === 2}
            toggleOpen={toggleOpen}
            activeDropdown={activeDropdown}
            onDropdownToggle={() => handleDropdownToggle(i)}
            closeNav={closeNav} 
          />
        ))}
      </motion.ul>
    </div>
  );
};
