import Navbar from '../Navbar';
import Image from 'next/image';
import circledown from '@/public/circledown-arrow.png';
import HomeHero from '@/app/homepage/components/HomHero';
import MobileNav from "@/components/Navbar/MobileNav";

const Hero = () => {
  return (
    <div className='container px-auto p-8'>
      <Navbar />
      <MobileNav />
      <HomeHero />
      <div className='flex flex-col justify-center items-center mb-20'>
        <div className="animate-bounce w-20 h-20 text-white">
          <Image src={circledown} alt={'circle down'} className='cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Hero;