"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image, { StaticImageData } from "next/image";
import Loader from "@/components/Loader";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  img: StaticImageData;
};

const TheTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "team"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TeamMember[];

        console.log("Fetched Team Data:", data);
        setTeam(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team data:", error);
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <div className="container mx-auto">
        <h3 className="font-semibold text-lg lg:text-3xl xl:font-bold xl:text-5xl">
          Meet the <br /> remarkable brains
        </h3>
        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row">
          {team.map((member) => (
            <div
              key={member.id}
              className="md:w-1/2 md:mx-auto lg:w-fit"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <div className="w-fit mx-auto">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={200}
                  height={200}
                  className=""
                />
              </div>
              <div className="bg-primaryBlue p-4 mt-1 text-white">
                <h4 className="font-bold text-lg xl:text-lg">{member.name || "Unknown"}</h4>
                <p className="font-semibold text-xs xl:text-sm">{member.role || "No role specified"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheTeam;