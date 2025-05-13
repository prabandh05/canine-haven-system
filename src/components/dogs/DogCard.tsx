
import { Dog } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface DogCardProps {
  dog: Dog;
}

const DogCard = ({ dog }: DogCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={dog.imageUrl}
          alt={`Photo of ${dog.name}`}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
        {!dog.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg py-2 px-4">Adopted</Badge>
          </div>
        )}
      </div>
      <CardContent className="flex-grow pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">{dog.name}</h3>
          <Badge variant={dog.available ? "default" : "outline"}>{dog.available ? "Available" : "Adopted"}</Badge>
        </div>
        <div className="text-sm text-muted-foreground space-y-1 mb-4">
          <p>{dog.breed}</p>
          <p>{dog.age} {dog.age === 1 ? 'year' : 'years'} old • {dog.gender}</p>
          <p>{dog.size} Size</p>
        </div>
        <p className="line-clamp-3 text-sm">
          {dog.description}
        </p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button asChild className="w-full">
          <Link to={`/dogs/${dog.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DogCard;
