function Banner() {
  return (
    <div className="w-full h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[115vh] xl:h-[115vh] overflow-hidden">
      <img
        src="/bg/banner.png"
        alt="banner"
        className="
          h-full 
          w-auto 
          object-contain 
          object-top
          sm:w-full sm:h-full sm:object-cover
          lg:object-center
        "
      />
    </div>
  );
}

export default Banner;