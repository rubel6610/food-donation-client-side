import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    id: 1,
    title: "Reduce Food Waste",
    subtitle: "Help minimize food waste by donating your surplus food today!",
    img: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
  },
  {
    id: 2,
    title: "Support the Community",
    subtitle: "Connect restaurants with charities and make a difference.",
    img: "https://images.pexels.com/photos/6646877/pexels-photo-6646877.jpeg",
  },
  {
    id: 3,
    title: "Make Every Meal Count",
    subtitle: "Your donation can become someone's next meal.",
    img: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
  },
];

const Banner = () => {
  return (
    <div className="w-full mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        className="rounded-xl overflow-hidden"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img src={slide.img} alt={slide.title} className="h-[80vh] w-full object-cover " />
            <div className="absolute inset-0   flex flex-col justify-center items-center text-white p-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h2>
              <p className="text-md md:text-xl max-w-2xl text-center">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
