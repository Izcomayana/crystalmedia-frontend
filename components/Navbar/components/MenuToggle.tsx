'use client';
import * as React from "react";
import { SVGMotionProps, motion } from "framer-motion";

// Define the type for the props
interface MenuToggleProps {
  toggle: () => void;
}

// Define the Path component with the appropriate props
const Path = (props: React.JSX.IntrinsicAttributes & SVGMotionProps<SVGPathElement> & React.RefAttributes<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="rgb(255 255 255)"
    strokeLinecap="round"
    {...props}
  />
);

// Define the MenuToggle component with typed props
export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle }) => (
  <button onClick={toggle} className="nav-button">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);
