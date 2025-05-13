
// Mock database using localStorage
export type AdoptionDog = {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  description: string;
  imageUrl: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
}

export type StrayDog = {
  id: string;
  location: string;
  description: string;
  imageUrl: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
  createdAt: string;
}

export type HelpReport = {
  id: string;
  location: string;
  emergency: boolean;
  description: string;
  imageUrl?: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
  createdAt: string;
}

export type LostDog = {
  id: string;
  name: string;
  breed: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  description: string;
  imageUrl: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  createdAt: string;
}

// Mock database functions
const getCollection = <T>(collectionName: string): T[] => {
  const data = localStorage.getItem(collectionName);
  return data ? JSON.parse(data) : [];
};

const saveCollection = <T>(collectionName: string, data: T[]): void => {
  localStorage.setItem(collectionName, JSON.stringify(data));
};

export const db = {
  // Adoption Dogs (Give Partner -> Get Partner)
  getAdoptionDogs: (): AdoptionDog[] => getCollection<AdoptionDog>('adoptionDogs'),
  addAdoptionDog: (dog: Omit<AdoptionDog, 'id' | 'createdAt'>): AdoptionDog => {
    const dogs = getCollection<AdoptionDog>('adoptionDogs');
    const newDog = {
      ...dog,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    saveCollection('adoptionDogs', [...dogs, newDog]);
    return newDog;
  },
  updateAdoptionDog: (id: string, data: Partial<Omit<AdoptionDog, 'id' | 'createdAt'>>): boolean => {
    const dogs = getCollection<AdoptionDog>('adoptionDogs');
    const index = dogs.findIndex(dog => dog.id === id);
    
    if (index === -1) return false;
    
    dogs[index] = { ...dogs[index], ...data };
    saveCollection('adoptionDogs', dogs);
    return true;
  },
  deleteAdoptionDog: (id: string): boolean => {
    const dogs = getCollection<AdoptionDog>('adoptionDogs');
    const filteredDogs = dogs.filter(dog => dog.id !== id);
    
    if (filteredDogs.length === dogs.length) return false;
    
    saveCollection('adoptionDogs', filteredDogs);
    return true;
  },
  
  // Stray Dogs (Report Stray -> Adopt Stray)
  getStrayDogs: (): StrayDog[] => getCollection<StrayDog>('strayDogs'),
  addStrayDog: (dog: Omit<StrayDog, 'id' | 'createdAt'>): StrayDog => {
    const dogs = getCollection<StrayDog>('strayDogs');
    const newDog = {
      ...dog,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    saveCollection('strayDogs', [...dogs, newDog]);
    return newDog;
  },
  updateStrayDog: (id: string, data: Partial<Omit<StrayDog, 'id' | 'createdAt'>>): boolean => {
    const dogs = getCollection<StrayDog>('strayDogs');
    const index = dogs.findIndex(dog => dog.id === id);
    
    if (index === -1) return false;
    
    dogs[index] = { ...dogs[index], ...data };
    saveCollection('strayDogs', dogs);
    return true;
  },
  deleteStrayDog: (id: string): boolean => {
    const dogs = getCollection<StrayDog>('strayDogs');
    const filteredDogs = dogs.filter(dog => dog.id !== id);
    
    if (filteredDogs.length === dogs.length) return false;
    
    saveCollection('strayDogs', filteredDogs);
    return true;
  },
  
  // Help Reports
  getHelpReports: (): HelpReport[] => getCollection<HelpReport>('helpReports'),
  addHelpReport: (report: Omit<HelpReport, 'id' | 'createdAt'>): HelpReport => {
    const reports = getCollection<HelpReport>('helpReports');
    const newReport = {
      ...report,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    saveCollection('helpReports', [...reports, newReport]);
    return newReport;
  },
  updateHelpReport: (id: string, data: Partial<Omit<HelpReport, 'id' | 'createdAt'>>): boolean => {
    const reports = getCollection<HelpReport>('helpReports');
    const index = reports.findIndex(report => report.id === id);
    
    if (index === -1) return false;
    
    reports[index] = { ...reports[index], ...data };
    saveCollection('helpReports', reports);
    return true;
  },
  deleteHelpReport: (id: string): boolean => {
    const reports = getCollection<HelpReport>('helpReports');
    const filteredReports = reports.filter(report => report.id !== id);
    
    if (filteredReports.length === reports.length) return false;
    
    saveCollection('helpReports', filteredReports);
    return true;
  },
  
  // Lost Dogs (Lost Dog -> Found Dog)
  getLostDogs: (): LostDog[] => getCollection<LostDog>('lostDogs'),
  addLostDog: (dog: Omit<LostDog, 'id' | 'createdAt'>): LostDog => {
    const dogs = getCollection<LostDog>('lostDogs');
    const newDog = {
      ...dog,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    saveCollection('lostDogs', [...dogs, newDog]);
    return newDog;
  },
  updateLostDog: (id: string, data: Partial<Omit<LostDog, 'id' | 'createdAt'>>): boolean => {
    const dogs = getCollection<LostDog>('lostDogs');
    const index = dogs.findIndex(dog => dog.id === id);
    
    if (index === -1) return false;
    
    dogs[index] = { ...dogs[index], ...data };
    saveCollection('lostDogs', dogs);
    return true;
  },
  deleteLostDog: (id: string): boolean => {
    const dogs = getCollection<LostDog>('lostDogs');
    const filteredDogs = dogs.filter(dog => dog.id !== id);
    
    if (filteredDogs.length === dogs.length) return false;
    
    saveCollection('lostDogs', filteredDogs);
    return true;
  }
};
