"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import useFetch from "@/lib/api";

type Team = {
  id: number;
  attributes: {
    name: string;
    role: string;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string;
          width: number;
          height: number;
          url: string;
        }
      }
    }
  }
};

const TheTeam = () => {
  const { loading, error, data } = useFetch<{ data: Team[]; meta: any }>(`${process.env.NEXT_PUBLIC_STRAPI_URL}/teams?populate=*`);
  
  if (loading) {
    return <Loader />;
  }

  if (error) return <p>Error :(</p>

  return (
    <section>
      <div className="container mx-auto">
        <h3 className="font-semibold text-xl lg:text-3xl xl:font-bold xl:text-5xl">
          Meet the <br /> remarkable brains
        </h3>
        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row">
          {data?.data.map((team) => (
            <div key={team.id} className="md:w-1/2 md:mx-auto lg:w-fit">
              <div
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500"
              >
                <div className="w-fit mx-auto">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI}${team.attributes.image.data.attributes.url}`}
                    alt={team.attributes.image.data.attributes.alternativeText}
                    width={team.attributes.image.data.attributes.width}
                    height={team.attributes.image.data.attributes.height}
                  />
                </div>
                <div className="bg-primaryBlue p-4 mt-1 text-white">
                  <h4 className="font-bold text-lg xl:text-xl">{team.attributes.name}</h4>
                  <p className="font-semibold text-xs xl:text-sm">
                    {team.attributes.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheTeam;
