"use client";
import { motion } from 'framer-motion';

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible
};

const HomeHero = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 1 } } }}
      className='my-40'
    >
      <ul className='text-white w-fit mx-auto'>
        <motion.li variants={itemVariants}>
          <span className='font-black text-4xl lg:text-7xl'>Be Seen</span>
        </motion.li>
        <motion.li variants={itemVariants} className='my-4'>
          <span className='font-black text-4xl lg:text-7xl'>Be Heard</span>
        </motion.li>
        <motion.li variants={itemVariants}>
          <span className='font-black text-4xl lg:text-7xl'>Make Sales</span>
        </motion.li>
      </ul>
    </motion.div>
  );
};

export default HomeHero;
