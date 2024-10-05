import Image from "next/image";
import { Button } from "../ui/button";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";

const Footer = () => {
  return (
    <footer>
      <div>
        <div className="bg-primaryBlue flex flex-col justify-center items-center p-20">
          <h2 className="font-extrabold text-white text-base lg:text-3xl xl:text-[56px]">
            5x more reach
          </h2>
          <h2 className="font-extrabold text-white text-base mt-2 lg:text-3xl xl:text-[56px] xl:mt-8">
            5x more sales.
          </h2>
          <p className="mt-4 text-center text-white text-[4.5px] md:text-xs xl:text-base xl:mt-8">
            We share tips and strategies for growing your business and standing
            out in today’s <br />
            competitive market in our weekly newsletters. We know scaling isn’t
            always easy, so we’re <br />
            here to support you through every phase. You can opt out of our
            newsletter anytime.
          </p>
          <Button className="mt-6 bg-white text-primaryBlue font-semibold hover:bg-[#cccdff] transition-all">
            Get Started
          </Button>
        </div>
        <div className="bg-black flex justify-center gap-2 items-center p-16">
          <div className="hover:mt-[-1rem] transition-all">
            <FaTiktok className="text-white w-6 h-6" />
          </div>
          <div className="hover:mt-[-1rem] transition-all">
            <a target="_blank" href="https://x.com/crystalmtech">
              <FaXTwitter className="text-white w-6 h-6 mx-4" />
            </a>
          </div>
          <div className="hover:mt-[-1rem] transition-all">
            <a target="_blank" href="https://www.instagram.com/crystalmediatech/">
              <PiInstagramLogoFill className="text-white w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
