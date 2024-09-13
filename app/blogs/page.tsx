// blogs.tsx
"use client";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import useFetch from "@/lib/api";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TbPointFilled } from "react-icons/tb";

interface Blog {
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

const Blogs = () => {
  const { loading, error, data } = useFetch<{ data: Blog[]; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*`
  );

  console.log("blogs:", data?.data);

  const extractText = (content: Blogpost[]): string => {
    return content
      .map((block) => block.children.map((child) => child.text).join(""))
      .join(" ");
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Sort blogs by published date in descending order (most recent first)
  const sortedBlogs = data?.data.sort(
    (a, b) =>
      new Date(b.attributes.publishedAt).getTime() -
      new Date(a.attributes.publishedAt).getTime()
  );

  // Get the first 2 most recent blogs
  const recentBlogs = sortedBlogs?.slice(0, 2);

  // Get the rest of the blogs
  const remainingBlogs = sortedBlogs?.slice(2);

  return (
    <>
      <div>
        <Hero title="Our blog" />
        <div className="container mx-auto">
          <div className="my-10 mb-40">
            <h1 className="font-semibold text-2xl mb-8">Recent blog posts</h1>

            {/* Display the first 2 most recent blogs */}
            <div>
              {recentBlogs?.map((blog, index) => (
                <div
                  key={blog.id}
                  className={`${
                    index === 1 ? "lg:flex justify-between items-center my-8 gap-5 lg:my-16" : ""
                  }`}
                >
                    <div className={`md:h-[228px] ${index === 1 ? "lg:w-1/2" : ""}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI}${blog.attributes.img.data.attributes.url}`}
                        width={blog.attributes.img.data.attributes.width}
                        height={blog.attributes.img.data.attributes.height}
                        alt={
                          blog.attributes.img.data.attributes.alternativeText
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>

                  <div className={index === 1 ? "lg:w-1/2" : ""}>
                    <div>
                      <p className="flex gap-2 text-gray-900 font-semibold text-sm my-3 lg:text-gray-700">
                        <span className="hidden lg:flex gap-2 justify-center items-center">
                          {blog.attributes.writer}
                          <TbPointFilled />
                        </span>
                        <span className="lg:hidden">
                          {format(
                            new Date(blog.attributes.publishedAt),
                            "EEEE, MMMM d, yyyy"
                          )}
                        </span>
                        <span className="hidden lg:block">
                          {format(
                            new Date(blog.attributes.publishedAt),
                            "d MMMM, yyyy"
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <h2 className="text-lg font-semibold">
                        {blog.attributes.title}
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
                      {truncateText(extractText(blog.attributes.post), 200)}
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

            {/* Display the rest of the blogs */}
            <h2 className="font-semibold text-xl my-12 lg:text-3xl lg:mb-8 xl:text-[32px]">
              All blog posts
            </h2>
            <div className="flex flex-wrap gap-4 justify-between">
              {remainingBlogs?.map((blog) => (
                <div key={blog.id} className="mb-8 lg:w-[48.5%]">
                  <div>
                    <div className="md:h-[240px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI}${blog.attributes.img.data.attributes.url}`}
                      width={blog.attributes.img.data.attributes.width}
                      height={blog.attributes.img.data.attributes.height}
                      alt={blog.attributes.img.data.attributes.alternativeText}
                      className="w-full h-full object-cover"
                    />
                    </div>
                    <div>
                      <p className="flex gap-2 text-gray-900 font-semibold text-sm my-3 lg:text-gray-700">
                        <span className="hidden lg:flex gap-2 justify-center items-center">
                          {blog.attributes.writer}
                          <TbPointFilled />
                        </span>
                        <span className="lg:hidden">
                          {format(
                            new Date(blog.attributes.publishedAt),
                            "EEEE, MMMM d, yyyy"
                          )}
                        </span>
                        <span className="hidden lg:block">
                          {format(
                            new Date(blog.attributes.publishedAt),
                            "d MMMM, yyyy"
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">
                      {blog.attributes.title}
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
                    {truncateText(extractText(blog.attributes.post), 200)}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant={"secondary"}>Badge</Badge>
                    <Badge variant={"secondary"}>Badge</Badge>
                    <Badge variant={"secondary"}>Badge</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Testimonials />
        <CTA />
      </div>
    </>
  );
};

export default Blogs;