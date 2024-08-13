"use client";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import useFetch from "@/lib/api";

interface Blog {
  id: number;
  attributes: {
    date: Date;
    title: string;
    post: string;
    writer: string;
    publishedAt: string;
  };
}

const Blogs = () => {
  const { loading, error, data } = useFetch<{ data: Blog[]; meta: any }>(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`
  );

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
                <h2 className="text-2xl font-bold">{blog.attributes.title}</h2>
                <p>{blog.attributes.post}</p>
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
