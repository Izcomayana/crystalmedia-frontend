"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "../ui/emblaCarouselBtn";

type VideoType = {
  id: string;
  name: string;
  altText: string;
  url: string;
  caption: string;
  mime: string;
};

const VideoCarousel = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tipsvideos"));
        const videoData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as VideoType[];

        setVideos(videoData);
        console.log("videos:", videos)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  return (
    <section className="video-embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container mt-4">
          {videos.map((video) => (
            <div className="video__slide" key={video.id}>
              <div className="relative w-[290px] h-[458px] rounded-3xl mx-auto loop embla__slide__number">
                <video
                  className="w-full h-full rounded-3xl cursor-pointer object-cover"
                  loop
                  controls
                  muted
                >
                  <source src={video.url} type={video.mime} />
                  Your browser does not support the video tag.
                </video>
                <p className="absolute bottom-20 left-4 text-base p-4 bg-gray-900 text-white font-bold">
                  {video.caption}
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
                  : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;