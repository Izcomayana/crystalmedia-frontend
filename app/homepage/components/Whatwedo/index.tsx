import * as React from "react"

import EmblaCarousel from '@/components/ui/emblaCaousel';
import { EmblaOptionsType } from 'embla-carousel';
import smmam from "@/public/images/smmam.png";
import desbra from "@/public/images/design-branding.png";
import infmark from "@/public/images/influencer-marketting.png";
import PR from "@/public/images/PR.png";
import Image from "next/image";

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 4

const WEDO = [
  {
    img: smmam,
    text: "SOCIAL MEDIA MARKETING AND MANAGEMENT",
    index: 1
  },
  {
    img: desbra,
    text: "DESIGN AND BRANDING",
    index: 2
  },
  {
    img: infmark,
    text: "INFLUENCER MARKETING",
    index: 3
  },
  {
    img: PR,
    text: "PUBLIC RELATION (PR)",
    index: 4
  }
]

const Whatwedo = () => {
  return (
    <>
      <div className="xl:hidden">
        <EmblaCarousel slides={WEDO} options={OPTIONS} />
      </div>
      
      <div className="hidden container mx-auto justify-between items-center gap-[15px] xl:flex">
        {WEDO.map((wedos) => (
          <div className="w-[25%]" key={wedos.index}>
            <div className="border-4 border-primaryBlue embla__slide__number">
              <div>
                <Image src={wedos.img} alt="social media marketing" className="mx-auto" />
              </div>
              <div className={`bg-primaryBlue p-4 ${wedos.index === 1 ? 'p-[8px]' : ''}`}>
                <h1 className={`text-white font-bold text-lg ${wedos.index === 1 ? 'text-sm' : ''}`}>{wedos.text}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
    
  )
}

export default Whatwedo;