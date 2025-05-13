
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, PawPrint, Home, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Paw Rescue</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're dedicated to finding loving forever homes for dogs in need and providing support throughout their journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                alt="Dogs at rescue center" 
                className="w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Paw Rescue, our mission is to rescue, rehabilitate, and rehome abandoned, neglected, and unwanted dogs. We believe every dog deserves a loving home where they can thrive and be cherished as family members.
              </p>
              <p className="text-gray-700 mb-4">
                Founded in 2015, our organization has helped over 1,000 dogs find their forever homes. We operate through a network of dedicated volunteers and foster families who provide temporary care until permanent homes are found.
              </p>
              <p className="text-gray-700">
                Beyond adoption, we strive to educate the community about responsible pet ownership, the importance of spaying/neutering, and the joy that comes from giving a second chance to a rescue dog.
              </p>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">What We Do</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-blue-50 border-none">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-rescue-primary/20 flex items-center justify-center mb-4">
                    <PawPrint className="h-8 w-8 text-rescue-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Rescue</h3>
                  <p className="text-gray-700">
                    We rescue dogs from high-kill shelters, abandonment situations, and owner surrenders.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50 border-none">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-rescue-secondary/20 flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-rescue-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Rehabilitate</h3>
                  <p className="text-gray-700">
                    We provide veterinary care, training, and socialization to prepare dogs for their new homes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-none">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-rescue-accent/20 flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-rescue-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Rehome</h3>
                  <p className="text-gray-700">
                    We carefully match dogs with loving, responsible adopters for their forever homes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-none">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Educate</h3>
                  <p className="text-gray-700">
                    We promote responsible pet ownership and the benefits of adopting rescue dogs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop"
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">Sarah Johnson</h3>
                <p className="text-gray-500 mb-2">Founder & Director</p>
                <p className="text-sm text-gray-600">
                  Sarah founded Paw Rescue after 15 years working as a veterinary technician. Her passion for animal welfare drives our mission.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                    alt="Mark Thompson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">Mark Thompson</h3>
                <p className="text-gray-500 mb-2">Rescue Coordinator</p>
                <p className="text-sm text-gray-600">
                  Mark manages our rescue operations and coordinates with shelters and animal control agencies.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                    alt="Lisa Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">Lisa Chen</h3>
                <p className="text-gray-500 mb-2">Adoption Specialist</p>
                <p className="text-sm text-gray-600">
                  Lisa oversees our adoption process, ensuring the right match between dogs and their new families.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-center">Our Values</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                  <p className="text-gray-700 mb-6">
                    We treat every animal with kindness and respect, recognizing their individual needs and personalities.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                  <p className="text-gray-700">
                    We operate with transparency and honesty in all our actions and communications.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Responsibility</h3>
                  <p className="text-gray-700 mb-6">
                    We promote responsible pet ownership and make thoughtful decisions for the welfare of our animals.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-gray-700">
                    We build a supportive network of volunteers, adopters, and supporters who share our passion for animal welfare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
