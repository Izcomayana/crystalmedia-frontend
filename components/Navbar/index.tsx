import Image from 'next/image';

// image
import CMT from "@/public/cmt-full-logo.svg";

const Navbar = () => {
  return (
    <div>
      <div className="w-32 md:w-48">
        <Image src={CMT} alt={'cmt log'} className='w-full' />
      </div>
      
      <nav>
        <div className=''>

        </div>
      </nav>

      <div>
        
      </div>
    </div>
  )
}

export default Navbar;