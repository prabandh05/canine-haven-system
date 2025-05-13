
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/db';

const ReportHelp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    emergency: false,
    description: '',
    imageUrl: '',
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, emergency: checked }));
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
      if (!formData.location || !formData.description || !formData.reporterPhone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Save to our mock database
      db.addHelpReport({
        location: formData.location,
        emergency: formData.emergency,
        description: formData.description,
        imageUrl: formData.imageUrl || undefined, // Images are optional here
        reporterName: formData.reporterName,
        reporterEmail: formData.reporterEmail,
        reporterPhone: formData.reporterPhone,
      });
      
      toast({
        title: "Help Report Submitted",
        description: "Thank you for reporting a dog in need",
        variant: formData.emergency ? "destructive" : "default",
      });
      
      // Navigate back to home
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to submit help report. Please try again.",
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
              <CardTitle className="text-2xl">Report a Dog Needing Help</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location*</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleInputChange}
                      placeholder="Where is the dog located?"
                      required 
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="emergency"
                      checked={formData.emergency}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="emergency" className="text-red-500 font-medium">
                      This is an emergency situation
                    </Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description*</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange}
                      placeholder="Describe the dog's condition and what help is needed"
                      rows={4} 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Dog Image (Optional)</Label>
                    <Input 
                      id="image" 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
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
                    <h3 className="text-lg font-medium mb-4">Your Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="reporterName">Your Name</Label>
                        <Input 
                          id="reporterName" 
                          name="reporterName" 
                          value={formData.reporterName} 
                          onChange={handleInputChange}
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reporterEmail">Email</Label>
                        <Input 
                          id="reporterEmail" 
                          name="reporterEmail" 
                          type="email"
                          value={formData.reporterEmail} 
                          onChange={handleInputChange}
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="reporterPhone">Phone Number*</Label>
                      <Input 
                        id="reporterPhone" 
                        name="reporterPhone" 
                        value={formData.reporterPhone} 
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
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    variant={formData.emergency ? "destructive" : "default"}
                  >
                    {isSubmitting ? 'Submitting...' : 'Report Dog Needing Help'}
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

export default ReportHelp;
