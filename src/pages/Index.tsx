import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/EventCard";
import AwardCard from "@/components/AwardCard";
import { useEvents } from "@/hooks/useEvents";
import { useAwards } from "@/hooks/useAwards";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import RecentEventSlider from "@/components/RecentEventSlider";
import { Link } from "react-router-dom";
import { Calendar as CalendarIcon, Award as AwardIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import BlackNavbar from "@/components/BlackNavbar";
import AdminLogin from "@/components/AdminLogin";
import LeadershipSpotlight from "@/components/LeadershipSpotlight";
import CountUpSection from "@/components/CountUpSection";
import OpportunitiesSection from "@/components/OpportunitiesSection";
import { motion } from "framer-motion";

const parseDate = (dateString: string): Date => {
  const cleanedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1"); // Remove ordinal suffix
  const parsedDate = new Date(cleanedDateString);
  return isNaN(parsedDate.getTime()) ? new Date(0) : parsedDate; // Default to 1970 if invalid
};


const Index = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<"recent" | "awards">("recent");
  const { events } = useEvents();
  const { awards } = useAwards();

  // Scroll-reveal animation hook for fade-in and slide-up effect
  const eventRefsForAnimation = useScrollReveal({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    staggerDelay: 100, // faster stagger between cards
  });

  // Deduplicate and sort events before using carousel logic
  const sortedUniqueEvents = useMemo(
    () =>
      events
        .filter((event, index, self) =>
          index === self.findIndex((e) => e.title === event.title && e.date === event.date && e.description === event.description)
        )
        .sort((a, b) => {
          const dateA = parseDate(a.date);
          const dateB = parseDate(b.date);
          return dateB.getTime() - dateA.getTime();
        }),
    [events]
  );


  return (
    <div className="bg-gradient-to-b from-purple-50 to-white w-full max-w-full overflow-x-hidden">
      <Navbar />

      {/* Main Content with padding-top to prevent navbar overlap */}
      <div className="pt-16 md:pt-20">
        {/* Hero Section - Reduced padding */}
        <section className="relative py-4 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center w-full overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-purple-100 border border-purple-300 rounded-full text-purple-700 font-medium text-sm animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Empowering Women in Technology
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-800 to-indigo-600 mb-3 pb-3 animate-fade-in-up">
              Silver Oak University
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-purple-700 mb-2 animate-fade-in-up animation-delay-200">
              IEEE Women in Engineering
              <span className="block text-xl md:text-2xl mt-2 text-purple-600 mb-3">Student Branch Affinity Group</span>
            </h2>
            
            <div className="mt-4 animate-fade-in-up animation-delay-300">
              <div className="inline-flex items-center px-6 py-2 rounded-full border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-sm md:text-base font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  OU Code: SBA20233
                </span>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mt-4 animate-fade-in-up animation-delay-400">
              Join a vibrant community dedicated to
              <span className="font-semibold text-purple-700"> leadership</span>,
              <span className="font-semibold text-purple-700"> collaboration</span>, and
              <span className="font-semibold text-purple-700"> innovation</span> in engineering
            </p>


          </div>
        </section>

        {/* Animated Stats Section */}
        <CountUpSection />

        {/* Leadership spotlight replaces old team card */}
        <LeadershipSpotlight />

        {/* Who We Are Section */}
        <section id="who-we-are" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-3">Who We Are</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Diverse Community</h4>
                  <p className="text-purple-100 text-sm leading-relaxed">A dedicated group of students passionate about promoting diversity in engineering and technology fields.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Empowering Women</h4>
                  <p className="text-purple-100 text-sm leading-relaxed">Creating opportunities for women engineers through innovative initiatives, workshops, and networking events.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Innovation Hub</h4>
                  <p className="text-purple-100 text-sm leading-relaxed">Fostering technical excellence and professional growth through hands-on projects and collaborative learning.</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center"
            >
              <Button 
                asChild
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/learn-more" className="inline-flex items-center gap-2">
                  <span className="font-semibold">Discover Our Mission</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Events and Awards Section */}
        <section id="activities" className="py-12 px-4 sm:px-6 lg:px-8 bg-purple-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">Events & Awards</h2>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
              <button
                onClick={() => setActiveTab("recent")}
                className={`w-full sm:w-56 h-14 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "recent"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105"
                    : "bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                }`}
              >
                Recent Events
              </button>

              <button
                onClick={() => setActiveTab("awards")}
                className={`w-full sm:w-56 h-14 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "awards"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105"
                    : "bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                }`}
              >
                Awards & Recognition
              </button>
            </div>

            {/* Content for both tabs - use visibility instead of unmounting */}
            <div className={`mt-2 ${activeTab === "recent" ? "block" : "hidden"}`}>
              {events.length > 0 ? (
                <RecentEventSlider events={sortedUniqueEvents} />
              ) : (
                <Card className="shadow-md mx-auto max-w-md">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">No events added yet. Check back soon!</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className={`mt-2 ${activeTab === "awards" ? "block" : "hidden"}`}>
                {awards.length > 0 ? (
                  <div className="space-y-6">
                    {/* Filter unique awards and sort by year */}
                    {awards
                      .filter((award, index, self) =>
                        index === self.findIndex((a) => a.title === award.title)
                      )
                      .sort((a, b) => parseInt(b.date) - parseInt(a.date))
                      .map((award, index) => (
                        <motion.div
                          key={award.id}
                          initial={{ opacity: 0, scale: 0.95, y: 30 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.15 }}
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          <Link to={`/award/${award.id}`} className="block">
                            <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                            <div className="grid md:grid-cols-4 gap-4">
                              <div className="aspect-video md:aspect-square md:col-span-1 overflow-hidden">
                                <img
                                  src={award.imageUrl}
                                  alt={award.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-4 md:col-span-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <AwardIcon className="h-5 w-5 text-yellow-500" />
                                  <h3 className="text-xl font-semibold text-purple-800">{award.title}</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{award.date}</p>
                                <p className="text-gray-700">{award.description}</p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                      ))}
                  </div>
                ) : (
                  <Card className="shadow-md mx-auto max-w-md">
                    <CardContent className="pt-6 text-center">
                      <p className="text-gray-500">No awards added yet. Check back soon!</p>
                    </CardContent>
                  </Card>
                )}
            </div>
          </div>
        </section>

        {/* Opportunities Section */}
        <OpportunitiesSection />
      </div>
    </div>
  );
};

export default Index;
