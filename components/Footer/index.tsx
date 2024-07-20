import Image from 'next/image';
import { Button } from '../ui/button';
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";

const Footer = () => {
  return (
    <footer>
      <div>
        <div className='bg-[#00338D] flex flex-col justify-center items-center p-20'>
          <h2 className='font-extrabold text-white text-3xl xl:text-5xl'>5x more reach</h2>
          <h2 className='font-extrabold text-white text-3xl mt-2 xl:text-5xl'>5x more sales.</h2>
          <p className='mt-4 text-center text-white'>
            We share tips and strategies for growing your business and standing out in today’s <br />
            competitive market in our weekly newsletters.  We know scaling isn’t always easy, so we’re <br />
            here to support you through every phase. You can opt out of our newsletter anytime.
          </p>
          <Button className='mt-6 bg-white text-[#00338D] font-semibold hover:bg-[#cccdff] transition-all'>Get Started</Button>
        </div>
        <div className='bg-black flex justify-center items-center p-16'>
          <FaTiktok className='text-white w-6 h-6' />
          <FaXTwitter className='text-white w-6 h-6 mx-4' />
          <PiInstagramLogoFill className='text-white w-6 h-6' />
        </div>
      </div>
    </footer>
  )
}

export default Footer;