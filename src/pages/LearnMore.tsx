
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { BulletItem } from "@/components/BulletItem";
import Navbar from "@/components/Navbar";

const LearnMore = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#F3E8FF] via-white to-[#F8F5FF] pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <Button
          variant="outline"
          className="mb-8 flex items-center gap-2 border-purple-300 hover:bg-purple-50"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home 
          </Link>
        </Button>

        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <div className="w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-4">
              About IEEE Women in Engineering
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto rounded-full"
            ></motion.div>
          </motion.div>
        </div>

        <div className="space-y-16">
          {/* About IEEE WIE Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 p-8 hover:-translate-y-2"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-purple-400 rounded-l-2xl"></div>
            <h2 className="text-3xl font-bold text-purple-800 mb-6">About IEEE WIE</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                IEEE Women in Engineering (WIE) is one of the largest international professional organizations 
                dedicated to promoting women engineers and scientists. The global network connects nearly 20,000 
                members in over 100 countries to advance women in technology at all points in their lives and careers.
              </p>
              <p>
                IEEE WIE members make lifelong friendships, acquire influential mentors, and make a difference for 
                the benefit of humanity. Members develop leadership skills and technical literacy, while participating 
                in educational programs, networking opportunities with industry leaders, and humanitarian projects.
              </p>
              <p>
                Our Silver Oak University Student Branch Affinity Group is part of this global movement and works to 
                create local impact for our members and community.
              </p>
            </div>
          </motion.section>

          {/* Vision Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 p-8 hover:-translate-y-2"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-purple-400 rounded-l-2xl"></div>
            <h2 className="text-3xl font-bold text-purple-800 mb-6">Our Vision</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                At Silver Oak University IEEE WIE Student Branch Affinity Group, we envision a world where women are 
                represented, included, and valued across all disciplines of engineering. We strive to be the leading 
                catalyst for creating an inclusive community within our university that inspires, engages, and advances 
                women in technology.
              </p>
              <p className="font-semibold text-purple-700">
                We see a future where:
              </p>
              <div className="space-y-3 mt-4">
                <BulletItem delay={0.1}>
                  Women are equally represented in technical fields at all levels
                </BulletItem>
                <BulletItem delay={0.2}>
                  Young women view engineering as an attractive and viable career option
                </BulletItem>
                <BulletItem delay={0.3}>
                  Female students have access to mentors, resources, and support systems for their academic and professional journey
                </BulletItem>
                <BulletItem delay={0.4}>
                  Our members develop into technical leaders who drive innovation and positive change
                </BulletItem>
                <BulletItem delay={0.5}>
                  Our initiatives create lasting impact in our local community and beyond
                </BulletItem>
              </div>
            </div>
          </motion.section>

          {/* Inspirational Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-6"></div>
            <p className="italic text-lg md:text-xl text-purple-700 max-w-3xl mx-auto leading-relaxed">
              "Empowering women in engineering is not just inclusion — it is innovation."
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-6"></div>
          </motion.div>

          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 p-8 hover:-translate-y-2"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-purple-400 rounded-l-2xl"></div>
            <h2 className="text-3xl font-bold text-purple-800 mb-6">Our Mission</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The mission of the Silver Oak University IEEE WIE Student Branch Affinity Group is to inspire, engage, 
                encourage, and empower women in engineering through:
              </p>
              <div className="space-y-3 mt-4">
                <BulletItem delay={0.1}>
                  <strong>Education:</strong> Organizing workshops, technical training, and seminars that enhance 
                  technical knowledge and build professional skills
                </BulletItem>
                <BulletItem delay={0.2}>
                  <strong>Community:</strong> Creating a supportive network of peers and mentors who celebrate 
                  achievements and help navigate challenges
                </BulletItem>
                <BulletItem delay={0.3}>
                  <strong>Leadership:</strong> Providing opportunities for members to develop and practice leadership 
                  through organizing events, managing projects, and representing IEEE WIE
                </BulletItem>
                <BulletItem delay={0.4}>
                  <strong>Outreach:</strong> Engaging with younger students to ignite interest in STEM fields and 
                  encourage pursuit of engineering education
                </BulletItem>
                <BulletItem delay={0.5}>
                  <strong>Innovation:</strong> Facilitating technical projects and competitions that allow members to 
                  apply theoretical knowledge to real-world problems
                </BulletItem>
                <BulletItem delay={0.6}>
                  <strong>Recognition:</strong> Acknowledging and celebrating women's achievements in engineering 
                  and technology
                </BulletItem>
              </div>
            </div>
          </motion.section>

          {/* Goals Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 p-8 hover:-translate-y-2"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-purple-400 rounded-l-2xl"></div>
            <h2 className="text-3xl font-bold text-purple-800 mb-6">Our Goals</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The Silver Oak University IEEE WIE Student Branch Affinity Group is committed to:
              </p>
              <div className="space-y-3 mt-4">
                <BulletItem delay={0.1}>
                  Increasing female enrollment and retention in engineering programs at our university
                </BulletItem>
                <BulletItem delay={0.2}>
                  Developing a strong community of women engineers who support and elevate each other
                </BulletItem>
                <BulletItem delay={0.3}>
                  Providing professional development opportunities that prepare members for successful careers
                </BulletItem>
                <BulletItem delay={0.4}>
                  Building partnerships with industry to create mentorship and internship opportunities
                </BulletItem>
                <BulletItem delay={0.5}>
                  Collaborating with other IEEE Student Branches and WIE Affinity Groups to share best practices
                </BulletItem>
                <BulletItem delay={0.6}>
                  Organizing at least four major technical and professional development events each academic year
                </BulletItem>
                <BulletItem delay={0.7}>
                  Documenting and sharing our successes to inspire other women in engineering groups
                </BulletItem>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
      </div>
    </>
  );
};

export default LearnMore;
