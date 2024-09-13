"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/components/Loader";
import usePortfolioState from "../usePortfolioState";
import TabsLayout from "../TabsLayout";

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

  return (
    <div className="container mx-auto">
      <Tabs value={activeTab} onValueChange={handleTabClick} className="my-10 lg:my-20">
        <TabsList className="bg-transparent h-fit px-0 flex flex-wrap gap-2 justify-start lg:gap-4">
          {state.portfoliosData.map((portfolio) => (
            <TabsTrigger
              key={portfolio.id}
              value={portfolio.attributes.value}
              className={`py-2 px-3 text-xs border rounded-3xl transition-all md:text-sm xl:text-lg ${
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
            <TabsContent key={portfolio.id} value={portfolio.attributes.value} className="flex flex-wrap gap-4 justify-start">
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