import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {


  const slides = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
      title: "Reduce Food Waste",
      subtitle: "Help minimize food waste by donating your surplus food today!",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/6646877/pexels-photo-6646877.jpeg",
      title: "Empower Charities",
      subtitle: "Connect restaurants with charities to empower lives and reduce hunger.",
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
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
              className="h-[80vh] w-full object-cover  brightness-70"
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
