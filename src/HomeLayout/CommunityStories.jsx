import React from "react";

const stories = [
  {
    id: 1,
    title: "Leftover Meals Fed 200 People",
    description:
      "Ruman's Restaurant in Lakshmipur donated 50 rice meals after a festival. These meals fed over 200 people through Hope Foundation.",
    image:
      "https://media.istockphoto.com/id/1457889029/photo/group-of-food-with-high-content-of-dietary-fiber-arranged-side-by-side.jpg?s=1024x1024&w=is&k=20&c=96MkVCuqUWOcMZ7vO5nG41rPufiSWlayTac_nsxXUTw=",
    by: "Ruman's Restaurant",
  },
  {
    id: 2,
    title: "Charity Picked Up Food on Eid",
    description:
      "On Eid morning, Food4Hope collected surplus bakery items from Joy Bakery and distributed them to local shelters.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    by: "Food4Hope Charity",
  },
  {
    id: 3,
    title: "Veggies Saved from Wastage",
    description:
      "A farmer's market donated unsold vegetables, which helped feed over 150 people thanks to the MealsOnWheels team.",
    image:
      "https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=1024x1024&w=is&k=20&c=QPHFTWoscwMSXOEGKoAKOjlCnMGszppFBrqQHdy4EGc=",
    by: "MealsOnWheels",
  },
];

const CommunityStories = () => {
  return (
    <section className="bg-base-300 py-12 rounded-xl">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
          ❤️ Community Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-base-100 border border-gray-200 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-400 text-sm">{story.description}</p>
                <div className="mt-4 text-sm text-green-600 font-medium">
                  — {story.by}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;
