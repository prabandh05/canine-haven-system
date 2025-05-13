
import React from 'react';
import { CheckCircle, Heart, Search, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: Search,
    title: 'Browse Available Dogs',
    description: 'Explore our selection of lovable dogs waiting for their forever homes.',
    color: 'bg-blue-100',
    iconColor: 'text-rescue-primary',
  },
  {
    icon: Heart,
    title: 'Find Your Match',
    description: 'Get to know their personalities, needs, and what makes them special.',
    color: 'bg-orange-100',
    iconColor: 'text-rescue-secondary',
  },
  {
    icon: CheckCircle,
    title: 'Apply to Adopt',
    description: 'Submit an application for your chosen furry friend.',
    color: 'bg-purple-100',
    iconColor: 'text-rescue-accent',
  },
  {
    icon: Home,
    title: 'Welcome Them Home',
    description: 'Complete the adoption process and welcome your new best friend.',
    color: 'bg-green-100',
    iconColor: 'text-green-600',
  },
];

const HowItWorks = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Adoption Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Finding your perfect companion is just a few steps away. Our simple
            adoption process helps match dogs with their forever homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className={cn('rounded-full p-4 mb-4', step.color)}>
                <step.icon className={cn('h-8 w-8', step.iconColor)} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
