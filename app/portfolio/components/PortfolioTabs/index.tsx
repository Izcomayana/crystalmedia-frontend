"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import usePortfolioState, { TiktokCampaign } from "../usePortfolioState";

const PortfolioTabs = () => {
  const state = usePortfolioState();

  if (!state.portfolios.length) {
    return <Loader />;
  }

  const renderImages = (items: { id: number; src: string }[], altPrefix: string) => (
    <div className="flex flex-wrap gap-2 justify-start">
      {items.map((item) => (
        <div key={item.id}>
          <Image src={item.src} alt={`${altPrefix}-${item.id}`} width={300} height={400} className="mx-auto" />
        </div>
      ))}
    </div>
  );

  const renderTiktokCampaigns = (items: TiktokCampaign[]) => (
    <div className="flex flex-wrap gap-2 justify-start">
      {items.map((item) => (
        <div key={item.id} className="md:w-1/2 md:mx-auto lg:w-fit">
          <div className="w-fit mx-auto">
            <Image src={item.image} alt={item.name} width={400} height={300} />
          </div>
          <div className="bg-primaryBlue p-4 mt-1 text-white">
            <h4 className="font-bold text-lg">{item.name}</h4>
            <p>{item.role}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderVideos = (items: { id: number; video: string; caption: string }[]) => (
    items.map((item) => (
      <div key={item.id}>
        <div className="w-full h-min mx-auto my-10 loop md:mb-20">
          <video className="h-full w-full rounded-3xl cursor-pointer" loop controls muted>
            <source src={item.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-4">
          <p className="font-medium text-black">{item.caption}</p>
        </div>
      </div>
    ))
  );

  return (
    <div className="container mx-auto">
      <Tabs defaultValue="design" className="my-10 lg:my-20">
        <TabsList className="bg-transparent h-fit px-0 flex flex-wrap gap-4 justify-start lg:gap-6">
          {state.portfolios.map((portfolio) => (
            <TabsTrigger key={portfolio.id} value={portfolio.value} className="py-3 px-4 text-black border-black border rounded-lg hover:!bg-primaryBlue hover:!text-white hover:!border-white focus:!bg-primaryBlue focus:!text-white focus:!border-white active:!bg-primaryBlue active:!text-white active:!border-white transition-all">
              {portfolio.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-5">
          <TabsContent value="design">
            <Tabs defaultValue="sm-creatives">
              <TabsList className="bg-transparent h-fit px-0 flex flex-wrap gap-4 justify-start">
                {state.designs.map((design) => (
                  <TabsTrigger key={design.id} value={design.value} className="!bg-transparent !px-2 !py-1 rounded-none !shadow-none !text-[#868786] border-b hover:!text-black hover:!border-b-black active:!text-black focus:!text-black focus:!border-b-black active:!border-b-black">
                    {design.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="sm-creatives">
                {renderImages(state.SMDesigns, "smdesign")}
              </TabsContent>
              <TabsContent value="brand-identity">
                {renderImages(state.brands, "brand")}
              </TabsContent>
              <TabsContent value="web-design">
                {renderImages(state.webDesigns, "webdesign")}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="influencer-marketing">
            <Tabs defaultValue="twitter-trends">
              <TabsList className="bg-transparent h-fit px-0 flex flex-wrap gap-4 justify-start">
                {state.influencerMarketing.map((influencer) => (
                  <TabsTrigger key={influencer.id} value={influencer.value} className="!bg-transparent !px-2 !py-1 rounded-none !shadow-none !text-[#868786] border-b hover:!text-black hover:!border-b-black active:!text-black focus:!text-black focus:!border-b-black active:!border-b-black">
                    {influencer.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="twitter-trends">
                {renderImages(state.twitterTrends, "trend")}
              </TabsContent>
              <TabsContent value="twitter-campaigns">
                {renderImages(state.twitterCampaigns, "campaign")}
              </TabsContent>
              <TabsContent value="tiktok-campaigns">
                <p className="font-semibold text-lg my-5 lg:text-2xl">Tiktok influencers we&apos;ve worked with</p>
                {renderTiktokCampaigns(state.tiktokCampaigns)}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="public-relaton">
            {renderVideos(state.publicRelations)}
          </TabsContent>

          <TabsContent value="social-media">
            {renderVideos(state.socialMedias)}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PortfolioTabs;


