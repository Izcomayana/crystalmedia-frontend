"use client"

import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './emblaCarouselBtn';
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image, { StaticImageData } from "next/image";

type PropType = {
  slides: Array<SLIDES>,
  options?: EmblaOptionsType
}

type SLIDES = {
  img: StaticImageData,
  text: string,
  index: number
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="container mx-auto embla__slide" key={slide.index}>
              <div className="border-4 border-[#00338D] embla__slide__number">
                <div>
                  <Image src={slide.img} alt="social media marketing" className="mx-auto" />
                </div>
                <div className="bg-[#00338D] text-center p-4">
                  <h1 className="text-white font-bold text-lg">{slide.text}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls container mx-auto">
        <div className="embla__dots mx-auto">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
