"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';

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
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const response = await fetch("/data/blogs.json");
      const data = await response.json();
      console.log('Data:', data); // Log the data to ensure it is fetched correctly
      const foundPost = data.find((post: Post) => post.id === parseInt(id, 10));
      console.log('Found Post:', foundPost); // Log the found post to ensure it is correct
      setPost(foundPost);
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <div>
        {/* <Hero title="Our blog" /> */}
        <div className="container mx-auto">
          <div className="my-20 mb-40">
            <h1 className="font-bold text-3xl mb-4 lg:text-5xl lg:mb-8 xl:text-[54px]">
              {post.topic}
            </h1>

            <p className="text-black font-medium">
              {post.post}
            </p>

            <p className='mt-10'>by {post.writer} on {post.date}</p>
          </div>
        </div>
        <Testimonials />
        <CTA />
      </div>
    </section>
  );
};

export default Page;
