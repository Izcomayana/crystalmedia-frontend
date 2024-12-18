"use client";
import { useEffect, useState } from "react";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TbPointFilled } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import BlogList from "./components/BlogList";
import Link from "next/link";
import { fetchLatestBlogs } from "@/lib/firebaseUtils";
import type { Blog } from "@/lib/firebaseUtils";
import {
  fetchInitialPaginationData,
  loadPaginatedBlogsHelper,
} from "@/lib/blogHelpers";

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [latestPosts, setLatestPosts] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [pagePointers, setPagePointers] = useState<any[]>([]);

  const pageSize = 4;

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        // Fetch latest posts
        const latest = await fetchLatestBlogs();
        setLatestPosts(latest);

        // Fetch pagination pointers
        const { totalPages, pagePointers } =
          await fetchInitialPaginationData(pageSize);
        setTotalPages(totalPages);
        setPagePointers(pagePointers);

        // Load first page
        const { blogs } = await loadPaginatedBlogsHelper(
          pageSize,
          pagePointers,
          1,
        );
        setBlogs(blogs);
      } catch (error) {
        setError("Failed to initialize data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

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
      } catch {
        setError("Failed to fetch page data.");
      } finally {
        setLoading(false);
      }
    }
  };

  {
    loading && <p>Loading...</p>;
  }
  {
    error && <p className="text-red-500">{error}</p>;
  }

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
              {latestPosts?.map((blog, index) => (
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
                      src={blog.img}
                      alt={blog.title}
                      width={300}
                      height={200}
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
                          {blog.author}
                          <TbPointFilled />
                        </span>
                        <span className="lg:hidden">
                          {blog.date
                            ? format(blog.date.toDate(), "EEEE, MMMM d, yyyy")
                            : ""}
                        </span>
                        <span className="hidden lg:block">
                          {blog.date
                            ? format(blog.date.toDate(), "d MMMM, yyyy")
                            : ""}
                        </span>
                      </p>
                    </div>
                    <Link href={`/blogs/blog?id=${blog.id}`}>
                      <div className="flex justify-between hover:underline">
                        <h2 className="text-lg font-semibold">{blog.title}</h2>
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
                    </Link>
                    <div className="text-sm text-[#667085] my-3">
                      <ReactMarkdown>
                        {blog.post.length > 300
                          ? `${blog.post.slice(0, 300)}...`
                          : blog.post}
                      </ReactMarkdown>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={"secondary"}>Badge</Badge>
                      <Badge variant={"secondary"}>Badge</Badge>
                      <Badge variant={"secondary"}>Badge</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <BlogList
                blogs={blogs}
                title="All blog posts"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
        <Testimonials />
        <CTA />
      </div>
    </>
  );
};

export default Blogs;
