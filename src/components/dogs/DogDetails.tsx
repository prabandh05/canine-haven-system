
import React from 'react';
import { Dog } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DogDetailsProps {
  dog: Dog;
}

const DogDetails = ({ dog }: DogDetailsProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square overflow-hidden">
          <img 
            src={dog.imageUrl} 
            alt={`Photo of ${dog.name}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-rescue-dark">{dog.name}</h1>
            <Badge variant={dog.available ? "default" : "destructive"} className="text-sm py-1">
              {dog.available ? "Available" : "Adopted"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-sm text-muted-foreground">Breed</span>
              <p className="font-medium">{dog.breed}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Age</span>
              <p className="font-medium">{dog.age} {dog.age === 1 ? 'year' : 'years'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Gender</span>
              <p className="font-medium">{dog.gender}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Size</span>
              <p className="font-medium">{dog.size}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">About {dog.name}</h3>
            <p className="text-gray-700">{dog.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Health</h3>
            <div className="flex space-x-4">
              <div className="flex items-center">
                {dog.vaccinated ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-1" />
                )}
                <span>Vaccinated</span>
              </div>
              <div className="flex items-center">
                {dog.neutered ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-1" />
                )}
                <span>Neutered/Spayed</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Good with</h3>
            <div className="flex space-x-4">
              <div className="flex items-center">
                {dog.friendlyWith.children ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-1" />
                )}
                <span>Children</span>
              </div>
              <div className="flex items-center">
                {dog.friendlyWith.dogs ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-1" />
                )}
                <span>Dogs</span>
              </div>
              <div className="flex items-center">
                {dog.friendlyWith.cats ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-1" />
                )}
                <span>Cats</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Adoption Fee</h3>
            <p className="text-xl font-semibold text-rescue-primary">${dog.adoptionFee}</p>
          </div>
          
          {dog.available ? (
            <Button asChild size="lg" className="w-full">
              <Link to={`/adopt/${dog.id}`}>Apply to Adopt</Link>
            </Button>
          ) : (
            <Button variant="secondary" disabled size="lg" className="w-full">
              Already Adopted
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DogDetails;
