"use client";
import { useState } from "react";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import useFetch from "@/lib/api";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TbPointFilled } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import BlogList from "./components/BlogList";
import Link from "next/link";

interface Blog {
  id: number;
  attributes: {
    date: Date;
    title: string;
    post: string;
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

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch the most recent 2 blogs
  const {
    loading: recentLoading,
    error: recentError,
    data: recentData,
  } = useFetch<{ data: Blog[]; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&pagination[page]=1&pagination[pageSize]=2&sort=publishedAt:desc`,
  );

  // Extract the IDs of the first two blog posts to exclude them later
  const excludedIds = recentData?.data.map((blog) => blog.id) || [];

  // Convert the excluded IDs into a query filter string
  const excludeFilter = excludedIds
    .map((id) => `filters[id][$ne]=${id}`)
    .join("&");

  // Fetch paginated blogs (excluding the first 2 blogs)
  const {
    loading: paginatedLoading,
    error: paginatedError,
    data: paginatedData,
  } = useFetch<{ data: Blog[]; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=4&sort=publishedAt:desc&${excludeFilter}`,
  );

  if (recentLoading || paginatedLoading) return <p>Loading...</p>;
  if (recentError || paginatedError) return <p>Error :(</p>;

  // Pagination data from Strapi API
  const pagination = paginatedData?.meta.pagination;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <Hero title="Our blog" />
        <div className="container mx-auto">
          <div className="my-10 mb-40">
            <h1 className="font-semibold text-2xl mb-8 lg:text-3xl">
              Recent blog posts
            </h1>

            {/* Display the first 2 most recent blogs */}
            <div>
              {recentData?.data.map((blog, index) => (
                <div
                  key={blog.id}
                  className={`${
                    index === 1
                      ? "lg:flex justify-between items-center my-8 gap-5 lg:my-16"
                      : ""
                  }`}
                >
                  <div className={`h-[228px] ${index === 1 ? "lg:w-1/2" : ""}`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI}${blog.attributes.img.data.attributes.url}`}
                      width={blog.attributes.img.data.attributes.width}
                      height={blog.attributes.img.data.attributes.height}
                      alt={blog.attributes.img.data.attributes.alternativeText}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className={index === 1 ? "lg:w-1/2" : ""}>
                    <div>
                      <p
                        className={`flex gap-2 font-semibold text-sm my-3 ${
                          index === 0
                            ? "text-gray-900 lg:text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        <span className="hidden lg:flex gap-2 justify-center items-center">
                          {blog.attributes.writer}
                          <TbPointFilled />
                        </span>
                        <span className="lg:hidden">
                          {format(
                            new Date(blog.attributes.publishedAt),
                            "EEEE, MMMM d, yyyy",
                          )}
                        </span>
                        <span className="hidden lg:block">
                          {format(
                            new Date(blog.attributes.publishedAt),
                            "d MMMM, yyyy",
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between hover:underline">
                      <h2 className="text-lg font-semibold">
                        <Link href={`/blogs/blog?id=${blog.id}`}>
                          {blog.attributes.title}
                        </Link>
                      </h2>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-[#667085] my-3">
                      <ReactMarkdown>
                        {blog.attributes.post.length > 300
                          ? `${blog.attributes.post.slice(0, 300)}...`
                          : blog.attributes.post}
                      </ReactMarkdown>
                    </p>
                    <div className="flex gap-2">
                      <Badge variant={"secondary"}>Badge</Badge>
                      <Badge variant={"secondary"}>Badge</Badge>
                      <Badge variant={"secondary"}>Badge</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <BlogList
              blogs={paginatedData?.data || []}
              title="All blog posts"
              pagination={pagination}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <Testimonials />
        <CTA />
      </div>
    </>
  );
};

export default Blogs;
