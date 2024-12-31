"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchTeam } from "@/lib/firebaseUtils";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  img: string;
};

const TheTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const teamData = await fetchTeam();
        setTeam(teamData as TeamMember[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTeamData();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto mt-8 flex flex-col justify-start gap-10 lg:flex-row">
        {[...Array(3)].map((_, index) => (
          <div
            className="flex flex-col w-full mx-auto md:w-1/2 lg:mx-0 lg:w-80"
            key={index}
          >
            <Skeleton className="h-[21.5rem] w-full rounded-none" />
            <div className="space-y-4 mt-1">
              <Skeleton className="h-20 w-full rounded-none" />
            </div>
          </div>
                ))}
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-10 lg:flex-row">
      {team.map((member) => (
        <div
          key={member.id}
          className="md:w-1/2 mx-auto lg:mx-0 lg:w-fit"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <div className="w-fit mx-auto">
            <Image
              src={member.img}
              alt={member.name}
              width={300}
              height={200}
            />
          </div>
          <div className="bg-primaryBlue p-4 mt-1 text-white">
            <h4 className="font-bold text-lg xl:text-lg">
              {member.name || "Unknown"}
            </h4>
            <p className="font-semibold text-xs xl:text-sm">
              {member.role || "No role specified"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TheTeam;
