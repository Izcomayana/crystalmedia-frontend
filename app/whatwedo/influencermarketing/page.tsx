"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/lib/api";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchWhatWeDoById } from "@/lib/firebaseUtils";

const InfluencerMarketing: React.FC = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWhatWeDoById("smmm");
        if (data?.about) {
          setContent(data.about);
        } else {
          setError("Data not found");
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            {content}
          </ReactMarkdown>
        </p>
      </div>
      <CTA />
    </>
  );
};

export default InfluencerMarketing;
