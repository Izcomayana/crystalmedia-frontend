import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import GrowthCompass from "./components/GrowthCompass";
import WhyWeStarted from "./components/WhyWeStarted";
import Board from "./components/Board";
import Whatwedo from "./components/Whatwedo";
import Blog from "./components/Blog";
import HomeHero from "./components/HomeHero";
import GrowthTips from "./components/GrowthTips";

const HomePage = () => {
  return (
    <>
      <HomeHero />
      <GrowthCompass />
      <WhyWeStarted />
      <Board />
      <Whatwedo />
      <GrowthTips />
      <Testimonials />
      <Blog />
      <CTA />
    </>
  );
};

export default HomePage;