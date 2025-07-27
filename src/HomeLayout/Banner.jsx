import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-router";

const Banner = () => {
  const [text] = useTypewriter({
    words: [
      "Reduce Food Waste",
      "Empower Charities",
      "Support the Community",
      "Make Every Meal Count"
    ],
    loop: true,
    typeSpeed: 60,
    deleteSpeed: 40,
    delaySpeed: 2000,
  });

  const slides = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
      subtitle: "Help minimize food waste by donating your surplus food today!",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/6646877/pexels-photo-6646877.jpeg",
      subtitle: "Connect restaurants with charities to empower lives and reduce hunger.",
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
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
        interval={6000}
        transitionTime={800}
        className="rounded-xl overflow-hidden"
      >
        {slides.map((slide, idx) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.img}
              alt={`Slide ${slide.id}`}
              className="h-[80vh] w-full object-cover brightness-75"
            />
            <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-6">
              {idx === 0 && (
                <h2 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-xl">
                  {text}
                  <Cursor cursorStyle="|" />
                </h2>
              )}
              <p className="text-lg md:text-xl font-light max-w-2xl mb-5 drop-shadow-md">
                {slide.subtitle}
              </p>
             
                <button className="btn btn-primary px-6 text-white shadow-lg hover:scale-105 transition" >
                  Donate Now
                </button>
           
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
