import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LazyImage from "./LazyImage";

interface Member {
  name: string;
  role: string;
  description: string;
  image: string; // local preview URL or empty
}

const defaultMembers: Member[] = [
  {
    name: "Dr. Satvik Khara",
    role: "Mentor",
    description: "Dean, College of Technology, Silver Oak University; IEEE Senior Member; Chairperson, Technical Activity, Computer Society, IEEE Gujarat Section; Founding Member, Silver Oak University IEEE Student Branch.",
    image: "http://ieee.socet.edu.in/wp-content/uploads/2025/05/satviksir.jpg",
  },
  {
    name: "Prof. Gaurav Tiwari",
    role: "Faculty Advisor",
    description: "Assistant Professor, Department of Computer Engineering, College of Technology; Advisor, Silver Oak University IEEE Women In Engineering Student Branch Affinity Group",
    image: "http://ieee.socet.edu.in/wp-content/uploads/2025/07/gaurav-sir.png",
  },
  {
    name: "Deshna Shah",
    role: "Chairperson",
    description: "",
    image: "http://ieee.socet.edu.in/wp-content/uploads/2026/02/19.png",
  },
  {
    name: "Milan Sehgal",
    role: "Vice Chairperson",
    description: "",
    image: "http://ieee.socet.edu.in/wp-content/uploads/2026/02/20.png",
  },
  {
    name: "Maruf Fatema Mansuri",
    role: "Secretary",
    description: "",
    image: "http://ieee.socet.edu.in/wp-content/uploads/2026/02/21.png",
  },
  {
    name: "Price Sabalpara",
    role: "Treasurer",
    description: "",
    image: "http://ieee.socet.edu.in/wp-content/uploads/2026/02/22.png",
  },
  {
    name: "Suhani Singh",
    role: "Webmaster",
    description: "",
    image: "http://ieee.socet.edu.in/wp-content/uploads/2026/02/23.png",
  },
];

export default function LeadershipSpotlight() {
  const [members, setMembers] = useState<Member[]>(defaultMembers);
  const [activeIndex, setActiveIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const active = members[activeIndex];

  // Auto-advance carousel every 8 seconds (even slower for better performance)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % members.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [members.length]);

  const handleNext = () => {
    setActiveIndex((i) => (i + 1) % members.length);
  };

  const handlePrev = () => {
    setActiveIndex((i) => (i - 1 + members.length) % members.length);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setMembers((m) => {
      const copy = [...m];
      copy[activeIndex] = { ...copy[activeIndex], image: url };
      return copy;
    });
    // reset value so same file can be uploaded again if needed
    e.target.value = "";
  };

  const initials = (name: string) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  // framer-motion transition definition
  const transition: any = { duration: 0.4, ease: "easeInOut" };
  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <section className="bg-gradient-to-r from-purple-100 to-purple-200 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-purple-900 mb-20">
          Leadership Spotlight
        </h2>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-20"
          >
            {/* photo circle with glowing pulsing spotlight */}
            <motion.div
              className="relative flex-shrink-0"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* radial spotlight */}
              <div className="absolute -inset-10 bg-gradient-to-br from-purple-400/20 via-pink-400/10 to-indigo-400/20" />
              {/* layered borders with gradient */}
              <div className="absolute -inset-6 border-2 border-purple-400 opacity-30"></div>
              <div className="absolute -inset-3 border border-purple-500 opacity-40"></div>

              <motion.div
                variants={{
                  enter: { scale: 0.95, opacity: 0, rotateY: -20 },
                  center: { scale: 1, opacity: 1, rotateY: 0 },
                  exit: { scale: 0.95, opacity: 0, rotateY: 20 },
                }}
                transition={transition}
                className="relative w-72 h-72 md:w-[24rem] md:h-[24rem] rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center cursor-pointer overflow-hidden shadow-2xl border-4 border-purple-300 hover:border-purple-500 transition-all duration-300"
                onClick={handleImageClick}
              >
                {active.image ? (
                  <img
                    src={active.image}
                    alt={active.name}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <span className="text-purple-700 font-semibold text-3xl">
                    {initials(active.name)}
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </motion.div>
            </motion.div>

            {/* text section */}
            <div className="flex-1 text-center md:text-left space-y-4 max-w-md">
              <p className="text-sm uppercase tracking-widest text-purple-600 mb-3">
                {active.role}
              </p>
              <h3 className="text-3xl md:text-4xl font-extrabold text-purple-800 tracking-wide">
                {active.name}
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{active.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* navigation */}
        <div className="mt-8 flex flex-col items-center">
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-purple-300 hover:bg-purple-400 transition-colors duration-200"
            >
              <ChevronLeft className="h-5 w-5 text-purple-800" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-purple-300 hover:bg-purple-400 transition-colors duration-200"
            >
              <ChevronRight className="h-5 w-5 text-purple-800" />
            </button>
          </div>
          <div className="mt-4 flex space-x-2">
            {members.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  idx === activeIndex ? "bg-purple-700" : "bg-purple-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
