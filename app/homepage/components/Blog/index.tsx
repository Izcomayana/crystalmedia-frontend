"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths  } from 'next';

import slantarrow from "@/public/images/slant-arrow.png";
import arrow from "@/public/images/arrow.png";

type Post = {
  id: number;
  topic: string;
  writer: string;
  post: string;
  date: string;
  image: string;
};

const Blog = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/data/blogs.json");
      const data = await response.json();
      setPosts(data.slice(0, 2));
    };

    fetchPosts();
  }, []);

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
              <Image
                src={slantarrow}
                alt={"arrow"}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="my-8 flex flex-col justify-between gap-8 lg:flex-row  ">
          {posts.map((post) => (
            <div
              className="border border-black p-6 rounded-2xl transition-all hover:border-2"
              key={post.id}
            >
              <div className="flex flex-col gap-3">
                <div>
                  <div>
                    <Image
                      src={post.image}
                      width={400}
                      height={300}
                      alt="blogpost"
                      className="w-full"
                    />
                    <p className="text-primaryBlue text-sm mt-3 font-semibold">
                      {post.date}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="font-semibold text-lg text-black">
                    {post.topic}
                  </h2>
                  <p className="text-black">{post.post.substring(0, 200)}...</p>
                  <Link
                    href={`/blogs/blog?id=${post.id}`}
                    className="flex items-center font-semibold rounded-md hover:border hover:border-primaryBlue hover:p-2 hover:justify-between transition-all"
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

        <div></div>
      </div>
    </section>
  );
};

export default Blog;
