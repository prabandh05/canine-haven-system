
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DogDetails from '@/components/dogs/DogDetails';
import { mockDogs } from '@/data/mockData';
import { Dog } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const DogDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dog, setDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, we would fetch the dog data from an API
    const fetchDog = () => {
      setLoading(true);
      setTimeout(() => {
        const foundDog = mockDogs.find(dog => dog.id === id);
        setDog(foundDog || null);
        setLoading(false);
      }, 300);
    };

    fetchDog();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-8 bg-gray-50">
          <div className="container-custom">
            <div className="flex justify-center items-center min-h-[500px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rescue-primary"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!dog) {
    return (
      <Layout>
        <div className="py-8 bg-gray-50">
          <div className="container-custom">
            <div className="text-center p-8">
              <h1 className="text-3xl font-bold mb-4">Dog Not Found</h1>
              <p className="text-lg text-gray-600 mb-6">
                We couldn't find the dog you're looking for.
              </p>
              <Button onClick={handleBack}>Go Back</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container-custom">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 inline-flex items-center"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to dogs
          </Button>
          
          <DogDetails dog={dog} />
        </div>
      </div>
    </Layout>
  );
};

export default DogDetailsPage;
