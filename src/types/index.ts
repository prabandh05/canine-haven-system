
export interface Dog {
  id: string;
  name: string;
  age: number;
  breed: string;
  gender: 'Male' | 'Female';
  size: 'Small' | 'Medium' | 'Large';
  description: string;
  imageUrl: string;
  available: boolean;
  vaccinated: boolean;
  neutered: boolean;
  friendlyWith: {
    children: boolean;
    dogs: boolean;
    cats: boolean;
  };
  adoptionFee: number;
  createdAt: Date;
}

export interface AdoptionApplication {
  id: string;
  dogId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantAddress: string;
  homeType: 'House' | 'Apartment' | 'Condo' | 'Other';
  hasYard: boolean;
  otherPets: string;
  experience: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'User';
}

export type DogFilter = {
  size?: ('Small' | 'Medium' | 'Large')[];
  gender?: ('Male' | 'Female')[];
  available?: boolean;
}
