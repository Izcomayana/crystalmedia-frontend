import Image from "next/image";

// images
import zenith from "@/public/zenith-bank.png";
import ariya from "@/public/247 -Ariay.png";
import ahalo from "@/public/m-foods.png";
import olayemi from "@/public/olayemi-logo.png";

const Testimonials = () => {
  return (
    <div>
      <p className="font-semibold text-xs">
        We are trusted by marketers and executives from these
      </p>
      <div className="flex justify-between items-center mt-4 md:w-[400px] lg:w-[600px]">
        <div className="w-6 md:w-16">
          <Image src={zenith} alt={"zenith-bank"} className="w-full" />
        </div>
        <div className="w-20 md:w-12 xl:w-24">
          <Image src={ariya} alt={"247Ariya"} className="w-full" />
        </div>
        <div className="w-16 md:w-12 xl:w-24">
          <Image src={ahalo} alt={"ahalo-foods"} className="w-full" />
        </div>
        <div className="w-8 md:w-12 xl:w-20">
          <Image src={olayemi} alt={"olayemi-royal"} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
