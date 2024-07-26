"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { Skeleton } from "@/components/ui/skeleton";
import { FaLessThanEqual } from "react-icons/fa6";

type Post = {
  id: number;
  topic: string;
  post: string;
  writer: string;
  date: string;
  image: string;
};

const Page: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await fetch("/data/data.json");
        if(!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const data = await response.json();
        console.log("Data:", data);
        const foundPost = data.blogs.find(
          (post: Post) => post.id === parseInt(id, 10)
        );

        setTimeout(() => {
          setPost(foundPost);
          setLoading(false);
        }, 3500);
      } catch (err: any) {
        setError(err.message);
        setLoading(false)
      }
    };

    fetchPost();
  }, [id]);

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

  return (
    <section>
      <div className="container mx-auto">
        <div className="my-20 mb-40">
          <h1 className="font-bold text-3xl mb-4 lg:text-5xl lg:mb-8 xl:text-[54px]">
            {post.topic}
          </h1>

          <p className="text-black font-medium">{post.post}</p>

          <p className="mt-10">
            by {post.writer} on {post.date}
          </p>
        </div>
      </div>
      <Testimonials />
      <CTA />
    </section>
  );
};

export default Page;
