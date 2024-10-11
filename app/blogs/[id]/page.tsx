"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import useFetch from "@/lib/api";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogList from "../components/BlogList";

interface Post {
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

const Page: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { loading, error, data } = useFetch<{ data: Post; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/${id}?populate=*`,
  );

  const {
    loading: paginatedLoading,
    error: paginatedError,
    data: paginatedData,
  } = useFetch<{ data: Post; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=4&sort=publishedAt:desc`,
  );

  const pagination = paginatedData?.meta.pagination;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (data && data.data) {
      setPost(data.data);
    }
  }, [data]);

  if (loading || !post) {
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

  if (error) {
    return (
      <div className="mx-auto container">
        <p>Error :(</p>;
      </div>
    );
  }

  return (
    <section>
      <div className="container mx-auto">
        <div className="lg:flex lg:gap-6 lg:justify-between">
          <div className="my-10 mb-40 lg:w-[70%]">
            <p className="text-xs font-semibold lg:text-sm">
              {format(
                new Date(post.attributes.publishedAt),
                "EEEE, MMMM d, yyyy",
              )}
            </p>

            <h1 className="font-semibold text-xl my-4 lg:text-2xl lg:my-8">
              {post.attributes.title}
            </h1>

            <div className="mt-8 h-[300px] md:h-[412px]">
              <Image
                src={`${post.attributes.img.data.attributes.url}`}
                width={post.attributes.img.data.attributes.width}
                height={post.attributes.img.data.attributes.height}
                alt={post.attributes.img.data.attributes.alternativeText}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-black text-sm font-light my-4 lg:text-base">
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
                      {/* Wrapping in a div to maintain numbering */}
                    </li>
                  ),
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
                  ), // Custom image handling
                }}
              >
                {post.attributes.post}
              </ReactMarkdown>
            </p>
          </div>

          <div className="mb-10 lg:mt-12 lg:w-[30%]">
            <BlogList
              blogs={
                Array.isArray(paginatedData?.data) ? paginatedData.data : []
              }
              title="Recents blogs"
              pagination={pagination}
              currentPage={currentPage}
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
