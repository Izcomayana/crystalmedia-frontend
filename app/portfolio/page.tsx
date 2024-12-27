import Hero from "@/components/Hero";
import PortfolioTabs from "./components/PortfolioTabs";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";

const Portfolio = () => {
  return (
    <>
      <Hero title="Our Portfolio" />
      <PortfolioTabs />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Portfolio;
