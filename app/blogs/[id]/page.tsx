"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import useFetch from "@/lib/api";
import Image from "next/image";

interface Post {
  id: number;
  attributes: {
    date: Date;
    title: string;
    post: Blogpost[];
    writer: string;
    publishedAt: string;
    img: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string;
          width: number;
          height: number;
          url: string;
        };
      };
    };
  };
}

type Blogpost = {
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

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { loading, error, data } = useFetch<{ data: Post; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/${id}?populate=*`
  );
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (data && data.data) {
      setPost(data.data);
    }
  }, [data]);

  if (loading || !post) {
    return (
      <div className="flex flex-col space-y-6 my-20 mx-auto container">
        <Skeleton className="h-4 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <div className="space-y-8">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          {/* <Skeleton className="h-5 w-full" /> */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto container">
        <p>Error :(</p>;
      </div>
    );
  }

  const renderRichText = (content: Blogpost[]) => {
    return content.map((block, index) => {
      return (
        <p key={index} className="my-2">
          {block.children.map((child, childIndex) => {
            if (child.url) {
              return (
                <a
                  key={childIndex}
                  href={child.url}
                  className="text-blue-600 underline"
                >
                  {child.text}
                </a>
              );
            }
            return (
              <span
                key={childIndex}
                style={{
                  fontWeight: child.bold ? "bold" : "normal",
                  fontStyle: child.italics ? "italic" : "normal",
                  textDecoration: `${child.underline ? "underline" : ""} ${
                    child.strikethrough ? "line-through" : ""
                  }`,
                }}
              >
                {child.text}
              </span>
            );
          })}
        </p>
      );
    });
  };

  return (
    <section>
      <div className="container mx-auto">
        <div className="my-10 mb-40">
          <p className="text-xs font-semibold lg:text-sm">
            {format(
              new Date(post.attributes.publishedAt),
              "EEEE, MMMM d, yyyy"
            )}
          </p>
          <h1 className="font-semibold text-xl my-4 lg:text-2xl lg:my-8">
            {post.attributes.title}
          </h1>

          <div
                    className="my-8 md:h-[412px]"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI}${post.attributes.img.data.attributes.url}`}
                      width={post.attributes.img.data.attributes.width}
                      height={post.attributes.img.data.attributes.height}
                      alt={post.attributes.img.data.attributes.alternativeText}
                      className="w-full h-full object-cover"
                    />
                  </div>

          <p className="text-black font-medium">
            {renderRichText(post.attributes.post)}
          </p>

          <p className="mt-10">{/* by {post.attributes.writer} on{" "} */}</p>
        </div>
      </div>
      {/* <Testimonials />
      <CTA /> */}
    </section>
  );
};

export default Page;
