import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Image as PortfolioImage } from "../../usePortfolioState";

interface RenderImagesProps {
  data: PortfolioImage[];
  subtabValue: string;
  name?: string;
  year?: number;
  type?: string;
}

const RenderImages: React.FC<RenderImagesProps> = ({ data, subtabValue }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {data.map((image) => (
        <div
          key={image.id}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className={`p-4 rounded-2xl ${
            subtabValue === "twitter-campaigns"
              ? "mt-5 border border-black"
              : ""
          }`}
        >
          <div
            className={`relative ${
              subtabValue === "brand-identity" ? "group" : ""
            }`}
          >
            <Image
              src={`${image.src}`}
              alt={image.alt}
              // width={300}
              width={`${subtabValue === "twitter-campaigns" ? 400 : 300}`}
              height={300}
              className={`mx-auto ${
                subtabValue === "brand-identity"
                  ? "transition-all duration-300 group-hover:opacity-80"
                  : ""
              } `}
            />

            {/* Overlay for brand-identity */}
            {subtabValue === "brand-identity" && (
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            )}
          </div>

          {/* Link for brand-identity */}
          {subtabValue === "brand-identity" && (
            <div className="my-2 flex justify-center items-center">
              <Link
                href={"/#"}
                className="flex gap-2 text-xs border-b border-b-slate-900 hover:border-b-slate-600 hover:text-slate-600 transition-all md:text-sm lg:text-base"
              >
                <span>View case study</span>
                <MdOutlineArrowOutward className="mt-1" />
              </Link>
            </div>
          )}

          {/* Add different UI conditions for other tabs */}
          {subtabValue === "twitter-campaigns" && (
            <div className="my-2">
              <div className="flex justify-between">
                <p className="text-xs font-bold lg:text-base">{image.type}</p>
                <p className="text-xs font-bold lg:text-base">{image.year}</p>
              </div>
              <div className="my-3 lg:my-7">
                <p className="font-semibold text-lg md:text-2xl lg:text-3xl xl:text-4xl">
                  {image.name}
                </p>
              </div>
              <div className="flex justify-start items-center">
                <Link
                  href={"/#"}
                  className="flex gap-2 text-xs border-b border-b-slate-900 hover:border-b-slate-400 transition-all md:text-sm lg:text-base"
                >
                  <span>View case study</span>
                  <MdOutlineArrowOutward className="mt-1" />
                </Link>
              </div>
            </div>
          )}

          {subtabValue === "tiktok-campaigns" && (
            <div className="flex justify-between bg-primaryBlue p-4 mt-1 text-white">
              <h4 className="font-bold text-lg xl:text-lg">{image.name}</h4>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderImages;


