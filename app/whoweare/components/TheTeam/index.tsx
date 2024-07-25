"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";

type Team = {
  id: number;
  name: string;
  role: string;
  image: string;
};

const TheTeam = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await fetch("/data/data.json");
      const data = await response.json();
      console.log(data)
      console.log(data.team)
      setTeams(data.team);
    };

    fetchTeam();
  }, []);

  if (!teams) {
    return <Loader />
  }

  return (
    <section>
      <div className="container mx-auto">
        <h3 className='font-semibold text-xl lg:text-3xl xl:font-bold xl:text-5xl'>Meet the <br /> remarkable brains</h3>
        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row">
          {teams.map((team) => (
            <div key={team.id} className="md:w-1/2 md:mx-auto lg:w-fit">
              <div className="w-fit mx-auto">
                <Image src={team.image} alt={team.name} width={400} height={300} />
              </div>
              <div className="bg-primaryBlue p-4 mt-1 text-white">
                <h4 className="font-bold text-lg xl:text-xl">{team.name}</h4>
                <p className="font-semibold text-xs xl:text-sm">{team.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TheTeam;