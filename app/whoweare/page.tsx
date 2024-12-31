"use client";

import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Hero from "./components/Hero";
import About from "./components/About";
import TheTeam from "./components/TheTeam";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import { fetchTeam } from "@/lib/firebaseUtils";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  img: string;
};

const WhoWeAre = () => {
  return (
    <>
      <Hero />
      <About />
      <section>
        <div className="container mx-auto">
          <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl xl:font-bold xl:text-4xl">
            Meet the <br /> remarkable brains
          </h3>
      <TheTeam />
        </div>
      </section>
      <CTA />
      <Testimonials />
    </>
  );
};

export default WhoWeAre;
