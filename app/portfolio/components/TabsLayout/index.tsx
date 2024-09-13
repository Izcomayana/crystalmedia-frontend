import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RenderMedia from "../Renders/Media";
import { Portfolio } from "../usePortfolioState";

interface TabsLayoutProps {
  portfolio: Portfolio;
  activeSubTabs: { [key: number]: string };
  handleSubTabClick: (portfolioId: number, subtabValue: string) => void;
}

const TabsLayout: React.FC<TabsLayoutProps> = ({ portfolio, activeSubTabs, handleSubTabClick }) => {
  if (!portfolio.attributes.subtabs.data.length) {
    return <RenderMedia portfolio={portfolio} activeSubTabs={activeSubTabs} />;
  }

  return (
    <Tabs
      value={activeSubTabs[portfolio.id]}
      onValueChange={(value) => handleSubTabClick(portfolio.id, value)}
      className="w-full"
    >
      <TabsList className="bg-transparent h-fit px-0 gap-3 flex-wrap justify-start">
        {portfolio.attributes.subtabs.data.map((subtab) => (
          <TabsTrigger
            key={subtab.id}
            value={subtab.attributes.value}
            className={`!text-[9px] xl:!text-base !px-2 !py-1 rounded-none !shadow-none ${
              activeSubTabs[portfolio.id] === subtab.attributes.value
                ? "!text-black !border-b !border-b-black focus:!text-black focus:!border-b-black !focus-visible:ring-0"
                : "!bg-transparent !text-[#868786]"
            } hover:!text-black hover:!border-b-black`}
          >
            {subtab.attributes.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {portfolio.attributes.subtabs.data.map((subtab) => (
        <TabsContent key={subtab.id} value={subtab.attributes.value}>
          <RenderMedia portfolio={portfolio} subtab={subtab} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsLayout;
