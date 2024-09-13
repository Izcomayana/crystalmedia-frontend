import React from "react";
import RenderImages from "../Images";
import RenderRichText from "../RichText";
import { Portfolio, SubTab } from "../../usePortfolioState";

interface RenderMediaProps {
  portfolio: Portfolio;
  subtab?: SubTab;
  activeSubTabs?: { [key: number]: string };
}

const RenderMedia: React.FC<RenderMediaProps> = ({ portfolio, subtab, activeSubTabs }) => {
  // Directly render images if there are no subtabs and images exist
  if (!portfolio.attributes.subtabs?.data.length && portfolio.attributes.images?.data) {
    return <RenderImages data={portfolio.attributes.images.data || []} name={portfolio.attributes.name} subtabValue="" />;
  }

  // Render video if available
  if (portfolio.attributes.video?.data) {
    return (
      <div key={portfolio.attributes.video.data.id}>
        <div className="w-full h-min mx-auto my-10 loop md:mb-20">
          <video className="h-full w-full rounded-3xl cursor-pointer" loop controls muted>
            <source src={`${process.env.NEXT_PUBLIC_STRAPI}${portfolio.attributes.video.data.attributes.url}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {portfolio.attributes.caption && <RenderRichText caption={portfolio.attributes.caption} />}
      </div>
    );
  }

  // Render images for the subtab
  if (subtab && subtab.attributes.images?.data) {
    return <RenderImages data={subtab.attributes.images.data} name={subtab.attributes.name} subtabValue={subtab.attributes.value} />;
  }

  return <div>null</div>;
};

export default RenderMedia;
