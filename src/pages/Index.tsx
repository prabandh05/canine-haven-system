
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="py-10">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Dog Rescue System</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help us rescue, rehabilitate, and rehome dogs in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Adopt Section */}
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <CardHeader className="bg-rescue-primary text-white">
                <CardTitle className="text-center">Adopt</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4">Find your forever friend or help a dog find a new home.</p>
                <div className="grid grid-cols-1 gap-2">
                  <Link to="/adopt/give" className="w-full">
                    <Button variant="outline" className="w-full">Give Partner</Button>
                  </Link>
                  <Link to="/adopt/get" className="w-full">
                    <Button variant="outline" className="w-full">Get Partner</Button>
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Connect with dogs looking for homes</p>
              </CardFooter>
            </Card>

            {/* Rescue Section */}
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <CardHeader className="bg-rescue-secondary text-white">
                <CardTitle className="text-center">Rescue</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4">Help rescue stray and injured dogs in need.</p>
                <div className="grid grid-cols-1 gap-2">
                  <Link to="/rescue/report-stray" className="w-full">
                    <Button variant="outline" className="w-full">Report Stray</Button>
                  </Link>
                  <Link to="/rescue/adopt-stray" className="w-full">
                    <Button variant="outline" className="w-full">Adopt Stray</Button>
                  </Link>
                  <Link to="/rescue/report-help" className="w-full">
                    <Button variant="outline" className="w-full">Report Help</Button>
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Report strays or dogs needing help</p>
              </CardFooter>
            </Card>

            {/* Lost & Found Section */}
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <CardHeader className="bg-rescue-accent text-white">
                <CardTitle className="text-center">Lost & Found</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4">Report lost dogs or help reunite found dogs with their owners.</p>
                <div className="grid grid-cols-1 gap-2">
                  <Link to="/lost-found/lost" className="w-full">
                    <Button variant="outline" className="w-full">Lost Dog</Button>
                  </Link>
                  <Link to="/lost-found/found" className="w-full">
                    <Button variant="outline" className="w-full">Found Dog</Button>
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Connect lost dogs with their owners</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
