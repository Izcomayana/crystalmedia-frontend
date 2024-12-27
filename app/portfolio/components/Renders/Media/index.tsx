import React from "react";
import RenderImages from "../Images";
import RenderRichText from "../RichText";
import { Portfolio, SubTab } from "../../usePortfolioState";
import ReactMarkdown from "react-markdown";

interface RenderMediaProps {
  portfolio: Portfolio;
  subtab?: SubTab;
  activeSubTabs?: { [key: string]: string };
}

const RenderMedia: React.FC<RenderMediaProps> = ({
  portfolio,
  subtab,
  activeSubTabs,
}) => {
  console.log("Portfolio Passed to RenderMedia:", portfolio.name);
  console.log("Portfolio Video:", portfolio.video);

  // Render video if video exists
  if (portfolio.video) {
    console.log("Rendering video for:", portfolio.name);
    return (
      <div key={portfolio.id}>
        <div className="max-w-[756px] max-h-[456px] mx-auto mb-10 loop md:mb-20">
          <video
            className="h-full w-full rounded-3xl cursor-pointer"
            loop
            controls
            muted
          >
            <source src={portfolio.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-sm text-gray-800 my-3">
          <ReactMarkdown>{portfolio.caption}</ReactMarkdown>
        </div>
      </div>
    );
  }

  // Render images if no subtabs and images exist
  if (!portfolio.subtabs?.length && portfolio.images?.length) {
    return (
      <RenderImages
        data={portfolio.images || []}
        name={portfolio.name}
        subtabValue=""
      />
    );
  }

  // Render images for the subtab
  if (subtab && subtab.images?.length) {
    return (
      <RenderImages
        data={subtab.images}
        name={subtab.name}
        subtabValue={subtab.value}
      />
    );
  }

  // Default fallback for tabs with neither subtabs nor images
  return (
    <div className="text-center text-gray-500">
      <p>No content available for this tab.</p>
    </div>
  );
};

export default RenderMedia;
