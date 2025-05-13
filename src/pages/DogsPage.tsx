
import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import DogCard from '@/components/dogs/DogCard';
import DogFilterComponent from '@/components/dogs/DogFilter';
import { mockDogs } from '@/data/mockData';
import { DogFilter } from '@/types';

const DogsPage = () => {
  const [filters, setFilters] = useState<DogFilter>({});

  const filteredDogs = useMemo(() => {
    return mockDogs.filter(dog => {
      // Filter by size
      if (filters.size && filters.size.length > 0) {
        if (!filters.size.includes(dog.size)) {
          return false;
        }
      }

      // Filter by gender
      if (filters.gender && filters.gender.length > 0) {
        if (!filters.gender.includes(dog.gender)) {
          return false;
        }
      }

      // Filter by availability
      if (filters.available !== undefined) {
        if (dog.available !== filters.available) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Available Dogs</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our wonderful dogs waiting for their forever homes. Each one has their own unique personality and story.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-20">
                <DogFilterComponent filters={filters} setFilters={setFilters} />
              </div>
            </div>
            
            <div className="md:col-span-3">
              {filteredDogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDogs.map(dog => (
                    <DogCard key={dog.id} dog={dog} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <h3 className="text-xl font-semibold mb-2">No dogs found</h3>
                  <p className="text-gray-600">
                    No dogs match your current filter criteria. Please try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DogsPage;
