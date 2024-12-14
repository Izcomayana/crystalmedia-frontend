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
        const querySnapshot = await getDocs(collection(db, "team")); // Replace 'team' with your actual Firestore collection name
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TeamMember[]; // Explicitly cast the mapped data to the TeamMember type

        console.log("Fetched Team Data:", data);
        setTeam(data); // Update state with the fetched team data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team data:", error);
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return <Loader />; // Display loader while data is being fetched
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
                  src={member.img} // Firebase Storage URL or other hosting URL
                  alt={member.name}
                  width={200} // Adjust as needed
                  height={200} // Adjust as needed
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




// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase"; // Ensure firebase.js is set up
// import Loader from "@/components/Loader"; // Optional loader component

// const TheTeam = () => {
//   const [team, setTeam] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTeamData = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "team")); // 'team' is the Firestore collection name
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         // setTeam(data);
//         console.log("data:", data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching team data:", error);
//         setLoading(false);
//       }
//     };
//     fetchTeamData();
//   }, []);

//   if (loading) {
//     return <Loader />; // Show loader while fetching
//   }

//   return (
//     <section>
//       <div className="container mx-auto">
//         <h3 className="font-semibold text-lg lg:text-3xl xl:font-bold xl:text-5xl">
//           Meet the <br /> remarkable brains
//         </h3>
//         <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row">
//           {team.map((member) => (
//             <div
//               // key={member.id}
//               className="md:w-1/2 md:mx-auto lg:w-fit"
//               data-aos="fade-down"
//               data-aos-easing="linear"
//               data-aos-duration="1500"
//             >
//               <div className="w-fit mx-auto">
                // {/* <Image
                //   src={member.img} // Firebase Storage URL or other hosting URL
                //   alt={member.name}
                //   width={200} // Adjust as needed
                //   height={200} // Adjust as needed
                //   className="rounded-full"
                // /> */}
//               </div>
//               <div className="bg-primaryBlue p-4 mt-1 text-white">
//                 {/* <h4 className="font-bold text-lg xl:text-lg">{member.name}</h4>
//                 <p className="font-semibold text-xs xl:text-sm">{member.role}</p> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TheTeam;








// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase"; // Ensure firebase.js is set up
// import Loader from "@/components/Loader"; // Optional loader component

// const TheTeam = () => {
//   const [team, setTeam] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTeamData = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "team")); // 'team' is the Firestore collection name
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setTeam(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching team data:", error);
//         setLoading(false);
//       }
//     };
//     fetchTeamData();
//   }, []);

//   if (loading) {
//     return <Loader />; // Show loader while fetching
//   }

//   return (
//     <section>
//       <div className="container mx-auto">
//         <h3 className="font-semibold text-lg lg:text-3xl xl:font-bold xl:text-5xl">
//           Meet the <br /> remarkable brains
//         </h3>
//         <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row">
//           {team.map((member) => (
//             <div
//               key={member.id}
//               className="md:w-1/2 md:mx-auto lg:w-fit"
//               data-aos="fade-down"
//               data-aos-easing="linear"
//               data-aos-duration="1500"
//             >
//               <div className="w-fit mx-auto">
//                 <Image
//                   src={member.img} // Firebase Storage URL or other hosting URL
//                   alt={member.name}
//                   width={200} // Adjust as needed
//                   height={200} // Adjust as needed
//                   className="rounded-full"
//                 />
//               </div>
//               <div className="bg-primaryBlue p-4 mt-1 text-white">
//                 <h4 className="font-bold text-lg xl:text-lg">{member.name}</h4>
//                 <p className="font-semibold text-xs xl:text-sm">{member.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TheTeam;







// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Loader from "@/components/Loader";
// import useFetch from "@/lib/api";


// const TheTeam = () => {
//   return (
//     <section>
//       <div className="container mx-auto">
//         <h3 className="font-semibold text-lg lg:text-3xl xl:font-bold xl:text-5xl">
//           Meet the <br /> remarkable brains
//         </h3>
//         <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row">
//             <div className="md:w-1/2 md:mx-auto lg:w-fit">
//               <div
//                 data-aos="fade-down"
//                 data-aos-easing="linear"
//                 data-aos-duration="1500"
//               >
//                 <div className="w-fit mx-auto">
//                   <Image src={""} alt={""} />
//                 </div>
//                 <div className="bg-primaryBlue p-4 mt-1 text-white">
//                   <h4 className="font-bold text-lg xl:text-lg">
//                     Staff name
//                   </h4>
//                   <p className="font-semibold text-xs xl:text-sm">
//                     Co founder
//                   </p>
//                 </div>
//               </div>
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TheTeam;




// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Loader from "@/components/Loader";
// import useFetch from "@/lib/api";

// type Team = {
//   id: number;
//   attributes: {
//     name: string;
//     role: string;
//     image: {
//       data: {
//         id: number;
//         attributes: {
//           name: string;
//           alternativeText: string;
//           width: number;
//           height: number;
//           url: string;
//         };
//       };
//     };
//   };
// };

// const TheTeam = () => {
//   const { loading, error, data } = useFetch<{ data: Team[]; meta: any }>(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/teams?populate=*`,
//   );

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <section>
//       <div className="container mx-auto">
//         <h3 className="font-semibold text-lg lg:text-3xl xl:font-bold xl:text-5xl">
//           Meet the <br /> remarkable brains
//         </h3>
//         <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row">
//           {data?.data.map((team) => (
//             <div key={team.id} className="md:w-1/2 md:mx-auto lg:w-fit">
//               <div
//                 data-aos="fade-down"
//                 data-aos-easing="linear"
//                 data-aos-duration="1500"
//               >
//                 <div className="w-fit mx-auto">
//                   <Image
//                     src={`${team.attributes.image.data.attributes.url}`}
//                     alt={team.attributes.image.data.attributes.alternativeText}
//                     width={team.attributes.image.data.attributes.width}
//                     height={team.attributes.image.data.attributes.height}
//                   />
//                 </div>
//                 <div className="bg-primaryBlue p-4 mt-1 text-white">
//                   <h4 className="font-bold text-lg xl:text-lg">
//                     {team.attributes.name}
//                   </h4>
//                   <p className="font-semibold text-xs xl:text-sm">
//                     {team.attributes.role}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TheTeam;
