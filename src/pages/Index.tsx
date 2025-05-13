
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDogs from '@/components/home/FeaturedDogs';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import { mockDogs } from '@/data/mockData';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedDogs dogs={mockDogs} />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
