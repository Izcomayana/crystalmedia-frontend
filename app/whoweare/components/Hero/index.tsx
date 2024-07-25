"use client";
import { motion } from "framer-motion";

const visible = { opacity: 1, x: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible,
};

const Hero = () => {
  return (
    <section>
      <div className="p-8 bg-[#000309] mt-[-4px]">
        <div className="container mx-auto">
          <div className="border-b-2 w-full border-white pb-2">
            <p className="font-medium text-white text-sm lg:text-xl lg:font-semibold xl:text-2xl">
              We are
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 1 } }}
            variants={{ visible: { transition: { staggerChildren: 1 } } }}
            className="my-40"
          >
            <ul className="text-white mx-auto w-fit">
              <motion.li variants={itemVariants}>
                <span className="font-bold text-5xl ml-[-1rem] lg:text-7xl xl:text-[120px]">
                  THE
                </span>
              </motion.li>
              <motion.li variants={itemVariants} className="my-4 ">
                <span className="font-bold text-5xl lg:text-7xl xl:text-[120px]">GROWTH</span>
              </motion.li>
              <motion.li variants={itemVariants}>
                <span className="font-bold text-5xl ml-[-4rem] lg:text-7xl lg:ml-[-7rem] xl:text-[120px]">
                  COMPASS
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
