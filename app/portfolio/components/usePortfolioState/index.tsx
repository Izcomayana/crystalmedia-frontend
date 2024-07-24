"use-client"
import { useState, useEffect } from "react";

export type Portfolio = {
  id: number;
  name: string;
  value: string;
};

export type Designs = {
  id: number;
  name: string;
  value: string;
};

export type SMDesigns = {
  id: number;
  src: string;
};

export type Brand = {
  id: number;
  src: string;
};

export type WebDesign = {
  id: number;
  src: string;
};

export type InfluencerMarketing = {
  id: number;
  name: string;
  value: string;
};

export type TwitterTrend = {
  id: number;
  src: string;
};

export type TwitterCampaign = {
  id: number;
  src: string;
};

export type TiktokCampaign = {
  id: number;
  image: string;
  name: string;
  role: string;
};

export type PublicRelation = {
  id: number;
  video: string;
  caption: string;
};

export type SocialMedia = {
  id: number;
  video: string;
  caption: string;
};

export type State = {
  portfolios: Portfolio[];
  designs: Designs[];
  SMDesigns: SMDesigns[];
  brands: Brand[];
  webDesigns: WebDesign[];
  influencerMarketing: InfluencerMarketing[];
  twitterTrends: TwitterTrend[];
  twitterCampaigns: TwitterCampaign[];
  tiktokCampaigns: TiktokCampaign[];
  publicRelations: PublicRelation[];
  socialMedias: SocialMedia[];
};

const usePortfolioState = () => {
  const [state, setState] = useState<State>({
    portfolios: [],
    designs: [],
    SMDesigns: [],
    brands: [],
    webDesigns: [],
    influencerMarketing: [],
    twitterTrends: [],
    twitterCampaigns: [],
    tiktokCampaigns: [],
    publicRelations: [],
    socialMedias: [],
  });

  useEffect(() => {
    const fetchPortfolios = async () => {
      const response = await fetch("/data/data.json");
      const data = await response.json();
      setState({
        portfolios: data.portfolio,
        designs: data.portfolio[0].designs,
        SMDesigns: data.portfolio[0].designs[0].SMDesigns,
        brands: data.portfolio[0].designs[1].brandIdentity,
        webDesigns: data.portfolio[0].designs[2].webDesigns,
        influencerMarketing: data.portfolio[1].influencerMarketing,
        twitterTrends: data.portfolio[1].influencerMarketing[0].twitterTrends,
        twitterCampaigns: data.portfolio[1].influencerMarketing[1].twitterCampaigns,
        tiktokCampaigns: data.portfolio[1].influencerMarketing[2].tiktokCampaigns,
        publicRelations: data.portfolio[2].publicRelation,
        socialMedias: data.portfolio[3].socialMedia,
      });
    };

    fetchPortfolios();
  }, []);

  return state;
};

export default usePortfolioState;