import Image from "next/image";

// images
import zenith from "@/public/images/zenith-bank.png";
import ariya from "@/public/images/247 -Ariay.png";
import ahalo from "@/public/images/m-foods.png";
import olayemi from "@/public/images/olayemi-logo.png";

const Testimonials = () => {
  return (
    <section>
      <div className="container mx-auto my-10">
        <p className="font-semibold text-sm lg:text-lg">
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
    </section>
  );
};

export default Testimonials;
