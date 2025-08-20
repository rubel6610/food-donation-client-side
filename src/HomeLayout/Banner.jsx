import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {


  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1592417817038-d13fd7342605?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Reduce Food Waste",
      subtitle: "Help minimize food waste by donating your surplus food today!",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Empower Charities",
      subtitle: "Connect restaurants with charities to empower lives and reduce hunger.",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Make Every Meal Count",
      subtitle: "Every extra meal can be someone's only meal — make it count!",
    },
  ];

  return (
    <div className="w-full mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
        className="rounded-xl overflow-hidden"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.img}
              alt={`Slide ${slide.id}`}
              className="md:h-[70vh] h-[50vh] w-full object-cover  brightness-60"
            />
            {/* Overlay */}
            <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-6">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-xl">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl font-light max-w-2xl mb-5 drop-shadow-md">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
