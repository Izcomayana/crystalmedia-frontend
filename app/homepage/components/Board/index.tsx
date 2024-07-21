import Image from "next/image";
import board from "@/public/images/board.png";
import { Button } from "@/components/ui/button";

const Board = () => {
  return (
    <section>
      <div className="container mx-auto my-20">
        <div className="hidden justify-center items-center text-center flex-col xl:flex">
          <h3 className="font-semibold text-primaryBlue mb-4 text-lg lg:text-2xl">what we do</h3>
          <p className="font-bold text-4xl">Here are ways we can help <br /> you grow your business.</p>
        </div>
        <div className="xl:flex xl:flex-row-reverse xl:mt-10">
          <div className="mt-10 border-black border-2 xl:mt-0 xl:w-[60%]">
            <Image src={board} alt="boardroom" />
          </div>
          <div className="bg-primaryBlue flex justify-center items-center mb-10 p-4 xl:mb-0 xl:px-16 xl:w-[40%]">
            <p className="font-bold text-center text-white md:text-2xl xl:text-3xl">
              <span className="xl:hidden">Your Brand’s Story, our <br /> digital canvas.</span>
              <span className="hidden xl:block">Your Brand’s Story, Our <br /> Digital Canvas.</span>
            </p>
          </div>
        </div>
        <div className="hidden xl:block">
          <Button className="bg-black rounded-none mt-5 py-8 w-full text-lg">HIRE THE AGENCY</Button>
        </div>
      </div>
    </section>
  )
}

export default Board;