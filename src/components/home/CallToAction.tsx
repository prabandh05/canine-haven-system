
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="py-16 bg-rescue-primary">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Change a Life?</h2>
            <p className="text-lg opacity-90 mb-6">
              By adopting, you're not just bringing home a pet, you're saving a life and making room for another dog to be rescued.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="secondary" size="lg">
                <Link to="/dogs">
                  Adopt a Dog
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" size="lg">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-xl max-w-sm">
              <img
                src="https://images.unsplash.com/photo-1553736026-ff14d994c75c?q=80&w=1974&auto=format&fit=crop"
                alt="Happy dog with new owner"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
