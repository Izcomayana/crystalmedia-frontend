import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import GrowthCompass from "./components/GrowthCompass";
import WhyWeStarted from "./components/WhyWeStarted";
import Board from "./components/Board";
import Whatwedo from "./components/Whatwedo";

const HomePage = () => {
  return (
    <div>
      <GrowthCompass />
      <WhyWeStarted />
      <Board />
      <Whatwedo />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default HomePage;
