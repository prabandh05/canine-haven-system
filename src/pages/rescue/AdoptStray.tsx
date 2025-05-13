
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { db, StrayDog } from '@/lib/db';

const AdoptStray = () => {
  const navigate = useNavigate();
  const [strayDogs, setStrayDogs] = useState<StrayDog[]>(() => db.getStrayDogs());
  const [selectedDog, setSelectedDog] = useState<StrayDog | null>(null);

  return (
    <Layout>
      <div className="py-8">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Stray Dogs Needing Homes</h1>
            <Button onClick={() => navigate('/rescue/report-stray')}>Report a Stray Dog</Button>
          </div>

          {strayDogs.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="py-12">
                <h3 className="text-xl font-medium mb-2">No stray dogs reported</h3>
                <p className="text-muted-foreground mb-6">Report a stray dog to help them find a home</p>
                <Button onClick={() => navigate('/rescue/report-stray')}>Report a Stray Dog</Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strayDogs.map(dog => (
                <StrayDogCard key={dog.id} dog={dog} onSelect={setSelectedDog} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <StrayDogDetailsDialog dog={selectedDog} open={!!selectedDog} onClose={() => setSelectedDog(null)} />
    </Layout>
  );
};

interface StrayDogCardProps {
  dog: StrayDog;
  onSelect: (dog: StrayDog) => void;
}

const StrayDogCard: React.FC<StrayDogCardProps> = ({ dog, onSelect }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square">
        <img 
          src={dog.imageUrl} 
          alt="Stray dog"
          className="absolute inset-0 w-full h-full object-cover" 
        />
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="text-xl font-semibold mb-2">Stray Dog</h3>
        <div className="text-sm text-muted-foreground mb-4">
          <p>Location: {dog.location}</p>
          <p>Reported: {new Date(dog.createdAt).toLocaleDateString()}</p>
        </div>
        <p className="line-clamp-3 mb-4 text-sm">{dog.description}</p>
        <Button onClick={() => onSelect(dog)} className="w-full">
          Help This Dog
        </Button>
      </CardContent>
    </Card>
  );
};

interface StrayDogDetailsDialogProps {
  dog: StrayDog | null;
  open: boolean;
  onClose: () => void;
}

const StrayDogDetailsDialog: React.FC<StrayDogDetailsDialogProps> = ({ dog, open, onClose }) => {
  if (!dog) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Information for Stray Dog</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 font-medium">Location:</div>
            <div className="col-span-3">{dog.location}</div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 font-medium">Reporter:</div>
            <div className="col-span-3">{dog.reporterName || 'Anonymous'}</div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 font-medium">Email:</div>
            <div className="col-span-3">
              {dog.reporterEmail ? (
                <a href={`mailto:${dog.reporterEmail}`} className="text-blue-600 hover:underline">
                  {dog.reporterEmail}
                </a>
              ) : (
                'Not provided'
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 font-medium">Phone:</div>
            <div className="col-span-3">
              <a href={`tel:${dog.reporterPhone}`} className="text-blue-600 hover:underline">
                {dog.reporterPhone}
              </a>
            </div>
          </div>

          <div className="my-2 border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Please contact the reporter to coordinate helping this stray dog. Thank you for your compassion!
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdoptStray;
