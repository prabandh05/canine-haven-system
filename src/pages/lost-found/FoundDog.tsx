
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { db, LostDog } from '@/lib/db';

const FoundDog = () => {
  const navigate = useNavigate();
  const [lostDogs, setLostDogs] = useState<LostDog[]>(() => db.getLostDogs());
  const [selectedDog, setSelectedDog] = useState<LostDog | null>(null);

  return (
    <Layout>
      <div className="py-8">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Lost Dogs</h1>
            <Button onClick={() => navigate('/lost-found/lost')}>Report a Lost Dog</Button>
          </div>

          {lostDogs.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="py-12">
                <h3 className="text-xl font-medium mb-2">No lost dogs reported</h3>
                <p className="text-muted-foreground mb-6">Lost your dog? Report it to help find them.</p>
                <Button onClick={() => navigate('/lost-found/lost')}>Report a Lost Dog</Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lostDogs.map(dog => (
                <LostDogCard key={dog.id} dog={dog} onSelect={setSelectedDog} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <LostDogDetailsDialog dog={selectedDog} open={!!selectedDog} onClose={() => setSelectedDog(null)} />
    </Layout>
  );
};

interface LostDogCardProps {
  dog: LostDog;
  onSelect: (dog: LostDog) => void;
}

const LostDogCard: React.FC<LostDogCardProps> = ({ dog, onSelect }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square">
        <img 
          src={dog.imageUrl} 
          alt={dog.name || 'Lost dog'}
          className="absolute inset-0 w-full h-full object-cover" 
        />
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="text-xl font-semibold mb-2">{dog.name || 'Lost Dog'}</h3>
        <div className="text-sm text-muted-foreground mb-4 space-y-1">
          <p>Breed: {dog.breed || 'Unknown'}</p>
          <p>Last seen: {dog.lastSeenLocation}</p>
          <p>Date: {new Date(dog.lastSeenDate).toLocaleDateString()}</p>
        </div>
        <p className="line-clamp-3 mb-4 text-sm">{dog.description}</p>
        <Button onClick={() => onSelect(dog)} className="w-full">
          I've Seen This Dog
        </Button>
      </CardContent>
    </Card>
  );
};

interface LostDogDetailsDialogProps {
  dog: LostDog | null;
  open: boolean;
  onClose: () => void;
}

const LostDogDetailsDialog: React.FC<LostDogDetailsDialogProps> = ({ dog, open, onClose }) => {
  if (!dog) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Owner of {dog.name || 'Lost Dog'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 font-medium">Owner:</div>
            <div className="col-span-3">{dog.ownerName || 'Not provided'}</div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 font-medium">Email:</div>
            <div className="col-span-3">
              {dog.ownerEmail ? (
                <a href={`mailto:${dog.ownerEmail}`} className="text-blue-600 hover:underline">
                  {dog.ownerEmail}
                </a>
              ) : (
                'Not provided'
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 font-medium">Phone:</div>
            <div className="col-span-3">
              <a href={`tel:${dog.ownerPhone}`} className="text-blue-600 hover:underline">
                {dog.ownerPhone}
              </a>
            </div>
          </div>

          <div className="my-2 border-t pt-4">
            <p className="text-sm text-muted-foreground">
              If you've seen this dog, please contact the owner immediately. Thank you for your help!
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

export default FoundDog;
