import React from 'react';
import Banner from './Banner';
import FeaturedDonations from './FeaturedDonations';
import LatestCharityRequests from './LatestCharityRequests';
import Footer from './Footer';
import ImpactStats from './ImpactStats';
import CommunityStories from './CommunityStories';
import UpcomingEvents from './UpcomingEvent';

import DonationStatistics from './DonationStatistics';

import HowItWorks from './HowItWorks';
const Home = () => {
    return (
        <div>
          <Banner/>
          <FeaturedDonations/>
          <LatestCharityRequests/>
          <DonationStatistics/>
          <UpcomingEvents/>
          <ImpactStats/>
         
          <HowItWorks/>
        
          <CommunityStories/>
          <Footer/>
        </div>
    );
};

export default Home;