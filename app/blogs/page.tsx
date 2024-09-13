"use client";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import useFetch from "@/lib/api";
import Image from "next/image";
import { format } from "date-fns";

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

  return (
    <>
      <div>
        <Hero title="Our blog" />
        <div className="container mx-auto">
          <div className="my-20 mb-40">
            <h1 className="font-bold text-3xl mb-4 lg:text-5xl lg:mb-8 xl:text-[54px]">
              Blog posts
            </h1>

            {data?.data.map((blog) => (
              <div key={blog.id} className="mb-8">
                <div>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI}${blog.attributes.img.data.attributes.url}`}
                      width={blog.attributes.img.data.attributes.width}
                      height={blog.attributes.img.data.attributes.height}
                      alt={blog.attributes.img.data.attributes.alternativeText}
                      className="w-full"
                    />
                    <p className="text-primaryBlue text-[8px] mt-2 lg:text-sm">
                      {format(
                        new Date(blog.attributes.publishedAt),
                        "MMMM d, yyyy, h:mm a"
                      )}
                    </p>
                  </div>
                <h2 className="text-2xl font-bold">{blog.attributes.title}</h2>
                {truncateText(extractText(blog.attributes.post), 200)}
                <p className="text-gray-500">
                  {new Date(blog.attributes.publishedAt).toLocaleDateString()}
                </p>
                <h2 className="text-2xl font-semibold">
                  {blog.attributes.writer}
                </h2>
              </div>
            ))}
          </div>
        </div>
        <Testimonials />
        <CTA />
      </div>
    </>
  );
};

export default Blogs;
