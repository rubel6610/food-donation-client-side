import React from 'react';
import Banner from './Banner';
import FeaturedDonations from './FeaturedDonations';
import LatestCharityRequests from './LatestCharityRequests';
const Home = () => {
    return (
        <div>
          <Banner/>
          <FeaturedDonations/>
          <LatestCharityRequests/>
        </div>
    );
};

export default Home;