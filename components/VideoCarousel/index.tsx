"use client";
import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "../ui/emblaCarouselBtn";

type PropType = {
  Videos: Array<Videos>;
  options?: EmblaOptionsType;
};

type Videos = {
  data: {
    id: number;
    attributes: {
      video: {
        data: {
          id: number;
          attributes: {
            name: string;
            altText: string;
            url: string;
            caption: string;
            mime: string;
          };
        };
      };
    };
  };
};

const VideoCarousel: React.FC<PropType> = (props) => {
  const { Videos, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="video-embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container mt-4">
          {Videos.map((video) => (
            <div className="video__slide" key={video.data.id}>
              <div className="relative w-[290px] h-[458px] rounded-3xl mx-auto loop embla__slide__number">
                <video
                  className="w-full h-full rounded-3xl cursor-pointer object-cover"
                  loop
                  controls
                  muted
                >
                  <source
                    src={`${video.data.attributes.video.data.attributes.url}`}
                    type={video.data.attributes.video.data.attributes.mime}
                  />
                  Your browser does not support the video tag.
                </video>
                <p className="absolute bottom-20 left-4 text-base p-4 bg-gray-900 text-white font-bold">
                  {video.data.attributes.video.data.attributes.caption}{" "}
                  {video.data.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls container mx-auto">
        <div className="embla__dots mx-auto !gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot !w-3 !h-3".concat(
                index === selectedIndex
                  ? " embla__dot--selected !w-5 !h-5"
                  : "",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
