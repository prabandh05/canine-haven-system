
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero-section py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-rescue-dark">
              Find Your Forever Friend
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              We rescue, rehabilitate, and rehome dogs in need. Browse our available
              dogs and give a deserving pup a second chance at happiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/dogs">
                  Meet Our Dogs
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl animate-slide-in">
            <img
              alt="Happy dog with owner"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?q=80&w=2070&auto=format&fit=crop"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
