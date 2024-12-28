"use client";
import React, { useEffect, useState } from "react";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchWhatWeDoById } from "@/lib/firebaseUtils";

const Designs: React.FC = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWhatWeDoById("designs");
        if (data?.about) {
          setContent(data.about.replace(/\\n/g, "\n"));
        } else {
          setError("Data not found");
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
        console.log("Markdown Content:", content);
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
      <Hero
        title="What We Do"
        subtitle="Design Services (Website, App, and Graphics)"
      />

      <div className="container mx-auto my-10">
        <div className="text-black text-sm mb-10 font-light lg:text-base">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-4">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc ml-5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-5">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-2">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
                  {children}
                </blockquote>
              ), // Blockquote
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-medium">{children}</h3>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      <CTA />
    </>
  );
};

export default Designs;
