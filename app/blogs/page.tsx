import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

const Blogs = () => {
  return (
    <section>
      <div>
        <Hero title="Our blog" />
        <div className="container mx-auto">
          <div className="my-20 mb-40">
            <h1 className="font-bold text-3xl mb-4 lg:text-5xl lg:mb-8 xl:text-[54px]">
              Blog posts
            </h1>

            <p className="text-black font-medium">
              blog posts
            </p>
          </div>
        </div>
        <Testimonials />
        <CTA />
      </div>
    </section>
  );
};

export default Blogs;
