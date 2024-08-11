'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// image
import slantarrow from '@/public/images/slant-arrow.png';
import arrow from '@/public/images/arrow.png';

const CTA = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section>
      <div className='container mx-auto my-20'>
        <p className='mb-2 text-sm lg:mb-4'>Ready to grow?</p>
        <Link 
          href={'/#'} className='flex justify-between border-b border-black pb-2 w-fit transition-all md:w-2/3 lg:pb-6'           
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className='mr-8 font-semibold text-lg lg:text-3xl xl:text-[56px]'>Let’s start a project together</span>
          <div className="relative w-8 h-6">
            <Image 
              src={slantarrow} 
              alt={'arrow'} 
              className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
            />
            <Image 
              src={arrow} 
              alt={'arrow'} 
              className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
            />
          </div>
        </Link>
      </div>
    </section>
  )
}

export default CTA;