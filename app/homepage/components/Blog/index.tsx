"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import slantarrow from "@/public/images/slant-arrow.png";
import arrow from "@/public/images/arrow.png";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/lib/api";
import { format } from "date-fns";

interface Blog {
  id: number;
  attributes: {
    id: number;
    title: string;
    writer: string;
    post: Blogpost[];
    date: string;
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

const Blog = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { loading, error, data } = useFetch<{ data: Blog[]; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*`
  );
  const [latestPosts, setLatestPosts] = useState<Blog[] | null>(null);

  useEffect(() => {
    if (data?.data) {
      const fetchBlogs = () => {
        const sortedData = data.data.sort(
          (a, b) =>
            new Date(b.attributes.publishedAt).getTime() -
            new Date(a.attributes.publishedAt).getTime()
        );
        const recentPosts = sortedData.slice(0, 2);
        setLatestPosts(recentPosts);
      }

      fetchBlogs ();
    }
  }, [data]);

  if (!latestPosts) {
    return (
      <div className="mx-auto container flex flex-col justify-between lg:flex-row">
        <div className="flex flex-col space-y-4 my-20 w-full lg:w-[47.5%]">
          <Skeleton className="h-60 w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="flex flex-col space-y-4 my-20 w-full lg:w-[47.5%]">
          <Skeleton className="h-60 w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) return <p>Error :(</p>;

  const extractText = (content: Blogpost[]): string => {
    return content
      .map((block) => block.children.map((child) => child.text).join(""))
      .join(" ");
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <section>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p className="bg-primaryBlue text-xs text-white font-semibold py-3 px-6 rounded-md">
            On our blog
          </p>

          <div className="hidden items-center lg:flex">
            <div>
              <Link href="/blogs" className="font-semibold">
                View all
              </Link>
            </div>
            <div className="w-3 h-3 ml-2">
              <Image src={slantarrow} alt={"arrow"} className="w-full" />
            </div>
          </div>
        </div>

        <div className="my-8 flex flex-col justify-between gap-8 lg:flex-row">
          {latestPosts?.map((post) => (
            <div
              className="border border-black p-4 rounded-2xl transition-all hover:border-2"
              key={post.id}
            >
              <div className="flex flex-col gap-2">
                <div>
                  <div>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI}${post.attributes.img.data.attributes.url}`}
                      width={post.attributes.img.data.attributes.width}
                      height={post.attributes.img.data.attributes.height}
                      alt={post.attributes.img.data.attributes.alternativeText}
                      className="w-full"
                    />
                    <p className="text-primaryBlue text-[8px] mt-2 lg:text-sm">
                      {format(
                        new Date(post.attributes.publishedAt),
                        "MMMM d, yyyy, h:mm a"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="font-semibold text-base text-black lg:text-2xl">
                    {post.attributes.title}
                  </h2>
                  <p className="text-black text-xs lg:text-base">
                    {truncateText(extractText(post.attributes.post), 200)}
                  </p>
                  <Link
                    href={`/blogs/blog?id=${post.id}`}
                    className="flex items-center font-semibold text-[10px] rounded-md hover:border hover:border-primaryBlue hover:p-2 hover:justify-between transition-all lg:text-xs"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span>Read more</span>
                    <div className="relative w-3 h-1 ml-3">
                      <Image
                        src={slantarrow}
                        alt={"arrow"}
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isHovered ? "opacity-0" : "opacity-100"
                        }`}
                      />
                      <Image
                        src={arrow}
                        alt={"arrow"}
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center lg:hidden">
            <Link href="/#" className="">
              View all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
