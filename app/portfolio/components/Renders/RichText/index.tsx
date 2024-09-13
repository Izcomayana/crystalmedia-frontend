import React from "react";
import { Caption } from "../../usePortfolioState";

interface RenderRichTextProps {
  caption: Caption[];
}

const RenderRichText: React.FC<RenderRichTextProps> = ({ caption }) => {
  return (
    <div className="font-medium text-black text-base" data-aos="fade-up" data-aos-anchor-placement="center-center">
      {caption.map((block, index) => (
        <p key={index} style={{ marginBottom: "1.5em" }}>
          {block.children.map((child, idx) => {
            let element: React.ReactNode = child.text;
            if (child.bold) element = <strong key={idx}>{element}</strong>;
            if (child.italics) element = <em key={idx}>{element}</em>;
            return <React.Fragment key={idx}>{element}</React.Fragment>;
          })}
        </p>
      ))}
    </div>
  );
};

export default RenderRichText;
