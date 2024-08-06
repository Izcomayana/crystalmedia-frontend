"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
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
    post: string;
    date: string;
    publishedAt: string;
    img: string;
  };
}

const Blog = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { loading, error, data } = useFetch<{ data: Blog[]; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`
  );
  const [latestPosts, setLatestPosts] = useState<Blog[] | null>(null);

  useEffect(() => {
    if (data?.data) {
      const timer = setTimeout(() => {
        const sortedData = data.data.sort(
          (a, b) =>
            new Date(b.attributes.publishedAt).getTime() -
            new Date(a.attributes.publishedAt).getTime()
        );
        const recentPosts = sortedData.slice(0, 2);
        setLatestPosts(recentPosts);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [data]);

  // console.log(latestPosts);

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
                      src={post.attributes.img}
                      width={300}
                      height={200}
                      alt="blogpost"
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
                    {post.attributes.post.substring(0, 200)}...
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
            <Link href="/blogs" className="">
              View all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
