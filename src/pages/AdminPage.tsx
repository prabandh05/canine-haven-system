
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockDogs, mockApplications } from '@/data/mockData';
import { Eye, Edit, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dogs');
  
  const handleUpdateStatus = (id: string, newStatus: 'Pending' | 'Approved' | 'Rejected') => {
    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}`,
    });
  };
  
  const handleDeleteDog = (id: string) => {
    toast({
      title: "Action Required",
      description: "This feature will be implemented with backend integration.",
    });
  };
  
  const handleEditDog = (id: string) => {
    toast({
      title: "Action Required",
      description: "This feature will be implemented with backend integration.",
    });
  };
  
  const handleViewDog = (id: string) => {
    // In a real app, we would redirect to the dog details page
    window.open(`/dogs/${id}`, '_blank');
  };

  return (
    <Layout>
      <div className="py-8 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Tabs defaultValue="dogs" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="dogs">Manage Dogs</TabsTrigger>
                <TabsTrigger value="applications">Adoption Applications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dogs" className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Dog Listings</h2>
                  <Button>Add New Dog</Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Breed</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDogs.map((dog) => (
                        <TableRow key={dog.id}>
                          <TableCell className="font-mono">{dog.id}</TableCell>
                          <TableCell className="font-medium">{dog.name}</TableCell>
                          <TableCell>{dog.breed}</TableCell>
                          <TableCell>{dog.age} {dog.age === 1 ? 'year' : 'years'}</TableCell>
                          <TableCell>{dog.gender}</TableCell>
                          <TableCell>
                            <Badge variant={dog.available ? "default" : "secondary"}>
                              {dog.available ? "Available" : "Adopted"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDog(dog.id)}
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditDog(dog.id)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteDog(dog.id)}
                                title="Delete"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="applications" className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Adoption Applications</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Dog</TableHead>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockApplications.map((app) => {
                        const dog = mockDogs.find(d => d.id === app.dogId);
                        return (
                          <TableRow key={app.id}>
                            <TableCell className="font-mono">{app.id}</TableCell>
                            <TableCell>{dog?.name || "Unknown"}</TableCell>
                            <TableCell>{app.applicantName}</TableCell>
                            <TableCell>{app.applicantEmail}</TableCell>
                            <TableCell>{app.createdAt.toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  app.status === 'Approved'
                                    ? 'default'
                                    : app.status === 'Rejected'
                                    ? 'destructive'
                                    : 'secondary'
                                }
                              >
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs"
                                  onClick={() => handleUpdateStatus(app.id, 'Approved')}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs"
                                  onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                                >
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
