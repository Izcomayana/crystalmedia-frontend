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
import { useState } from "react";

interface MenuItemProps {
  i: number;
  toggleOpen: () => void;
  hasDropdown?: boolean;
  activeDropdown: number | null;
  onDropdownToggle: () => void; 
  closeNav: () => void;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const href = ["/", "/whoweare", "#", "/portfolio", "/blogs", "#"];
const name = [
  "Home",
  "Who we are",
  "What we do",
  "Our Portfolio",
  "Our Blog",
  "Contact Us",
];

const icons = [
  <RiHomeLine />,
  <PiUsersThree />,
  <PiUsersThree />,
  <RiAppsLine />,
  <BiNews />,
  <BsCalendarDate />,
];

const whatwedos =[
  {
    name: "Social Media Marketing and Management",
    href: "/#",
  },
  {
    name: "Influencer Marketing",
    href: "/#",
  },
  {
    name: "Public Relation",
    href: "/#",
  },
  {
    name: "Design",
    href: "/#",
  },
];

const MenuItem: React.FC<MenuItemProps> = ({ i, toggleOpen, hasDropdown, activeDropdown, onDropdownToggle, closeNav }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const style = { color: "white" };

  const handleClick = () => {
    if (hasDropdown) {
      onDropdownToggle();
    } else {
      onDropdownToggle();
      toggleOpen();
    }
  };

  const handleDropdownLinkClick = () => {
    closeNav();
  };

  return (
    <div className="relative">
      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        onClick={handleClick}
        className={`p-4 w-80 hover:bg-primaryBlue focus:bg-primaryBlue active:bg-primaryBlue rounded-xl mb-6 relative transition-all 
          ${activeDropdown === i ? "z-10" : "z-0"}`} 
      >
        <Link
          href={href[i]}
          className="text-placeholder flex items-center text-base gap-6"
          style={style}
        >
          <div style={style}>{icons[i]}</div>
          {name[i]}
        </Link>

        {hasDropdown && activeDropdown === i && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="!top-16 !p-2 !w-[90%] absolute left-0 bg-gray-50 rounded-md overflow-hidden shadow-lg z-50"
        >
          {whatwedos.map((item, idx) => (
            <li key={idx}  className="mb-2 rounded-sm hover:bg-accent hover:text-accent-foreground z-50">
              <Link
                href={item.href}
                className="text-[0.65rem] text-gray-800 block p-2"
                onClick={handleDropdownLinkClick}
              >
                {item.name}
              </Link>
            </li>
          ))}        
          </motion.ul>
        )}
      </motion.li>
    </div>
  );
};

export default MenuItem;
