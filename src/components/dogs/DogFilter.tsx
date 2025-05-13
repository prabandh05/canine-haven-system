
import React from 'react';
import { DogFilter } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface DogFilterProps {
  filters: DogFilter;
  setFilters: React.Dispatch<React.SetStateAction<DogFilter>>;
}

const DogFilterComponent = ({ filters, setFilters }: DogFilterProps) => {
  const handleSizeChange = (size: 'Small' | 'Medium' | 'Large') => {
    setFilters(prev => {
      const currentSizes = prev.size || [];
      if (currentSizes.includes(size)) {
        return {
          ...prev,
          size: currentSizes.filter(s => s !== size)
        };
      } else {
        return {
          ...prev,
          size: [...currentSizes, size]
        };
      }
    });
  };

  const handleGenderChange = (gender: 'Male' | 'Female') => {
    setFilters(prev => {
      const currentGenders = prev.gender || [];
      if (currentGenders.includes(gender)) {
        return {
          ...prev,
          gender: currentGenders.filter(g => g !== gender)
        };
      } else {
        return {
          ...prev,
          gender: [...currentGenders, gender]
        };
      }
    });
  };

  const handleAvailabilityChange = (available: boolean) => {
    setFilters(prev => ({
      ...prev,
      available: prev.available === available ? undefined : available
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Filter Dogs</h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Size</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="size-small" 
                checked={filters.size?.includes('Small')}
                onCheckedChange={() => handleSizeChange('Small')}
              />
              <Label htmlFor="size-small">Small</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="size-medium" 
                checked={filters.size?.includes('Medium')}
                onCheckedChange={() => handleSizeChange('Medium')}
              />
              <Label htmlFor="size-medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="size-large" 
                checked={filters.size?.includes('Large')}
                onCheckedChange={() => handleSizeChange('Large')}
              />
              <Label htmlFor="size-large">Large</Label>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Gender</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="gender-male" 
                checked={filters.gender?.includes('Male')}
                onCheckedChange={() => handleGenderChange('Male')}
              />
              <Label htmlFor="gender-male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="gender-female" 
                checked={filters.gender?.includes('Female')}
                onCheckedChange={() => handleGenderChange('Female')}
              />
              <Label htmlFor="gender-female">Female</Label>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Availability</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="available-yes" 
                checked={filters.available === true}
                onCheckedChange={() => handleAvailabilityChange(true)}
              />
              <Label htmlFor="available-yes">Available Dogs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="available-no" 
                checked={filters.available === false}
                onCheckedChange={() => handleAvailabilityChange(false)}
              />
              <Label htmlFor="available-no">Already Adopted</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogFilterComponent;
