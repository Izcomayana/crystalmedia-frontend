interface HeroProps {
  title: string;
}

const Hero: React.FC<HeroProps> = ({ title }) => {
  return (
    <section>
      <div className="p-8 bg-[#000309] mt-[-4px]">
        <div className="container mx-auto my-32 mb-44">
          <h1 className="text-white font-black text-4xl lg:text-7xl">{title}</h1>
        </div>
      </div>
    </section>
  )
}

export default Hero;