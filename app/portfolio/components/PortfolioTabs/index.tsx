"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import usePortfolioState, {
  Caption,
  Portfolio,
  Image as PortfolioImage,
} from "../usePortfolioState";

const PortfolioTabs = () => {
  const state = usePortfolioState();
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
  const [activeSubTabs, setActiveSubTabs] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    if (state.portfoliosData.length > 0) {
      const initialTab = state.portfoliosData[0].attributes.value;
      setActiveTab(initialTab);

      const initialSubTabs = state.portfoliosData.reduce((acc, portfolio) => {
        if (portfolio.attributes.subtabs.data.length > 0) {
          acc[portfolio.id] =
            portfolio.attributes.subtabs.data[0].attributes.value;
        }
        return acc;
      }, {} as { [key: number]: string });

      setActiveSubTabs(initialSubTabs);
    }
  }, [state.portfoliosData]);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  const handleSubTabClick = (portfolioId: number, subtabValue: string) => {
    setActiveSubTabs((prevState) => ({
      ...prevState,
      [portfolioId]: subtabValue,
    }));
  };

  if (!state.portfoliosData.length) {
    return <Loader />;
  }

  const renderImages = (data: PortfolioImage[], name: string) => (
    <div className="flex flex-wrap gap-2 justify-start">
      {data.map((image) => (
        <div
          key={image.id}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
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

  const renderMedia = (portfolio: Portfolio) => {
    const renderRichText = (caption: Caption[]) => {
      return caption.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} style={{ marginBottom: "1.5em" }}>
                {block.children.map((child, idx) => {
                  let element: React.ReactNode = child.text; // Start with the text

                  // Wrap in <strong> if bold
                  if (child.bold) {
                    element = <strong key={idx}>{element}</strong>;
                  }

                  // Wrap in <em> if italic
                  if (child.italics) {
                    element = <em key={idx}>{element}</em>;
                  }

                  return <React.Fragment key={idx}>{element}</React.Fragment>; // Ensure the correct type is returned
                })}
              </p>
            );
          default:
            return null;
        }
      });
    };

    return (
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
                <div
                  className="font-medium text-black text-base"
                  data-aos="fade-up"
                  data-aos-anchor-placement="center-center"
                >
                  {renderRichText(portfolio.attributes.caption)}
                </div>
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
  };

  return (
    <div className="container mx-auto">
      <Tabs
        value={activeTab}
        onValueChange={handleTabClick}
        className="my-10 lg:my-20"
      >
        <TabsList className="bg-transparent h-fit px-0 flex flex-wrap gap-2 justify-start lg:gap-4">
          {state.portfoliosData.map((portfolio) => (
            <TabsTrigger
              key={portfolio.id}
              value={portfolio.attributes.value}
              className={`py-2 px-3 text-xs border rounded-3xl transition-all md:text-sm xl:text-xl ${
                activeTab === portfolio.attributes.value
                  ? "!bg-primaryBlue !text-white !border-white focus:!bg-primaryBlue focus:!text-white focus:!border-white"
                  : "bg-transparent text-black border-black"
              } hover:!bg-primaryBlue hover:!text-white hover:!border-white`}
            >
              {portfolio.attributes.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-5">
          {state.portfoliosData.map((portfolio) => (
            <TabsContent
              key={portfolio.id}
              value={portfolio.attributes.value}
              className="flex flex-wrap gap-4 justify-start"
            >
              {portfolio.attributes.subtabs.data.length ? (
                <Tabs
                  value={activeSubTabs[portfolio.id]}
                  onValueChange={(value) =>
                    handleSubTabClick(portfolio.id, value)
                  }
                  className="w-full"
                >
                  <TabsList className="bg-transparent h-fit px-0 gap-4">
                    {portfolio.attributes.subtabs.data.map((subtab) => (
                      <TabsTrigger
                        key={subtab.id}
                        value={subtab.attributes.value}
                        className={`!text-[9px] xl:!text-base !px-2 !py-1 rounded-none !shadow-none ${
                          activeSubTabs[portfolio.id] ===
                          subtab.attributes.value
                            ? "!text-black !border-b !border-b-black focus:!text-black focus:!border-b-black"
                            : "!bg-transparent !text-[#868786]"
                        } hover:!text-black hover:!border-b-black`}
                      >
                        {subtab.attributes.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {portfolio.attributes.subtabs.data.map((subtab) => (
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
                  ))}
                </Tabs>
              ) : (
                renderMedia(portfolio)
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default PortfolioTabs;
