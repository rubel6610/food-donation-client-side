import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    id: 1,
    title: "Reduce Food Waste",
    subtitle: "Help minimize food waste by donating your surplus food today!",
    img: "https://table2table.org/wp-content/uploads/2022/11/LFFW-News-Release-Graphic-6-1024x576-978x500.png",
  },
  {
    id: 2,
    title: "Support the Community",
    subtitle: "Connect restaurants with charities and make a difference.",
    img: "https://as2.ftcdn.net/v2/jpg/02/94/21/35/1000_F_294213591_Kohh5RAIgSzAha2bGPj13pGFCVbNtnf3.jpg",
  },
  {
    id: 3,
    title: "Make Every Meal Count",
    subtitle: "Your donation can become someone's next meal.",
    img: "https://img.freepik.com/free-photo/volunteers-handing-out-meal-boxes-help-poor-less-fortunate-embodying-compassion-humanitarian-aid-image-captures-spirit-food-drive-offering-free-food-homeless-individuals_482257-68646.jpg",
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
            <div className="absolute inset-0   flex flex-col justify-center items-center text-blue-400 p-6">
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
