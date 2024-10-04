"use client";
import VideoCarousel from "@/components/VideoCarousel";
import useFetch from "@/lib/api";
import { EmblaOptionsType } from "embla-carousel";
import Loader from "@/components/Loader";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

const GrowthTips = () => {
  const { loading, error, data } = useFetch<{ data: any; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/tips-videos?populate=*`,
  );

  if (loading)
    return (
      <div className="mx-auto container flex flex-col justify-between">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="mx-auto container flex flex-col justify-between">
        Error loading videos
      </div>
    );

  const Videos =
    data?.data?.map((item: any) => ({
      data: {
        id: item.id,
        attributes: {
          video: {
            data: {
              id: item.attributes.video.data[0].id,
              attributes: {
                name: item.attributes.video.data[0].attributes.name,
                altText:
                  item.attributes.video.data[0].attributes.alternativeText,
                url: item.attributes.video.data[0].attributes.url,
                caption: item.attributes.video.data[0].attributes.caption,
                mime: item.attributes.video.data[0].attributes.mime,
              },
            },
          },
        },
      },
    })) || [];

  return (
    <section>
      <div className="container mx-auto my-10 xl:mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold xl:text-[40px]">Growth Tips</h2>
          <p className="text-sm xl:mt-2 xl:text-base">By Crystalmediatech</p>
        </div>

        <div className="">
          <VideoCarousel Videos={Videos} options={OPTIONS} />
        </div>
      </div>
    </section>
  );
};

export default GrowthTips;
