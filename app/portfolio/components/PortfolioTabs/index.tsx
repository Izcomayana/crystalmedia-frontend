// PortfolioTabs.tsx
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import usePortfolioState, {
  Portfolio,
  Image as PortfolioImage,
  Video as PortfolioVideo,
} from "../usePortfolioState";

const PortfolioTabs = () => {
  const state = usePortfolioState();

  if (!state.portfoliosData.length) {
    return <Loader />;
  }

  const renderImages = (data: PortfolioImage[], name: string) => (
    <div
      className="flex flex-wrap gap-2 justify-start"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
      {data.map((image) => (
        <div key={image.id}>
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI}${image.attributes.url}`}
            alt={image.attributes.altText}
            width={image.attributes.width}
            height={image.attributes.height}
            className="mx-auto"
          />
        </div>
      ))}
    </div>
  );

  const renderMedia = (portfolio: Portfolio) => (
    <div>
      {portfolio.attributes.video?.data ? (
        <div key={portfolio.attributes.video.data.id}>
          <div className="w-full h-min mx-auto my-10 loop md:mb-20">
            <video
              className="h-full w-full rounded-3xl cursor-pointer"
              loop
              controls
              muted
            >
              <source
                src={`${process.env.NEXT_PUBLIC_STRAPI}${portfolio.attributes.video.data.attributes.url}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          {portfolio.attributes.caption && (
            <div className="mt-4">
              <p
                className="font-medium text-black text-base"
                data-aos="fade-up"
                data-aos-anchor-placement="center-center"
              >
                {portfolio.attributes.caption}
              </p>
            </div>
          )}
        </div>
      ) : (
        renderImages(
          portfolio.attributes.subtabs.data.flatMap((subtab) =>
            subtab.attributes.images.data ? subtab.attributes.images.data : []
          ),
          portfolio.attributes.name
        )
      )}
    </div>
  );

  return (
    <div className="container mx-auto">
      <Tabs defaultValue="design" className="my-10 lg:my-20">
        <TabsList className="bg-transparent h-fit px-0 flex flex-wrap gap-2 justify-start lg:gap-4">
          {state.portfoliosData.map((portfolio) => (
            <TabsTrigger
              key={portfolio.id}
              value={portfolio.attributes.value}
              className="py-2 px-3 text-xs text-black border-black border rounded-3xl hover:!bg-primaryBlue hover:!text-white hover:!border-white focus:!bg-primaryBlue focus:!text-white focus:!border-white active:!bg-primaryBlue active:!text-white active:!border-white transition-all md:text-sm xl:text-xl"
            >
              {portfolio.attributes.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-5">
          {state.portfoliosData.map(
            (portfolio: { id: number; attributes: any }) => (
              <TabsContent
                key={portfolio.id}
                value={portfolio.attributes.value}
                className="flex flex-wrap gap-4 justify-start"
              >
                {portfolio.attributes.subtabs.data.length ? (
                  <Tabs
                    key={portfolio.id}
                    defaultValue={
                      portfolio.attributes.subtabs.data[0].attributes.value
                    }
                  >
                    <TabsList className="bg-transparent h-fit px-0 gap-4">
                      {portfolio.attributes.subtabs.data.map(
                        (subtab: {
                          id: number;
                          attributes: { value: string; name: string };
                        }) => (
                          <TabsTrigger
                            key={subtab.id}
                            value={subtab.attributes.value}
                            className="!bg-transparent !text-[9px] xl:!text-base !px-2 !py-1 rounded-none !shadow-none !text-[#868786] border-b hover:!text-black hover:!border-b-black active:!text-black focus:!text-black focus:!border-b-black active:!border-b-black"
                          >
                            {subtab.attributes.name}
                          </TabsTrigger>
                        )
                      )}
                    </TabsList>

                    {portfolio.attributes.subtabs.data.map(
                      (subtab: {
                        id: number;
                        attributes: {
                          value: string;
                          images: { data: PortfolioImage[] };
                          name: string;
                        };
                      }) => (
                        <TabsContent
                          key={subtab.id}
                          value={subtab.attributes.value}
                        >
                          {renderImages(
                            subtab.attributes.images.data
                              ? subtab.attributes.images.data
                              : [],
                            subtab.attributes.name
                          )}
                        </TabsContent>
                      )
                    )}
                  </Tabs>
                ) : (
                  renderMedia(portfolio)
                )}
              </TabsContent>
            )
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default PortfolioTabs;
