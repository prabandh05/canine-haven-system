
import React from 'react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: "Adopting from Paw Rescue was the best decision I ever made. My dog has brought so much joy to my life!",
    author: "Jessica M.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    dogName: "Max",
    color: "bg-blue-50",
  },
  {
    quote: "The team at Paw Rescue was incredibly helpful throughout the entire adoption process. They matched us with the perfect dog for our family.",
    author: "Michael R.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    dogName: "Bella",
    color: "bg-orange-50",
  },
  {
    quote: "I can't imagine life without my rescue dog. The support from Paw Rescue even after adoption has been amazing.",
    author: "Sarah T.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    dogName: "Charlie",
    color: "bg-purple-50",
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from happy families who have found their perfect companions through our rescue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className={cn("overflow-hidden animate-fade-in", testimonial.color)} style={{ animationDelay: `${index * 150}ms` }}>
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-rescue-primary mb-4 opacity-70" />
                <p className="mb-6 font-medium">{testimonial.quote}</p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">Adopted {testimonial.dogName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
