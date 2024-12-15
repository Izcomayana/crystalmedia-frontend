"use client";
import VideoCarousel from "@/components/VideoCarousel";

const GrowthTips = () => {
  return (
    <section>
      <div className="container mx-auto my-10 xl:mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold xl:text-[40px]">Growth Tips</h2>
          <p className="text-sm xl:mt-2 xl:text-base">By Crystalmediatech</p>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default GrowthTips;
