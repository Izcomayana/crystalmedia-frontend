import Image from "next/image";
import board from "@/public/images/board.png";
import { Button } from "@/components/ui/button";

const Board = () => {
  return (
    <section>
      <div className="container mx-auto my-20">
        <div className="flex justify-center items-center text-center flex-col">
          <h3 className="font-semibold text-primaryBlue mb-4 text-base">
            what we do
          </h3>
          <p className="font-bold text-xl lg:text-4xl">
            Here are ways we can help <br /> you grow your business.
          </p>
        </div>
        <div
          className="xl:flex xl:flex-row-reverse xl:mt-10"
          data-aos="fade-up"
          data-aos-anchor-placement="center-center"
        >
          <div className="mt-10 border-black border-2 xl:mt-0 xl:w-[60%]">
            <Image src={board} alt="boardroom" className="mx-auto" />
          </div>
          <div className="bg-primaryBlue flex justify-center items-center mb-10 p-4 xl:mb-0 xl:px-16 xl:w-[40%]">
            <p className="font-bold text-center text-white text-base md:text-2xl xl:text-3xl">
              Your Brand’s Story, Our <br /> Digital Canvas.
            </p>
          </div>
        </div>
        <div className="hidden xl:block">
          <Button className="bg-black rounded-none mt-5 py-8 w-full text-lg">
            HIRE THE AGENCY
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Board;
