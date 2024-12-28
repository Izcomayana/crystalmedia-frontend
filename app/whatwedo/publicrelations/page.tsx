"use client";
import React, { useEffect, useState } from "react";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchWhatWeDoById } from "@/lib/firebaseUtils";

const PublicRelation = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWhatWeDoById("pr");
        console.log("Fetched Content:", data?.about);
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
    return <p>Loading...</p>;
  }

  if (!content) {
    return <p>Content not found.</p>;
  }

  return (
    <>
      <Hero
        title={content.title || "What We Do"}
        subtitle={content.subtitle || "Public Relations"}
      />
      <div className="container mx-auto my-10">
        <p className="text-black text-sm mb-10 font-light lg:text-base">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-4" style={{ textIndent: "1.5em" }}>
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc ml-5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-5">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-2">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 pl-4 italic text-gray-600">
                  {children}
                </blockquote>
              ),
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-4">{children}</h1>
              ),
            }}
          >
            {content || ""}
          </ReactMarkdown>
        </p>
      </div>
      <CTA />
    </>
  );
};

export default PublicRelation;
