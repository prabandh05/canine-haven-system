
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import GivePartner from "./pages/adopt/GivePartner";
import GetPartner from "./pages/adopt/GetPartner";
import ReportStray from "./pages/rescue/ReportStray";
import AdoptStray from "./pages/rescue/AdoptStray";
import ReportHelp from "./pages/rescue/ReportHelp";
import LostDog from "./pages/lost-found/LostDog";
import FoundDog from "./pages/lost-found/FoundDog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth state
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            
            {/* Adopt section routes */}
            <Route path="/adopt/give" element={<ProtectedRoute><GivePartner /></ProtectedRoute>} />
            <Route path="/adopt/get" element={<ProtectedRoute><GetPartner /></ProtectedRoute>} />
            
            {/* Rescue section routes */}
            <Route path="/rescue/report-stray" element={<ProtectedRoute><ReportStray /></ProtectedRoute>} />
            <Route path="/rescue/adopt-stray" element={<ProtectedRoute><AdoptStray /></ProtectedRoute>} />
            <Route path="/rescue/report-help" element={<ProtectedRoute><ReportHelp /></ProtectedRoute>} />
            
            {/* Lost & Found section routes */}
            <Route path="/lost-found/lost" element={<ProtectedRoute><LostDog /></ProtectedRoute>} />
            <Route path="/lost-found/found" element={<ProtectedRoute><FoundDog /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
