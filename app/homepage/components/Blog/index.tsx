"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import slantarrow from "@/public/images/slant-arrow.png";
import arrow from "@/public/images/arrow.png";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { fetchLatestBlogs } from "@/lib/firebaseUtils";
import type { Blog } from "@/lib/firebaseUtils";

const Blog = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [latestPosts, setLatestPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogs = await fetchLatestBlogs();
        setLatestPosts(blogs);
        console.log(blogs);
      } catch (error) {
        console.error(error);
        setError("Failed to load blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto container flex flex-col justify-between gap-4 lg:gap-0 lg:flex-row">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="border border-black p-4 rounded-2xl flex flex-col space-y-4 w-full lg:w-[49%]"
          >
            <Skeleton className="h-60 w-full rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!latestPosts.length) {
    return (
      <p className="text-center">No blog posts are available at the moment.</p>
    );
  }

  return (
    <section>
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p className="bg-primaryBlue text-xs text-white font-semibold py-3 px-6 rounded-md">
            On our blog
          </p>
          <Link href="/blogs" className="hidden items-center lg:flex">
            <span className="font-semibold">View all</span>
            <Image src={slantarrow} alt="arrow" className="w-3 h-3 ml-2" />
          </Link>
        </div>

        <div className="my-8 flex flex-col justify-between gap-4 lg:gap-0 lg:flex-row">
          {latestPosts.map((blog) => (
            <div
              key={blog.id}
              className="border border-black p-4 rounded-2xl transition-all hover:border-[2.5px] hover:shadow-2xl w-full lg:w-[49%]"
            >
              <div className="flex flex-col gap-2">
                <div className="h-[167px] lg:h-[290px]">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    width={300}
                    height={200}
                    className="w-full h-[167px] lg:h-[290px] object-cover rounded-md"
                  />
                </div>
                <p className="text-primaryBlue text-[8px] mt-2 lg:text-sm">
                  {blog.date ? format(blog.date.toDate(), "d MMMM, yyyy") : ""}
                </p>
                <Link
                  href={`/blogs/blog?id=${blog.id}`}
                  className="hover:underline"
                >
                  <h2 className="font-semibold text-base lg:text-2xl">
                    {blog.title}
                  </h2>
                </Link>
                <div className="text-black text-sm lg:text-base">
                  <ReactMarkdown>
                    {blog.post.length > 300
                      ? `${blog.post.slice(0, 300)}...`
                      : blog.post}
                  </ReactMarkdown>
                </div>
                <Link
                  href={`/blogs/blog?id=${blog.id}`}
                  className="flex items-center font-semibold text-xs rounded-md hover:border hover:border-primaryBlue hover:p-2 hover:justify-between transition-all lg:text-sm"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
