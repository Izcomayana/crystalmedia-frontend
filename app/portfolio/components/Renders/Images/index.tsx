import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Image as PortfolioImage } from "../../usePortfolioState";

interface RenderImagesProps {
  data: PortfolioImage[];
  name: string;
  subtabValue: string;
}

const RenderImages: React.FC<RenderImagesProps> = ({
  data,
  name,
  subtabValue,
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-start">
      {data.map((image) => (
        <div
          key={image.id}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className={`p-4 rounded-2xl ${
            subtabValue === "twitter-campaigns" ? "border border-black" : ""
          }`}
        >
          <div
            className={`relative ${
              subtabValue === "brand-identity" ? "group" : ""
            }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI}${image.attributes.url}`}
              alt={image.attributes.altText}
              width={image.attributes.width}
              height={image.attributes.height}
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
                className="flex gap-2 text-xs border-b border-b-slate-900 hover:border-b-slate-600 hover:text-slate-600 transition-all"
              >
                <span>View case study</span>
                <MdOutlineArrowOutward />
              </Link>
            </div>
          )}

          {/* Add different UI conditions for other tabs */}
          {subtabValue === "twitter-campaigns" && (
            <div className="flex justify-between">
              <p className="text-sm text-gray-800">Twitter Trends Image</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderImages;