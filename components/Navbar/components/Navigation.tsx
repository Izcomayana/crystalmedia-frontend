'use client';
import * as React from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";
import Image from "next/image";
import CMT from "@/public/cmt-full-logo.svg";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2, y: { stiffness: 1000, velocity: -100 } },
    y: 0,
    opacity: 1,
    zIndex: 6
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1, y: { stiffness: 1000 } },
    y: 50,
    opacity: 0,
    zIndex: -100
  }
};

const style = { color: 'white' };

export const Navigation = () => (
  <div>
    <motion.ul variants={variants}>
      <div className="w-80 mb-16" style={style}>
        <Image src={CMT} alt={"cmt-log"} className="w-full" />
      </div>
      {itemIds.map(i => (
        <MenuItem i={i} key={i} />
      ))}
    </motion.ul>
  </div>
  
);

const itemIds = [0, 1, 2, 3, 4];
