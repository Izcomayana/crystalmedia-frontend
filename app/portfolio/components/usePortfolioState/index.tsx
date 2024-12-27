"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Portfolio = {
  id: string;
  name: string;
  value: string;
  subtabs: SubTab[];
  video?: string;
  caption?: string;
  // caption?: Caption[];
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
            })) || [];
            
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
        console.log("portfolios:", portfolios);

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
