import React from 'react';

const HowItWorks = () => {
    return (
        <section className="max-w-6xl bg-base-100 my-10 mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">🤝 How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-base-200 shadow rounded-2xl">
            <h3 className="text-xl font-semibold mb-2">🥘 Donate Food</h3>
            <p>Restaurants and users share surplus food safely with our platform.</p>
          </div>
          <div className="p-6 bg-base-200 shadow rounded-2xl">
            <h3 className="text-xl font-semibold mb-2">🎁 Request Food</h3>
            <p>Charities can request available donations instantly.</p>
          </div>
          <div className="p-6 bg-base-200 shadow rounded-2xl">
            <h3 className="text-xl font-semibold mb-2">🚚 Pickup & Share</h3>
            <p>Food is delivered to communities and families in need.</p>
          </div>
        </div>
      </section>
    );
};

export default HowItWorks;