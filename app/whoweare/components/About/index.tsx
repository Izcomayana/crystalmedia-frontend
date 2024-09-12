import React from "react";

const About = () => {
  return (
    <section data-aos="fade-up" data-aos-anchor-placement="center-center">
      <div className="flex flex-col justify-center items-center p-8 xl:my-20">
        <div className="lg:w-1/2 xl:w-5/12">
          <h3 className="text-black font-semibold text-lg xl:text-4xl">
            About Crystal Media
          </h3>
          <p className="leading-5 text-black text-base mt-2 lg:mt-4 xl:text-lg">
            Crystal Mediatech is run by professionals who collectively have over
            25 years of experience in their respective fields such as marketing,
            public relations, social media marketing, campaign management, and
            content strategy creation. We partner with brands to establish and
            improve their brand reputation, growth, development, and sales. With
            our experience and expertise, we work with brands in their unique
            reality and deploy strategies that work in their individual niches.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
