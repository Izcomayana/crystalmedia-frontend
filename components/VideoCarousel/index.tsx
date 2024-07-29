"use client"
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
  slides: Array<Tips>
  options?: EmblaOptionsType
}

type Tips = {
  src: string,
  caption: string,
  id: number
}

const VideoCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  return (
    <section className="video-embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container mt-4">
          {slides.map((slide) => (
            <div className="video__slide" key={slide.id}>
              <div className="relative w-[290px] h-[458px] rounded-3xl mx-auto loop embla__slide__number">
              <video className="w-full h-full rounded-3xl cursor-pointer object-cover"  loop controls muted>
                <source
                  src={slide.src}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <p className="absolute bottom-20 left-4 text-base p-4 bg-gray-900 text-white font-bold">{slide.caption} {slide.id}</p>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VideoCarousel;
