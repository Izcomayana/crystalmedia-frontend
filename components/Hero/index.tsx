"use client";
import { motion } from "framer-motion";

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible,
};

interface HeroProps {
  title: string;
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <section>
      <div className="py-8 bg-[#000000] mt-[-4px]">
        <div className="container mx-auto my-32 mb-44">
          <motion.div
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 1 } }}
            variants={{ visible: { transition: { staggerChildren: 1 } } }}
            className="my-40"
          >
            <ul className="text-white w-fit">
              <motion.li variants={itemVariants}>
                <h1 className="text-white font-bold text-4xl lg:text-7xl">
                  {title}
                </h1>
              </motion.li>
              <motion.li variants={itemVariants}>
                <h6 className="text-white font-medium mt-2 text-xl lg:text-2xl">
                  {subtitle}
                </h6>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
