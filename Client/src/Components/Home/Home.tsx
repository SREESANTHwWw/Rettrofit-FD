import React from 'react';
import NavBar1 from '../NavBar1/NavBar1';
import FeaturesSection from '../Body/FeaturesSection';
import { FeaturesSection2 } from '../Body/FeaturesSection2';
import FeaturesSections3 from '../Body/FeaturesSections3';
import FeaturesSection4 from '../Body/FeaturesSection4';
import FeatureSection5 from '../Body/FeatureSection5';
import Footer from '../Body/Footer';

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center fadein  scroll-smooth">
      {/* Navbar */}
      <div className="w-full">
        <NavBar1 />
      </div>

      {/* Adding space below Navbar to prevent overlap */}
      
      <div className="w-full     mt-[100vh]"> 
        <FeaturesSection2 />
      </div>
      <div className="w-full  "> 
        <FeaturesSections3 />
      </div>
      <div className="w-full  "> 
        <FeaturesSection4 />
      </div>
      <div className="w-full  "> 
        <FeatureSection5 />
      </div>
      <div className="w-full  "> 
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
