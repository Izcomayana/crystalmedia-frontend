"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import circledown from "@/public/images/circledown-arrow.png";

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible,
};

const scrollDown = () => {
  const nextSection = document.getElementById("growthCompass");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};

const HomeHero = () => {
  return (
    <div className="p-8 bg-[#000309] mt-[-4px] lg:h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 1 } } }}
        className="pt-24 lg:mb-8"
      >
        <ul className="text-white w-fit mx-auto">
          <motion.li variants={itemVariants}>
            <span className="font-black text-[41.7px] lg:text-7xl">
              Be Seen
            </span>
          </motion.li>
          <motion.li variants={itemVariants} className="my-4">
            <span className="font-black text-[41.7px] lg:text-7xl">
              Be Heard
            </span>
          </motion.li>
          <motion.li variants={itemVariants}>
            <span className="font-black text-[41.7px] lg:text-7xl">
              Make Sales.
            </span>
          </motion.li>
        </ul>

        <div className="flex flex-col justify-center items-center mt-48">
          <div className="animate-bounce w-20 h-20 text-white">
            <Image
              src={circledown}
              alt={"circle down"}
              className="cursor-pointer"
              onClick={scrollDown}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeHero;
