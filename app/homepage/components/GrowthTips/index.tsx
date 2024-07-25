import growthTips from "@/public/images/growthTips.png";
import VideoCarousel from "@/components/VideoCarousel";
import { EmblaOptionsType } from 'embla-carousel';

const Tips = [
  {
    id: 1,
    src: "https://docs.material-tailwind.com/demo.mp4",
    caption: "SOCIAL MEDIA MARKETING AND MANAGEMENT",
  },
  {
    id: 2,
    src: "https://docs.material-tailwind.com/demo.mp4",
    caption: "DESIGN AND BRANDING",
  },
  {
    id: 3,
    src: "https://docs.material-tailwind.com/demo.mp4",
    caption: "INFLUENCER MARKETING",
  },
  {
    id: 4,
    src: "https://docs.material-tailwind.com/demo.mp4",
    caption: "PUBLIC RELATION (PR)",
  },
  {
    id: 5,
    src: "https://docs.material-tailwind.com/demo.mp4",
    caption: "MARKETING WITH A SMALL BUDGET",
  },
  {
    id: 6,
    src: "https://docs.material-tailwind.com/demo.mp4",
    caption: "MARKETING WITH A SMALL BUDGET",
  },
  {
    id: 7,
    src: "https://docs.material-tailwind.com/demo.mp4",
    caption: "MARKETING WITH A SMALL BUDGET",
  },
  {
    id: 8,
    src: "https://docs.material-tailwind.com/demo.mp4",
    caption: "MARKETING WITH A SMALL BUDGET",
  },
  {
    id: 9,
    src: "https://docs.material-tailwind.com/demo.mp4",
    caption: "PUBLIC RELATION (PR)",
  },
  {
    id: 10,
    src: "https://docs.material-tailwind.com/demo.mp4",
    caption: "PUBLIC RELATION (PR)",
  }
]

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const SLIDE_COUNT = 10
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const GrowthTips = () => {
  return (
    <section>
      <div className="container mx-auto my-10 xl:mt-20">
        <div className="text-center">
          <h2 className='text-3xl font-bold xl:text-[40px]'>Growth Tips</h2>
          <p className='text-sm xl:mt-2 xl:text-base'>By Crystalmediatech</p>
        </div>

        <div className="mt-4 w-full flex flex-col gap-4 xl:hidden">
          {Tips.map((Tip) => (
            <div className="relative h-[444px] rounded-3xl mx-auto loop md:w-[333px]" key={Tip.id}>
              <video className="w-full h-full rounded-3xl cursor-pointer object-cover"  loop controls muted>
                <source
                  src={Tip.src}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <p className="absolute bottom-20 left-4 text-base p-4 bg-gray-900 text-white font-bold">{Tip.caption}</p>
            </div>
          ))}
        </div>

        <div className="hidden xl:block">
          <VideoCarousel slides={Tips} options={OPTIONS} />
        </div>
      </div>
    </section>
  )
}

export default GrowthTips;