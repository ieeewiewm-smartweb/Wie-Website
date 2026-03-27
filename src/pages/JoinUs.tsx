
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Construction, Mail } from "lucide-react";
import { useEffect } from "react";

const JoinUs = () => {
  useEffect(() => {
    // Multiple redirect attempts for maximum compatibility
    const redirect = () => {
      try {
        // Method 1: Direct assignment
        window.location = "https://ieeesousb-19feb.vercel.app/join";
      } catch (e) {
        try {
          // Method 2: href assignment
          window.location.href = "https://ieeesousb-19feb.vercel.app/join";
        } catch (e2) {
          // Method 3: replace
          window.location.replace("https://ieeesousb-19feb.vercel.app/join");
        }
      }
    };
    
    // Immediate redirect
    redirect();
    
    // Backup redirect after 500ms
    const timer = setTimeout(redirect, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // This will only render briefly before redirect
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Construction className="h-24 w-24 text-purple-800 mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold text-purple-800 mb-4">Redirecting you...</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          Taking you to the IEEE SOU join page. If you're not redirected automatically, please click the button below.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="bg-purple-700 hover:bg-purple-800" onClick={() => {
            window.location.href = "https://ieeesousb-19feb.vercel.app/join";
          }}>
            <Mail className="h-4 w-4 mr-2" />
            Go to Join Page
          </Button>
          
          <Button variant="outline" className="border-purple-300" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
