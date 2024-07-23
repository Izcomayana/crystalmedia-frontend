import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PortfolioTabs = () => {
  return (
    <div className="container mx-auto">
      <Tabs defaultValue="design" className="my-10 lg:my-20">
        <TabsList className="bg-transparent h-fit px-0 flex flex-wrap gap-4 justify-start lg:gap-6">
          <TabsTrigger
            value="design"
            className="py-3 px-4 text-black border-black border rounded-lg hover:!bg-primaryBlue hover:!text-white hover:!border-white focus:!bg-primaryBlue focus:!text-white focus:!border-white active:!bg-primaryBlue active:!text-white active:!border-white transition-all"
          >
            Design
          </TabsTrigger>
          <TabsTrigger
            value="influencer-marketing"
            className="py-3 px-4 text-black border-black border rounded-lg hover:!bg-primaryBlue hover:!text-white hover:!border-white focus:!bg-primaryBlue focus:!text-white focus:!border-white active:!bg-primaryBlue active:!text-white active:!border-white transition-all"
          >
            Influencer Marketing
          </TabsTrigger>
          <TabsTrigger
            value="public-relaton"
            className="py-3 px-4 text-black border-black border rounded-lg hover:!bg-primaryBlue hover:!text-white hover:!border-white focus:!bg-primaryBlue focus:!text-white focus:!border-white active:!bg-primaryBlue active:!text-white active:!border-white transition-all"
          >
            Public Relation
          </TabsTrigger>
          <TabsTrigger
            value="social-media"
            className="py-3 px-4 text-black border-black border rounded-lg hover:!bg-primaryBlue hover:!text-white hover:!border-white focus:!bg-primaryBlue focus:!text-white focus:!border-white active:!bg-primaryBlue active:!text-white active:!border-white transition-all"
          >
            Social Media Marketing
          </TabsTrigger>
        </TabsList>

        <div className="mt-5">
          <TabsContent value="design">
            <Tabs defaultValue="sm-creatives">
              <TabsList className="bg-transparent h-fit px-0 flex flex-wrap gap-4 justify-start">
                <TabsTrigger
                  value="sm-creatives"
                  className="!bg-transparent !px-2 !py-1 rounded-none !shadow-none !text-[#868786] border-b hover:!text-black hover:!border-b-black active:!text-black focus:!text-black focus:!border-b-black active:!border-b-black"
                >
                  Social Media Creatives
                </TabsTrigger>
                <TabsTrigger
                  value="brand-identity"
                  className="!bg-transparent !px-2 !py-1 rounded-none !shadow-none !text-[#868786] border-b hover:!text-black hover:!border-b-black active:!text-black focus:!text-black focus:!border-b-black active:!border-b-black"
                >
                  Brand Identity Design
                </TabsTrigger>
                <TabsTrigger
                  value="web-design"
                  className="!bg-transparent !px-2 !py-1 rounded-none !shadow-none !text-[#868786] border-b hover:!text-black hover:!border-b-black active:!text-black focus:!text-black focus:!border-b-black active:!border-b-black"
                >
                  Website design
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sm-creatives">
                Social Media Creatives
              </TabsContent>
              <TabsContent value="brand-identity">
                Brand Identity Design
              </TabsContent>
              <TabsContent value="web-design">Website Design</TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="influencer-marketing">
            <Tabs defaultValue="twitter-trends">
              <TabsList className="bg-transparent h-fit px-0 flex flex-wrap gap-4 justify-start">
                <TabsTrigger
                  value="twitter-trends"
                  className="!bg-transparent !px-2 !py-1 rounded-none !shadow-none !text-[#868786] border-b hover:!text-black hover:!border-b-black active:!text-black focus:!text-black focus:!border-b-black active:!border-b-black"
                >
                  Twitter trends
                </TabsTrigger>
                <TabsTrigger
                  value="twitter-campaigns"
                  className="!bg-transparent !px-2 !py-1 rounded-none !shadow-none !text-[#868786] border-b hover:!text-black hover:!border-b-black active:!text-black focus:!text-black focus:!border-b-black active:!border-b-black"
                >
                  Twitter campaigns
                </TabsTrigger>
                <TabsTrigger
                  value="tiktok-campaigns"
                  className="!bg-transparent !px-2 !py-1 rounded-none !shadow-none !text-[#868786] border-b hover:!text-black hover:!border-b-black active:!text-black focus:!text-black focus:!border-b-black active:!border-b-black"
                >
                  Tiktok campaigns
                </TabsTrigger>
              </TabsList>

              <TabsContent value="twitter-trends">Twitter trends</TabsContent>
              <TabsContent value="twitter-campaigns">
                Twitter campaigns
              </TabsContent>
              <TabsContent value="tiktok-campaigns">
                Tiktok campaigns
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="public-relaton">Public tab.</TabsContent>
          
          <TabsContent value="social-media">
            Social Media Marketing tab.
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PortfolioTabs;
