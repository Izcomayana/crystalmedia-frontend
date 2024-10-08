const WhyWeStarted = () => {
  return (
    <section>
      <div className="container mx-auto my-20">
        <p className="font-semibold text-primaryBlue text-center mb-8 text-sm lg:font-bold lg:text-4xl">
          Why we started Crystal <br className="lg:hidden" /> Mediatech
        </p>

        <div className="max-w-[756px] max-h-[456px] mx-auto loop">
          <video
            className="h-full w-full rounded-3xl cursor-pointer"
            loop
            controls
            muted
          >
            <source
              src="https://docs.material-tailwind.com/demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default WhyWeStarted;
