function Banner() {
  return (
    <div className="w-full h-[60vh] sm:h-[70vh] md:h-[90vh] lg:h-[115vh] overflow-hidden">
      <img
        src="/bg/banner.png"
        alt="banner"
        className="
          w-full h-full 
          object-cover 
          object-[center_top] 
          sm:object-center 
        "
      />
    </div>
  );
}

export default Banner;