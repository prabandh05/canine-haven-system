
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { db, AdoptionDog } from '@/lib/db';

const GetPartner = () => {
  const navigate = useNavigate();
  const [dogs, setDogs] = useState<AdoptionDog[]>(() => db.getAdoptionDogs());
  const [selectedDog, setSelectedDog] = useState<AdoptionDog | null>(null);

  return (
    <Layout>
      <div className="py-8">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Available Dogs for Adoption</h1>
            <Button onClick={() => navigate('/adopt/give')}>Add Dog for Adoption</Button>
          </div>

          {dogs.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="py-12">
                <h3 className="text-xl font-medium mb-2">No dogs available for adoption</h3>
                <p className="text-muted-foreground mb-6">Be the first to add a dog for adoption!</p>
                <Button onClick={() => navigate('/adopt/give')}>Add Dog for Adoption</Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dogs.map(dog => (
                <DogCard key={dog.id} dog={dog} onSelect={setSelectedDog} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <DogContactDialog dog={selectedDog} open={!!selectedDog} onClose={() => setSelectedDog(null)} />
    </Layout>
  );
};

interface DogCardProps {
  dog: AdoptionDog;
  onSelect: (dog: AdoptionDog) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onSelect }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square">
        <img 
          src={dog.imageUrl} 
          alt={dog.name}
          className="absolute inset-0 w-full h-full object-cover" 
        />
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="text-xl font-semibold mb-2">{dog.name}</h3>
        <div className="text-sm text-muted-foreground mb-4 space-y-1">
          <p>Breed: {dog.breed || 'Unknown'}</p>
          <p>Age: {dog.age || 'Unknown'}</p>
          <p>Gender: {dog.gender || 'Unknown'}</p>
        </div>
        <p className="line-clamp-3 mb-4 text-sm">{dog.description}</p>
        <Button onClick={() => onSelect(dog)} className="w-full">
          Adopt Me
        </Button>
      </CardContent>
    </Card>
  );
};

interface DogContactDialogProps {
  dog: AdoptionDog | null;
  open: boolean;
  onClose: () => void;
}

const DogContactDialog: React.FC<DogContactDialogProps> = ({ dog, open, onClose }) => {
  if (!dog) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Information for {dog.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 font-medium">Name:</div>
            <div className="col-span-3">{dog.contactName || 'Not provided'}</div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 font-medium">Email:</div>
            <div className="col-span-3">
              {dog.contactEmail ? (
                <a href={`mailto:${dog.contactEmail}`} className="text-blue-600 hover:underline">
                  {dog.contactEmail}
                </a>
              ) : (
                'Not provided'
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 font-medium">Phone:</div>
            <div className="col-span-3">
              <a href={`tel:${dog.contactPhone}`} className="text-blue-600 hover:underline">
                {dog.contactPhone}
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GetPartner;
