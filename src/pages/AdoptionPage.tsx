
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdoptionForm from '@/components/adoption/AdoptionForm';
import { mockDogs } from '@/data/mockData';
import { Dog } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AdoptionPage = () => {
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
    navigate(`/dogs/${id}`);
  };

  const handleSubmitSuccess = () => {
    // In a real app, we would navigate to a thank you page or show a success message
    setTimeout(() => {
      navigate('/');
    }, 2000);
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
              <Button onClick={() => navigate('/dogs')}>Browse Dogs</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!dog.available) {
    return (
      <Layout>
        <div className="py-8 bg-gray-50">
          <div className="container-custom">
            <div className="text-center p-8">
              <h1 className="text-3xl font-bold mb-4">Dog Not Available</h1>
              <p className="text-lg text-gray-600 mb-6">
                We're sorry, but {dog.name} is no longer available for adoption.
              </p>
              <Button onClick={() => navigate('/dogs')}>Browse Other Dogs</Button>
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
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to {dog.name}'s Profile
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={dog.imageUrl} 
                  alt={dog.name} 
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{dog.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">{dog.breed} • {dog.age} {dog.age === 1 ? 'year' : 'years'} old</p>
                  <p className="text-sm line-clamp-3">{dog.description}</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <AdoptionForm dog={dog} onSubmitSuccess={handleSubmitSuccess} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdoptionPage;
