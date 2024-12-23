"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Portfolio = {
  id: string;
  name: string;
  value: string;
  subtabs?: SubTab[];
  video?: { src: string; alt: string };
  caption?: Caption[];
  images?: Image[];
};

export type SubTab = {
  id: string;
  name: string;
  value: string;
  images?: Image[];
};

export type Caption = {
  type: string;
  children: Children[];
};

type Children = {
  type: string;
  text: string;
  bold?: boolean;
  italics?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  url?: string;
};

export type Image = {
  id: string;
  src: string;
  alt: string;
  name?: string;
  type?: string;
  year?: number;
};

export type State = {
  portfoliosData: Portfolio[];
};

const usePortfolioState = () => {
  const [state, setState] = useState<State>({ portfoliosData: [] });

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolios"));
        const portfolios: Portfolio[] = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const subtabsCollection = collection(
              db,
              `portfolios/${doc.id}/subtabs`,
            );
            const subtabsSnapshot = await getDocs(subtabsCollection);
            const subtabs = subtabsSnapshot.docs.map((subDoc) => ({
              id: subDoc.id,
              name: subDoc.data().name,
              value: subDoc.data().value,
              images: subDoc.data().images || [],
            }));
            return {
              id: doc.id,
              name: doc.data().name,
              value: doc.data().value,
              subtabs,
              video: doc.data().video || undefined,
              caption: doc.data().caption || undefined,
              images: doc.data().images || [],
            };
          }),
        );

        setState({ portfoliosData: portfolios });
      } catch (error) {
        console.error("Failed to fetch portfolios:", error);
      }
    };

    fetchPortfolios();
  }, []);

  return state;
};

export default usePortfolioState;

// "use-client";
// import { useState, useEffect } from "react";

// export type Portfolio = {
//   id: number;
//   attributes: {
//     caption: Caption[];
//     name: string;
//     subtabs: {
//       data: SubTab[];
//     };
//     value: string;
//     video: {
//       data?: Video;
//     };
//     images: {
//       data?: Image[];
//     };
//   };
// };

// export type SubTab = {
//   id: number;
//   attributes: {
//     name: string;
//     images: {
//       data?: Image[];
//     };
//     value: string;
//     img_cons: {
//       data?: ImgCon[];
//     };
//   };
// };

// export type ImgCon = {
//   id: number;
//   attributes: {
//     client: string | null;
//     image: {
//       data: Image | null;
//     };
//   };
// };

// export type Image = {
//   id: number;
//   attributes: {
//     name: string;
//     altText: string;
//     width: number;
//     height: number;
//     url: string;
//   };
// };

// export type Video = {
//   id: number;
//   attributes: {
//     altText: string;
//     mime: string;
//     name: string;
//     url: string;
//   };
// };

// export type Caption = {
//   type: string;
//   children: Children[];
// };

// type Children = {
//   type: string;
//   text: string;
//   bold?: boolean;
//   italics?: boolean;
//   underline?: boolean;
//   strikethrough?: boolean;
//   url?: string;
// };

// export type State = {
//   portfoliosData: Portfolio[];
// };

// const usePortfolioState = () => {
//   const [state, setState] = useState<State>({
//     portfoliosData: [],
//   });

//   useEffect(() => {
//     const fetchPortfolios = async () => {
//       try {
//         const portfoliosResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_STRAPI_URL}/portfolios?populate[0]=subtabs&populate[1]=subtabs.images&populate[2]=subtabs.img_cons&populate[3]=subtabs.img_cons.image&populate[4]=video&populate[5]=images`,
//         );
//         const portfolios = await portfoliosResponse.json();
//         const portfoliosData = portfolios.data;
//         console.log(portfoliosData);
//         setState({
//           portfoliosData,
//         });
//       } catch (error) {
//         console.error("Failed to fetch portfolios:", error);
//       }
//     };

//     fetchPortfolios();
//   }, []);

//   return state;
// };

// export default usePortfolioState;
