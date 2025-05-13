
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/db';

const LostDog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    lastSeenLocation: '',
    lastSeenDate: '',
    description: '',
    imageUrl: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add validation logic here
      if (!formData.lastSeenLocation || !formData.ownerPhone || !formData.imageUrl) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Save to our mock database
      db.addLostDog({
        name: formData.name,
        breed: formData.breed,
        lastSeenLocation: formData.lastSeenLocation,
        lastSeenDate: formData.lastSeenDate || new Date().toISOString().split('T')[0],
        description: formData.description,
        imageUrl: formData.imageUrl,
        ownerName: formData.ownerName,
        ownerEmail: formData.ownerEmail,
        ownerPhone: formData.ownerPhone,
      });
      
      toast({
        title: "Lost Dog Reported",
        description: "Your lost dog report has been submitted",
      });
      
      // Navigate to found dogs page
      navigate('/lost-found/found');
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to submit lost dog report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container-custom max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Report a Lost Dog</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Dog's Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange}
                        placeholder="Your dog's name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="breed">Breed</Label>
                      <Input 
                        id="breed" 
                        name="breed" 
                        value={formData.breed} 
                        onChange={handleInputChange}
                        placeholder="Your dog's breed" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lastSeenLocation">Last Seen Location*</Label>
                      <Input 
                        id="lastSeenLocation" 
                        name="lastSeenLocation" 
                        value={formData.lastSeenLocation} 
                        onChange={handleInputChange}
                        placeholder="Where was your dog last seen?"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastSeenDate">Last Seen Date</Label>
                      <Input 
                        id="lastSeenDate" 
                        name="lastSeenDate" 
                        type="date"
                        value={formData.lastSeenDate} 
                        onChange={handleInputChange}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange}
                      placeholder="Describe your dog (color, size, any distinctive features, collar, etc.)"
                      rows={4} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Dog Image*</Label>
                    <Input 
                      id="image" 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                    {formData.imageUrl && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                        <img 
                          src={formData.imageUrl} 
                          alt="Dog preview" 
                          className="w-40 h-40 object-cover rounded-md" 
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-medium mb-4">Your Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ownerName">Your Name</Label>
                        <Input 
                          id="ownerName" 
                          name="ownerName" 
                          value={formData.ownerName} 
                          onChange={handleInputChange}
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ownerEmail">Email</Label>
                        <Input 
                          id="ownerEmail" 
                          name="ownerEmail" 
                          type="email"
                          value={formData.ownerEmail} 
                          onChange={handleInputChange}
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="ownerPhone">Phone Number*</Label>
                      <Input 
                        id="ownerPhone" 
                        name="ownerPhone" 
                        value={formData.ownerPhone} 
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Report Lost Dog'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LostDog;
