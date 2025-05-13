
import React from 'react';
import { Dog } from '@/types';
import { Button } from '@/components/ui/button';
import DogCard from '@/components/dogs/DogCard';
import { Link } from 'react-router-dom';

interface FeaturedDogsProps {
  dogs: Dog[];
}

const FeaturedDogs = ({ dogs }: FeaturedDogsProps) => {
  const availableDogs = dogs.filter(dog => dog.available);
  const featuredDogs = availableDogs.slice(0, 3);

  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Dogs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These lovable pups are waiting for their forever homes. Each one has a unique
            personality and story to share.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/dogs">
              See All Available Dogs
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDogs;
