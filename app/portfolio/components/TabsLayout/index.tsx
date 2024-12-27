import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RenderMedia from "../Renders/Media";
import { Portfolio, SubTab } from "../usePortfolioState";

interface TabsLayoutProps {
  portfolio: Portfolio;
  activeSubTabs: { [key: string]: string };
  handleSubTabClick: (portfolioId: string, subtabValue: string) => void;
}

const TabsLayout: React.FC<TabsLayoutProps> = ({
  portfolio,
  activeSubTabs,
  handleSubTabClick,
}) => {
  if (portfolio.subtabs?.length) {
    // Render subtabs if they exist
    return (
      <Tabs
        value={activeSubTabs[portfolio.id]}
        onValueChange={(value) => handleSubTabClick(portfolio.id, value)}
        className="w-full"
      >
        <TabsList className="bg-transparent h-fit px-0 gap-3 flex-wrap justify-start">
          {portfolio.subtabs.map((subtab) => (
            <TabsTrigger
              key={subtab.id}
              value={subtab.value}
              className="trigger-class"
            >
              {subtab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {portfolio.subtabs.map((subtab) => (
          <TabsContent key={subtab.id} value={subtab.value}>
            <RenderMedia portfolio={portfolio} subtab={subtab} />
          </TabsContent>
        ))}
      </Tabs>
    );
  }
  
  // If no subtabs, render media directly
  return <RenderMedia portfolio={portfolio} />;
  
};

export default TabsLayout;
