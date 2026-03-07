import { motion } from "framer-motion";
import { Award, Palette, Users, Globe, Brain, Lightbulb, GraduationCap, Rocket } from "lucide-react";

const OpportunitiesSection = () => {
  const opportunities = [
    {
      icon: Award,
      title: "Awards & Recognition",
      gradient: "from-purple-500 to-purple-600",
      items: [
        "IEEE WIE Student Branch Affinity Group of the Year",
        "IEEE WIE Inspiring Member Awards",
        "IEEE MGA Awards",
        "IEEE Section-level recognitions",
        "Outstanding Volunteer Awards"
      ],
      note: "Enhance your professional profile."
    },
    {
      icon: Palette,
      title: "Creative Competitions",
      gradient: "from-purple-500 to-purple-600",
      items: [
        "IEEE WIE Manga Story Contest",
        "Poster competitions",
        "Blog writing contests",
        "Social media challenges",
        "Video storytelling competitions",
        "Innovation storytelling contests"
      ],
      note: "Combine creativity with advocacy."
    },
    {
      icon: Users,
      title: "Leadership Opportunities",
      gradient: "from-purple-500 to-purple-600",
      items: [
        "Chairperson / Vice Chair / Secretary roles",
        "WIE Ambassador programs",
        "IEEE Section & Region leadership",
        "International volunteer roles",
        "Conference organizing committees"
      ],
      note: "Develop substantial leadership skills."
    },
    {
      icon: Globe,
      title: "International Exposure",
      gradient: "from-purple-500 to-purple-600",
      items: [
        "IEEE WIE International Leadership Conferences (ILC)",
        "Region 10 (Asia-Pacific) events",
        "Cross-country collaborations",
        "Global networking sessions",
        "Virtual exchange programs"
      ],
      note: "Connect with global professionals."
    },
    {
      icon: Brain,
      title: "Technical & Career Growth",
      gradient: "from-purple-500 to-purple-600",
      items: [
        "Research paper presentation opportunities",
        "IEEE conferences & journals",
        "Mentorship programs",
        "Industry connect programs",
        "Internship referrals",
        "Technical workshops"
      ],
      note: "Strengthen technical career prospects."
    },
    {
      icon: Lightbulb,
      title: "Special Initiatives",
      gradient: "from-purple-500 to-purple-600",
      items: [
        "STEM outreach programs",
        "School mentorship drives",
        "Women-in-tech panel discussions",
        "Entrepreneurship bootcamps",
        "Innovation & startup incubation programs"
      ],
      note: "Enable meaningful community engagement."
    },
    {
      icon: GraduationCap,
      title: "Scholarships & Funding",
      gradient: "from-purple-500 to-purple-600",
      items: [
        "Travel grants for conferences",
        "Project funding support",
        "IEEE scholarships",
        "Conference sponsorship opportunities"
      ],
      note: "Provide essential financial support."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-full">
            <span className="text-2xl">🌍</span>
            <span className="text-purple-700 font-semibold">Global Opportunities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-4 px-4 py-2">
            Opportunities in IEEE WIE
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Unlock your potential with global recognition, leadership roles, and life-changing experiences
          </p>
        </motion.div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {opportunities.map((opp, index) => {
            const Icon = opp.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-white to-purple-50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-purple-200 hover:border-purple-300 flex flex-col h-full overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, white 0%, ${index % 2 === 0 ? 'rgba(243, 232, 255, 0.3)' : 'rgba(252, 231, 243, 0.3)'} 100%)`
                }}
              >
                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${opp.gradient} opacity-10 rounded-bl-full`}></div>
                <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${opp.gradient} opacity-5 rounded-tr-full`}></div>
                
                {/* Icon with gradient background */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${opp.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="relative z-10 text-xl font-bold text-purple-700 mb-3">{opp.title}</h3>
                
                {/* Items List */}
                <ul className="relative z-10 space-y-2 mb-4 flex-grow">
                  {opp.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-purple-600 font-bold mt-1 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Note with gradient background */}
                <div className={`relative z-10 mt-auto pt-4`}>
                  <div className={`bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-3 shadow-md`}>
                    <p className="text-sm font-semibold text-white">
                      {opp.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* What Makes IEEE WIE Unique */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-purple-100 via-white to-purple-50 rounded-3xl p-8 md:p-12 overflow-hidden border-2 border-purple-200 shadow-xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/20 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/20 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-purple-800">What Makes IEEE SOU WIE SB AG Unique?</h3>
            </div>
            
            <p className="text-xl mb-6 text-gray-700 font-medium">It's not just technical.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Leadership development",
                "Confidence building",
                "Community impact",
                "Representation in STEM",
                "Global recognition"
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:bg-white/95 hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-purple-200/50 shadow-sm cursor-pointer group"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="text-lg font-medium text-gray-800 group-hover:text-purple-700 transition-colors duration-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
