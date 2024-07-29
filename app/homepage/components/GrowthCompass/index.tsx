import Image from "next/image";
import GrowthCompassImg from "@/public/images/growth-compass.png";

const GrowthCompass = () => {
  return (
    <section>
      <div className="bg-[#F1F6FF]">
        <div className="container mx-auto flex justify-between items-center gap-4 py-10 lg:py-20">
          <div className="relative flex flex-col justify-center overflow-hidden">
            <div className="w-full max-w-6xl mx-auto py-24">
              <div className=""  data-aos="fade-right">
                <div className="font-bold text-base [text-wrap:balance] bg-clip-text md:text-3xl xl:text-5xl">
                  We help brands grow <br /> and increase their <br /> revenue
                  through <br />{" "}
                  <span className="inline-flex flex-col h-[calc(theme(fontSize.sm)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] overflow-hidden xl:h-[calc(theme(fontSize.5xl)*theme(lineHeight.tight))]">
                    <ul className="block animate-text-slide text-primaryBlue text-left leading-tight [&_li]:block">
                      <li>Branding</li>
                      <li>Digital Marketing</li>
                      <li>Social Media Marketing</li>
                      <li>Design</li>
                      <li>Influencer Marketing</li>
                      <li aria-hidden="true">Branding</li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[40%]" data-aos="fade-left">
            <Image
              src={GrowthCompassImg}
              alt={"GrowthCompassImg"}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthCompass;
