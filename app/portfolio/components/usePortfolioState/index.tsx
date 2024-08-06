"use-client";
import { useState, useEffect } from "react";

export type Portfolio = {
  id: number;
  attributes: {
    caption: string;
    name: string;
    subtabs: {
      data: SubTab[];
    };
    value: string;
    video: {
      data: Video[];
    };
  };
};

export type Video = {
  id: number;
  attributes: {
    mime: string;
    name: string;
    url: string;
  };
};

export type SubTab = {
  id: number;
  attributes: {
    name: string;
    images: Image[];
    value: string;
  };
};

export type Image = {
  id: number;
  url: string;
};

export type State = {
  portfoliosData: Portfolio[];
};

const usePortfolioState = () => {
  const [state, setState] = useState<State>({
    portfoliosData: []
  });

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const portfoliosResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/portfolios?populate=*`);
        const portfolios = await portfoliosResponse.json();
        const portfoliosData = portfolios.data;
        console.log("portfolios:", portfoliosData);

        setState({
          portfoliosData
        });
      } catch (error) {
        console.error("Failed to fetch portfolios:", error);
      }
    };

    fetchPortfolios();
  }, []);

  return state;
};

export default usePortfolioState;



// // usePortfolioState.ts
// "use-client";
// import { useState, useEffect } from "react";
// import useFetch from "@/lib/api";

// export type Portfolio = {
//   id: number;
//   attributes: {
//     caption: string;
//     name: string;
//     subtabs: {
//       data: SubTab[];
//     };
//     value: string;
//     video: {
//       data: Video[];
//     }
//   };
// };

// export type Video = {
//   id: number;
//   attributes: {
//     mime: string;
//     name: string;
//     url: string;
//   }
// }

// export type SubTab = {
//   id: number;
//   attributes: {
//     name: string;
//     images: Image[];
//     value: string;
//   }
// };

// export type Image = {
//   id: number;
//   url: string;
// };

// export type PublicRelation = {
//   id: number;
//   video: string;
//   caption: string;
// };

// export type SocialMedia = {
//   id: number;
//   video: string;
//   caption: string;
// };

// export type State = {
//   portfoliosData: Portfolio[];
//   publicRelations: PublicRelation[];
//   socialMedias: SocialMedia[];
// };

// const usePortfolioState = () => {
//   const [state, setState] = useState<State>({
//     portfoliosData: [],
//     publicRelations: [],
//     socialMedias: [],
//   });

//   useEffect(() => {
//     const fetchPortfolios = async () => {
//       const portfoliosResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/portfolios?populate=*`);
//       const portfolios = await portfoliosResponse.json();
//       const portfoliosData = portfolios.data;
//       console.log("portfolios:", portfoliosData);

//       const subTabResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/subtabs`);
//       const subTab = await subTabResponse.json();
//       const subTabData = subTab.data
//       console.log("subTab:", subTabData);

//       const subTabImgsResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/images`);
//       const subTabImgs = await subTabImgsResponse.json();
//       console.log("subTabImgs:", subTabImgs)

//       const publicRelationsResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/public-relations`);
//       const publicRelations = await publicRelationsResponse.json();
//       console.log("publicRelations:", publicRelations);

//       const socialMediasResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/social-medias`);
//       const socialMedias = await socialMediasResponse.json();
//       console.log("socialMedias:", socialMedias)


//       setState({
//         portfoliosData,
//         publicRelations,
//         socialMedias,
//       });
//     };

//     fetchPortfolios();
//   }, []);

//   return state;
// };

// export default usePortfolioState;


