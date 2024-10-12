"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/lib/api";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Influencer {
  id: number;
  attributes: {
    contents: string;
  };
}

const InfluencerMarketing: React.FC = () => {
  const [pageData, setPageData] = useState<Influencer | null>(null);

  const { loading, error, data } = useFetch<{ data: Influencer; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/whatwedos/1`,
  );

  useEffect(() => {
    if (data && data.data) {
      setPageData(data.data);
    }
    console.log(pageData?.attributes);
  }, [data]);

  return (
    <>
      <Hero title="What We Do" subtitle="Influencer Marketing" />

      <div className="container mx-auto my-10">
        <p className="text-black text-sm mb-10 font-light lg:text-base">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-4">{children}</p>, // Paragraph styling
              ul: ({ children }) => (
                <ul className="list-disc ml-5">{children}</ul>
              ), // Unordered list
              ol: ({ children }) => (
                <ol className="list-decimal ml-5">{children}</ol>
              ), // Ordered list
              li: ({ children }) => (
                <li className="mb-2">
                  <div>{children}</div>{" "}
                </li>
              ),
            }}
          >
            {pageData?.attributes.contents}
          </ReactMarkdown>
        </p>
      </div>
      <CTA />
    </>
  );
};

export default InfluencerMarketing;
