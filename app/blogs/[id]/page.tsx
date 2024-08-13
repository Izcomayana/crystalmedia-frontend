"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns"; 
import useFetch from "@/lib/api";

interface Post {
  id: number;
  attributes: {
    date: Date;
    title: string;
    post: string;
    writer: string;
    publishedAt: string; 
  };
}

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { loading, error, data } = useFetch<{ data: Post; meta: any }>(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/${id}`);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (data && data.data) {
      setPost(data.data);
    }
  }, [data]);

  if (loading || !post) {
    return (
      <div className="flex flex-col space-y-10 my-20 mx-auto container">
        <Skeleton className="h-20 w-full rounded-xl" />
        <div className="space-y-8">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto container">
        <p>Error :(</p>;
      </div>
    )
  }

  return (
    <section>
      <div className="container mx-auto">
        <div className="my-20 mb-40">
          <h1 className="font-bold text-3xl mb-4 lg:text-5xl lg:mb-8 xl:text-[54px]">
            {post.attributes.title}
          </h1>

          <p className="text-black font-medium">{post.attributes.post}</p>

          <p className="mt-10">
            by {post.attributes.writer} on {format(new Date(post.attributes.publishedAt), 'MMMM d, yyyy, h:mm a')}
          </p>
        </div>
      </div>
      <Testimonials />
      <CTA />
    </section>
  );
};

export default Page;
