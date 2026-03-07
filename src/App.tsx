import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import LearnMore from "./pages/LearnMore";
import JoinUs from "./pages/JoinUs";
import EventDetails from "./pages/EventDetails";
import AwardDetails from "./pages/AwardDetails";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
          <div className="flex-grow w-full max-w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/learn-more" element={<LearnMore />} />
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/award/:id" element={<AwardDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;