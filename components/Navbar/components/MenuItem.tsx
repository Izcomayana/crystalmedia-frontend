"use client";
import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

//icons
import { RiHomeLine } from "react-icons/ri";
import { PiUsersThree } from "react-icons/pi";
import { RiAppsLine } from "react-icons/ri";
import { BsCalendarDate } from "react-icons/bs";
import { BiNews } from "react-icons/bi";

// Define the type for the props
interface MenuItemProps {
  i: number;
  toggleOpen: () => void;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  },
};

const href = ["/", "/whoweare", "/#", "/portfolio", "/blogs", "#"];
const name = [
  "Home",
  "Who we are",
  "What we do",
  "Our Portfolio",
  "Our Blog",
  "Contact Us",
];

const icons = [ <RiHomeLine />, <PiUsersThree />, <PiUsersThree />, <RiAppsLine />, <BiNews />, <BsCalendarDate />, ];

const MenuItem: React.FC<MenuItemProps> = ({ i, toggleOpen }) => {
  const style = { color: "white" };

  return (
    <div>
      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        onClick={toggleOpen}
        className="p-4 w-80 hover:bg-primaryBlue focus:bg-primaryBlue active:bg-primaryBlue rounded-xl mb-6"
      >
        <Link href={href[i]} className="text-placeholder flex items-center text-base gap-6" style={style} >
          <div style={style}>{icons[i]}</div>
          {name[i]}
        </Link>
      </motion.li>
    </div>
  );
};

export default MenuItem;
