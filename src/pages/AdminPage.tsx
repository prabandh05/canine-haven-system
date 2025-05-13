
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Eye, Edit, Trash, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { db, AdoptionDog, StrayDog, HelpReport, LostDog } from '@/lib/db';

const AdminPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('adoptionDogs');

  // State for each data type
  const [adoptionDogs, setAdoptionDogs] = useState<AdoptionDog[]>([]);
  const [strayDogs, setStrayDogs] = useState<StrayDog[]>([]);
  const [helpReports, setHelpReports] = useState<HelpReport[]>([]);
  const [lostDogs, setLostDogs] = useState<LostDog[]>([]);

  // Edit dialog states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEditData, setCurrentEditData] = useState<any>(null);
  const [editFieldValues, setEditFieldValues] = useState<Record<string, any>>({});

  // Delete confirmation dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: string} | null>(null);

  // Load data from local storage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAdoptionDogs(db.getAdoptionDogs());
    setStrayDogs(db.getStrayDogs());
    setHelpReports(db.getHelpReports());
    setLostDogs(db.getLostDogs());
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    toast({
      title: "Logged Out",
      description: "You've been logged out of the admin panel",
    });
    navigate('/admin/login');
  };

  // Edit handlers
  const handleEdit = (item: any, type: string) => {
    setCurrentEditData({ ...item, type });
    setEditFieldValues({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (field: string, value: any) => {
    setEditFieldValues(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSave = () => {
    if (!currentEditData) return;

    let success = false;
    const { id, type } = currentEditData;
    
    switch (type) {
      case 'adoptionDog':
        success = db.updateAdoptionDog(id, editFieldValues);
        break;
      case 'strayDog':
        success = db.updateStrayDog(id, editFieldValues);
        break;
      case 'helpReport':
        success = db.updateHelpReport(id, editFieldValues);
        break;
      case 'lostDog':
        success = db.updateLostDog(id, editFieldValues);
        break;
    }

    if (success) {
      toast({
        title: "Updated Successfully",
        description: `Item updated successfully`,
      });
      loadData(); // Reload data
    } else {
      toast({
        title: "Update Failed",
        description: "Failed to update item",
        variant: "destructive",
      });
    }

    setIsEditDialogOpen(false);
    setCurrentEditData(null);
  };

  // Delete handlers
  const handleDeleteClick = (id: string, type: string) => {
    setItemToDelete({ id, type });
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    let success = false;
    const { id, type } = itemToDelete;
    
    switch (type) {
      case 'adoptionDog':
        success = db.deleteAdoptionDog(id);
        break;
      case 'strayDog':
        success = db.deleteStrayDog(id);
        break;
      case 'helpReport':
        success = db.deleteHelpReport(id);
        break;
      case 'lostDog':
        success = db.deleteLostDog(id);
        break;
    }

    if (success) {
      toast({
        title: "Deleted Successfully",
        description: `Item deleted successfully`,
      });
      loadData(); // Reload data
    } else {
      toast({
        title: "Delete Failed",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }

    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // Render edit dialog content based on data type
  const renderEditDialogContent = () => {
    if (!currentEditData) return null;

    const { type } = currentEditData;
    
    switch (type) {
      case 'adoptionDog':
        return (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={editFieldValues.name || ''}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="breed" className="text-right">Breed</Label>
                <Input
                  id="breed"
                  value={editFieldValues.breed || ''}
                  onChange={(e) => handleEditChange('breed', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">Age</Label>
                <Input
                  id="age"
                  value={editFieldValues.age || ''}
                  onChange={(e) => handleEditChange('age', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">Gender</Label>
                <select
                  id="gender"
                  value={editFieldValues.gender || 'Male'}
                  onChange={(e) => handleEditChange('gender', e.target.value)}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea
                  id="description"
                  value={editFieldValues.description || ''}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactName" className="text-right">Contact Name</Label>
                <Input
                  id="contactName"
                  value={editFieldValues.contactName || ''}
                  onChange={(e) => handleEditChange('contactName', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactEmail" className="text-right">Contact Email</Label>
                <Input
                  id="contactEmail"
                  value={editFieldValues.contactEmail || ''}
                  onChange={(e) => handleEditChange('contactEmail', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactPhone" className="text-right">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={editFieldValues.contactPhone || ''}
                  onChange={(e) => handleEditChange('contactPhone', e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          </>
        );
      case 'strayDog':
        return (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input
                  id="location"
                  value={editFieldValues.location || ''}
                  onChange={(e) => handleEditChange('location', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea
                  id="description"
                  value={editFieldValues.description || ''}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reporterName" className="text-right">Reporter Name</Label>
                <Input
                  id="reporterName"
                  value={editFieldValues.reporterName || ''}
                  onChange={(e) => handleEditChange('reporterName', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reporterEmail" className="text-right">Reporter Email</Label>
                <Input
                  id="reporterEmail"
                  value={editFieldValues.reporterEmail || ''}
                  onChange={(e) => handleEditChange('reporterEmail', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reporterPhone" className="text-right">Reporter Phone</Label>
                <Input
                  id="reporterPhone"
                  value={editFieldValues.reporterPhone || ''}
                  onChange={(e) => handleEditChange('reporterPhone', e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          </>
        );
      case 'helpReport':
        return (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input
                  id="location"
                  value={editFieldValues.location || ''}
                  onChange={(e) => handleEditChange('location', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="emergency" className="text-right">Emergency</Label>
                <div className="col-span-3">
                  <input 
                    type="checkbox" 
                    id="emergency"
                    checked={!!editFieldValues.emergency}
                    onChange={(e) => handleEditChange('emergency', e.target.checked)}
                    className="mr-2"
                  />
                  <Label htmlFor="emergency">This is an emergency</Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea
                  id="description"
                  value={editFieldValues.description || ''}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reporterName" className="text-right">Reporter Name</Label>
                <Input
                  id="reporterName"
                  value={editFieldValues.reporterName || ''}
                  onChange={(e) => handleEditChange('reporterName', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reporterEmail" className="text-right">Reporter Email</Label>
                <Input
                  id="reporterEmail"
                  value={editFieldValues.reporterEmail || ''}
                  onChange={(e) => handleEditChange('reporterEmail', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reporterPhone" className="text-right">Reporter Phone</Label>
                <Input
                  id="reporterPhone"
                  value={editFieldValues.reporterPhone || ''}
                  onChange={(e) => handleEditChange('reporterPhone', e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          </>
        );
      case 'lostDog':
        return (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={editFieldValues.name || ''}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="breed" className="text-right">Breed</Label>
                <Input
                  id="breed"
                  value={editFieldValues.breed || ''}
                  onChange={(e) => handleEditChange('breed', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastSeenLocation" className="text-right">Last Seen Location</Label>
                <Input
                  id="lastSeenLocation"
                  value={editFieldValues.lastSeenLocation || ''}
                  onChange={(e) => handleEditChange('lastSeenLocation', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastSeenDate" className="text-right">Last Seen Date</Label>
                <Input
                  id="lastSeenDate"
                  value={editFieldValues.lastSeenDate || ''}
                  onChange={(e) => handleEditChange('lastSeenDate', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea
                  id="description"
                  value={editFieldValues.description || ''}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ownerName" className="text-right">Owner Name</Label>
                <Input
                  id="ownerName"
                  value={editFieldValues.ownerName || ''}
                  onChange={(e) => handleEditChange('ownerName', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ownerEmail" className="text-right">Owner Email</Label>
                <Input
                  id="ownerEmail"
                  value={editFieldValues.ownerEmail || ''}
                  onChange={(e) => handleEditChange('ownerEmail', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ownerPhone" className="text-right">Owner Phone</Label>
                <Input
                  id="ownerPhone"
                  value={editFieldValues.ownerPhone || ''}
                  onChange={(e) => handleEditChange('ownerPhone', e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          </>
        );
    }
  };

  // View Image Dialog
  const [viewImageUrl, setViewImageUrl] = useState<string | null>(null);
  
  const handleViewImage = (imageUrl: string) => {
    setViewImageUrl(imageUrl);
  };

  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut size={16} /> Logout
            </Button>
          </div>
          
          <Card className="bg-white rounded-lg shadow-md overflow-hidden">
            <Tabs defaultValue="adoptionDogs" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="adoptionDogs">Adoption Dogs</TabsTrigger>
                <TabsTrigger value="strayDogs">Stray Dogs</TabsTrigger>
                <TabsTrigger value="helpReports">Help Reports</TabsTrigger>
                <TabsTrigger value="lostDogs">Lost Dogs</TabsTrigger>
              </TabsList>
              
              {/* Adoption Dogs Tab */}
              <TabsContent value="adoptionDogs" className="p-4">
                <h2 className="text-xl font-semibold mb-4">Manage Adoption Dogs</h2>
                
                {adoptionDogs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No adoption dogs in the database</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Breed</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Gender</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Date Added</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {adoptionDogs.map((dog) => (
                          <TableRow key={dog.id}>
                            <TableCell className="font-mono">{dog.id.substring(0, 8)}...</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleViewImage(dog.imageUrl)}
                              >
                                <img 
                                  src={dog.imageUrl} 
                                  alt={dog.name} 
                                  className="h-10 w-10 object-cover rounded-md"
                                />
                              </Button>
                            </TableCell>
                            <TableCell className="font-medium">{dog.name}</TableCell>
                            <TableCell>{dog.breed}</TableCell>
                            <TableCell>{dog.age}</TableCell>
                            <TableCell>{dog.gender}</TableCell>
                            <TableCell>{dog.contactPhone}</TableCell>
                            <TableCell>{new Date(dog.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(dog, 'adoptionDog')}
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteClick(dog.id, 'adoptionDog')}
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
                )}
              </TabsContent>
              
              {/* Stray Dogs Tab */}
              <TabsContent value="strayDogs" className="p-4">
                <h2 className="text-xl font-semibold mb-4">Manage Stray Dogs</h2>
                
                {strayDogs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No stray dogs in the database</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Reporter</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Date Reported</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {strayDogs.map((dog) => (
                          <TableRow key={dog.id}>
                            <TableCell className="font-mono">{dog.id.substring(0, 8)}...</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleViewImage(dog.imageUrl)}
                              >
                                <img 
                                  src={dog.imageUrl} 
                                  alt="Stray dog" 
                                  className="h-10 w-10 object-cover rounded-md"
                                />
                              </Button>
                            </TableCell>
                            <TableCell>{dog.location}</TableCell>
                            <TableCell>{dog.reporterName || 'Anonymous'}</TableCell>
                            <TableCell>{dog.reporterPhone}</TableCell>
                            <TableCell>{new Date(dog.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(dog, 'strayDog')}
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteClick(dog.id, 'strayDog')}
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
                )}
              </TabsContent>
              
              {/* Help Reports Tab */}
              <TabsContent value="helpReports" className="p-4">
                <h2 className="text-xl font-semibold mb-4">Manage Help Reports</h2>
                
                {helpReports.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No help reports in the database</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Emergency</TableHead>
                          <TableHead>Reporter</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Date Reported</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {helpReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-mono">{report.id.substring(0, 8)}...</TableCell>
                            <TableCell>
                              {report.imageUrl ? (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleViewImage(report.imageUrl!)}
                                >
                                  <img 
                                    src={report.imageUrl} 
                                    alt="Help report" 
                                    className="h-10 w-10 object-cover rounded-md"
                                  />
                                </Button>
                              ) : (
                                <span className="text-gray-400">No image</span>
                              )}
                            </TableCell>
                            <TableCell>{report.location}</TableCell>
                            <TableCell>
                              <Badge variant={report.emergency ? "destructive" : "secondary"}>
                                {report.emergency ? 'YES' : 'No'}
                              </Badge>
                            </TableCell>
                            <TableCell>{report.reporterName || 'Anonymous'}</TableCell>
                            <TableCell>{report.reporterPhone}</TableCell>
                            <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(report, 'helpReport')}
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteClick(report.id, 'helpReport')}
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
                )}
              </TabsContent>
              
              {/* Lost Dogs Tab */}
              <TabsContent value="lostDogs" className="p-4">
                <h2 className="text-xl font-semibold mb-4">Manage Lost Dogs</h2>
                
                {lostDogs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No lost dogs in the database</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Breed</TableHead>
                          <TableHead>Last Seen</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Date Reported</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lostDogs.map((dog) => (
                          <TableRow key={dog.id}>
                            <TableCell className="font-mono">{dog.id.substring(0, 8)}...</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleViewImage(dog.imageUrl)}
                              >
                                <img 
                                  src={dog.imageUrl} 
                                  alt={dog.name} 
                                  className="h-10 w-10 object-cover rounded-md"
                                />
                              </Button>
                            </TableCell>
                            <TableCell className="font-medium">{dog.name || 'Unknown'}</TableCell>
                            <TableCell>{dog.breed || 'Unknown'}</TableCell>
                            <TableCell>{dog.lastSeenLocation}</TableCell>
                            <TableCell>{dog.ownerName || 'Anonymous'}</TableCell>
                            <TableCell>{dog.ownerPhone}</TableCell>
                            <TableCell>{new Date(dog.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(dog, 'lostDog')}
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteClick(dog.id, 'lostDog')}
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
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {currentEditData?.type.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</DialogTitle>
          </DialogHeader>
          
          {renderEditDialogContent()}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Image Dialog */}
      <Dialog open={!!viewImageUrl} onOpenChange={() => setViewImageUrl(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {viewImageUrl && (
            <div className="flex justify-center py-4">
              <img 
                src={viewImageUrl} 
                alt="Preview" 
                className="max-h-[500px] max-w-full object-contain rounded-md"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewImageUrl(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminPage;
