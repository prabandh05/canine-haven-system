
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Dog } from '@/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  applicantName: z.string().min(2, { message: 'Name is required' }),
  applicantEmail: z.string().email({ message: 'Valid email is required' }),
  applicantPhone: z.string().min(5, { message: 'Phone number is required' }),
  applicantAddress: z.string().min(5, { message: 'Address is required' }),
  homeType: z.enum(['House', 'Apartment', 'Condo', 'Other'], { 
    required_error: 'Please select a home type' 
  }),
  hasYard: z.boolean().default(false),
  otherPets: z.string(),
  experience: z.string(),
  reason: z.string().min(20, { message: 'Please provide a detailed reason for wanting to adopt' }),
});

type FormValues = z.infer<typeof formSchema>;

interface AdoptionFormProps {
  dog: Dog;
  onSubmitSuccess?: () => void;
}

const AdoptionForm = ({ dog, onSubmitSuccess }: AdoptionFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      applicantAddress: '',
      homeType: 'House',
      hasYard: false,
      otherPets: '',
      experience: '',
      reason: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log('Form submitted:', data);
    
    // In a real app, this would be an API call to submit the application
    // For now we'll simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: `Thank you for applying to adopt ${dog.name}! We'll review your application and contact you soon.`,
      });
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Adoption Application for {dog.name}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="applicantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicantEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicantPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicantAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your home address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="homeType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What type of home do you live in?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="House" id="house" />
                      <Label htmlFor="house">House</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Apartment" id="apartment" />
                      <Label htmlFor="apartment">Apartment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Condo" id="condo" />
                      <Label htmlFor="condo">Condo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="other-home" />
                      <Label htmlFor="other-home">Other</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasYard"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Do you have a fenced yard?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otherPets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have other pets? If yes, please list them.</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., 2 cats, 1 dog, etc."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What experience do you have with dogs?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please describe your experience with dogs, if any."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Why do you want to adopt this dog?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please tell us why you want to adopt this dog and how you plan to care for them."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full md:w-auto">
              Submit Application
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdoptionForm;
