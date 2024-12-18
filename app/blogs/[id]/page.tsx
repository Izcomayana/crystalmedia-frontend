"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogList from "../components/BlogList";
import { Blog, fetchBlogById } from "@/lib/firebaseUtils";
import {
  fetchInitialPaginationData,
  loadPaginatedBlogsHelper,
} from "@/lib/blogHelpers";

const Page: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagePointers, setPagePointers] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const pageSize = 4;

  useEffect(() => {
    const loadBlogData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!id) {
          throw new Error("Blog ID is missing.");
        }

        const blogData = await fetchBlogById(id);
        if (!blogData) {
          throw new Error("Blog not found.");
        }
        setBlog(blogData);

        const { totalPages, pagePointers } =
          await fetchInitialPaginationData(pageSize);
        setTotalPages(totalPages);
        setPagePointers(pagePointers);

        const { blogs } = await loadPaginatedBlogsHelper(
          pageSize,
          pagePointers,
          1,
        );
        setBlogs(blogs);
      } catch (err: any) {
        console.error("Failed to load blog data:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, [id]);

  const handlePageChange = async (page: number) => {
    if (page !== currentPage) {
      setLoading(true);
      try {
        const { blogs } = await loadPaginatedBlogsHelper(
          pageSize,
          pagePointers,
          page,
        );
        setBlogs(blogs);
        setCurrentPage(page);
      } catch (err) {
        console.error("Failed to fetch page data:", err);
        setError("An error occurred while changing pages.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="mx-auto container">
        <div className="lg:flex lg:gap-6 lg:justify-between">
          <div className="flex flex-col my-10 lg:w-[70%]">
            <Skeleton className="h-3 w-48 rounded-lg" />
            <Skeleton className="h-10 my-4 w-full rounded-lg md:w-96 lg:mt-8" />
            <div className="space-y-4">
              <Skeleton className="mt-4 w-full h-[300px] md:h-[412px]" />
              <Skeleton className="h-[600px] w-full" />
              <Skeleton className="h-[600px] w-full" />
            </div>
          </div>
          <div className="flex flex-col my-12 lg:w-[30%]">
            <Skeleton className="h-10 w-48 rounded-lg mb-6 lg:mt-10" />
            <div>
              <Skeleton className="h-40 w-full md:h-[240px]" />
              <Skeleton className="h-3 w-48 my-3" />
              <Skeleton className="h-5 w-full rounded-lg lg:my-8" />
              <Skeleton className="h-40 w-full my-3" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-10 rounded-xl" />
                <Skeleton className="h-4 w-10 rounded-xl" />
                <Skeleton className="h-4 w-10 rounded-xl" />
              </div>
            </div>
            <div className="mt-12">
              <Skeleton className="h-40 w-full md:h-[240px]" />
              <Skeleton className="h-3 w-48 my-3" />
              <Skeleton className="h-5 w-full rounded-lg lg:my-8" />
              <Skeleton className="h-40 w-full my-3" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-10 rounded-xl" />
                <Skeleton className="h-4 w-10 rounded-xl" />
                <Skeleton className="h-4 w-10 rounded-xl" />
              </div>
            </div>
            <div className="mt-12">
              <Skeleton className="h-40 w-full md:h-[240px]" />
              <Skeleton className="h-3 w-48 my-3" />
              <Skeleton className="h-5 w-full rounded-lg lg:my-8" />
              <Skeleton className="h-40 w-full my-3" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-10 rounded-xl" />
                <Skeleton className="h-4 w-10 rounded-xl" />
                <Skeleton className="h-4 w-10 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto">
        <p className="text-red-500">
          {error || "Error loading blog. Please try again later."}
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="container mx-auto">
        <div className="lg:flex lg:gap-6 lg:justify-between">
          <div className="my-10 mb-40 lg:w-[70%]">
            <p className="text-xs font-semibold lg:text-sm">
              {blog.date
                ? format(blog.date.toDate(), "EEEE, MMMM d, yyyy")
                : ""}
            </p>
            <h1 className="font-semibold text-xl my-4 lg:text-2xl lg:my-8">
              {blog.title}
            </h1>

            <div className="mt-8 h-[300px]">
              {blog.img && (
                <Image
                  src={blog.img}
                  alt={blog.title}
                  width={800}
                  height={400}
                  className="w-full h-80 object-cover rounded-md"
                />
              )}
            </div>

            <div className="text-black text-sm font-light my-4 lg:text-base">
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
                  img: ({ src, alt }) => (
                    <div className="h-[300px] md:h-[412px]">
                      <Image
                        src={src ?? ""}
                        alt={alt ?? ""}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ),
                }}
              >
                {blog.post}
              </ReactMarkdown>
            </div>
          </div>
          <div className="mb-10 lg:mt-12 lg:w-[30%]">
            <BlogList
              blogs={blogs}
              title="All blog posts"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              fullWidth={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
