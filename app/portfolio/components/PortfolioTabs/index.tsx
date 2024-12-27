"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/components/Loader";
import usePortfolioState from "../usePortfolioState";
import TabsLayout from "../TabsLayout";

const PortfolioTabs = () => {
  const state = usePortfolioState();
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
  const [activeSubTabs, setActiveSubTabs] = useState<{ [key: string]: string }>(
    {},
  );

  useEffect(() => {
    console.log("Initial Portfolio Data:", state.portfoliosData);
    if (state.portfoliosData.length > 0) {
      const initialTab = state.portfoliosData[0].value;
      setActiveTab(initialTab);

      const initialSubTabs = state.portfoliosData.reduce(
        (acc, portfolio) => {
          if (portfolio.subtabs?.length) {
            acc[portfolio.id] = portfolio.subtabs[0].value;
          }
          return acc;
        },
        {} as { [key: string]: string },
      );

      setActiveSubTabs(initialSubTabs);
    }
  }, [state.portfoliosData]);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    console.log("Active Tab Set:", value);
  };

  const handleSubTabClick = (portfolioId: string, subtabValue: string) => {
    setActiveSubTabs((prevState) => ({
      ...prevState,
      [portfolioId]: subtabValue,
    }));
    console.log("Active SubTab Set:", { portfolioId, subtabValue });
  };

  if (!state.portfoliosData.length) {
    return <Loader />;
  }

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
              value={portfolio.value}
              className={`p-2 text-sm border rounded-3xl transition-all md:px-3 md:text-base xl:text-xl ${
                activeTab === portfolio.value
                  ? "!bg-primaryBlue !text-white !border-white focus:!bg-primaryBlue focus:!text-white focus:!border-white"
                  : "bg-transparent text-black border-black"
              } hover:!bg-primaryBlue hover:!text-white hover:!border-white`}
            >
              {portfolio.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-5">
          {state.portfoliosData.map((portfolio) => (
            <TabsContent
              key={portfolio.id}
              value={portfolio.value}
              className="flex flex-wrap gap-4 justify-start"
            >
              <TabsLayout
                portfolio={portfolio}
                activeSubTabs={activeSubTabs}
                handleSubTabClick={handleSubTabClick}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default PortfolioTabs;
