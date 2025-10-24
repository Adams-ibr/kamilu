// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../constants';
import { useAdmin } from '../contexts/AdminContext';
import FaqItem from '../components/FaqItem';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { LinkedInIcon, TwitterIcon } from '../components/icons';


const FAQS = [
    { q: 'What kind of machinery do you specialize in?', a: 'We specialize in fabricating stainless steel equipment for food/pharma, agro-allied machinery like threshers and feed mills, and industrial equipment such as boilers and cold rooms.' },
    { q: 'Do you offer training programs?', a: 'Yes, we are passionate about youth empowerment and offer comprehensive Skills Acquisition Training in metal works and fabrication, often in collaboration with government bodies like the NBTI.' },
    { q: 'Where are you located?', a: 'Our workshop is located at the Technology Incubation Centre (TIC Complex), Farm Center, Kano State, Nigeria.' },
    { q: 'Can you create custom equipment?', a: 'Absolutely. Custom design and fabrication are at the core of what we do. We work closely with clients to build machinery tailored to their specific processing needs.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
  },
};

const AboutPage: React.FC = () => {
  const { teamMembers } = useAdmin();

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-blue text-white pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">About Kamilu Welding Services</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">Pioneering the fabrication of industrial and agro-allied machinery in Nigeria.</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-blue dark:text-gray-100 mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Kamilu Welding Services (K.W.S.) was founded with a clear vision: to become a leader in the fabrication of industrial, pharmaceutical, and agro-allied machinery in Nigeria. Based at the Technology Incubation Centre in Kano, we are at the heart of innovation, developing practical solutions that drive progress.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our focus is on creating durable, efficient equipment—from stainless steel food processors to robust multi-crop threshers—that empowers local industries. We are proud to contribute to the community through our Youth Skill Acquisition Training, fostering the next generation of skilled fabricators in collaboration with partners like the National Board for Technology Incubation (NBTI).
              </p>
            </div>
            <div>
              <img src="https://picsum.photos/seed/welding-workshop/600/400" alt="Welding workshop" className="rounded-lg shadow-xl" loading="lazy" />
            </div>
          </div>
        </section>
      </AnimatedSection>
      
      <section className="bg-brand-light dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {STATS.map((stat, index) => (
              <div key={index}>
                  <p className="text-4xl font-bold text-brand-gold">{stat.value}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle>Meet Our Leadership</SectionTitle>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {teamMembers.map(member => (
              <motion.div 
                key={member.name} 
                variants={itemVariants}
                className="bg-white rounded-lg p-6 group relative dark:bg-gray-800 dark:border dark:border-gray-700"
                whileHover={{ 
                  y: -5, 
                  scale: 1.02, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative">
                    <img className="w-40 h-40 rounded-full mx-auto object-cover mb-4 transition-all duration-300 group-hover:blur-sm" src={member.imageUrl} alt={member.name} />
                    <div className="absolute inset-0 flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/80 p-3 rounded-full text-brand-blue hover:text-brand-gold transition-colors dark:bg-gray-700/80">
                            <LinkedInIcon className="w-6 h-6" />
                        </a>
                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/80 p-3 rounded-full text-brand-blue hover:text-brand-gold transition-colors dark:bg-gray-700/80">
                            <TwitterIcon className="w-6 h-6" />
                        </a>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-brand-blue dark:text-gray-100">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionTitle>Empowering the Next Generation: Youth Skills Training</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                  <img src="https://picsum.photos/seed/welding-training-detail/600/400" alt="Youths learning welding" className="rounded-lg shadow-xl mb-6" loading="lazy" />
                  <h3 className="text-2xl font-bold text-brand-blue dark:text-gray-100 mb-4">Our Commitment to Skill Development</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                      At Kamilu Welding Services, we believe that building machinery goes hand-in-hand with building futures. Our Youth Skills Acquisition Training program is a cornerstone of our commitment to community development. In partnership with the National Board for Technology Incubation (NBTI), we provide intensive, hands-on training to aspiring young artisans.
                  </p>
                  <h4 className="text-xl font-semibold text-brand-blue dark:text-gray-200 mt-6 mb-3">Program Objectives:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                      <li>Provide practical, in-demand skills in modern welding and fabrication techniques.</li>
                      <li>Foster entrepreneurship and self-reliance among Nigerian youth.</li>
                      <li>Bridge the skills gap in the nation's industrial and agricultural sectors.</li>
                      <li>Instill a culture of safety, precision, and quality workmanship.</li>
                  </ul>
              </div>
              <div>
                  <div className="bg-brand-light dark:bg-gray-800 p-6 rounded-lg shadow-md">
                      <h4 className="text-xl font-semibold text-brand-blue dark:text-gray-200 mb-3">How to Apply</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                          New training cohorts are announced periodically. We encourage interested candidates to follow our social media channels for updates or send an expression of interest to <a href="mailto:training@kamiluwelding.com" className="text-brand-gold hover:underline">training@kamiluwelding.com</a>.
                      </p>
                  </div>
                  <div className="mt-8">
                      <h4 className="text-xl font-semibold text-brand-blue dark:text-gray-200 mb-4">Success Stories</h4>
                      <div className="space-y-6">
                          <blockquote className="border-l-4 border-brand-gold pl-4 italic text-gray-600 dark:text-gray-400">
                            <p>"The training I received at K.W.S. was life-changing. I went from having no skills to running my own small repair shop. The instructors are patient and true experts."</p>
                            <cite className="block text-right mt-2 not-italic font-semibold text-gray-700 dark:text-gray-300">- Ibrahim S., 2023 Cohort</cite>
                          </blockquote>

                          <blockquote className="border-l-4 border-brand-gold pl-4 italic text-gray-600 dark:text-gray-400">
                            <p>"I now work as a junior fabricator. The hands-on experience with industrial machinery was invaluable. I highly recommend this program to any youth serious about a career in this field."</p>
                            <cite className="block text-right mt-2 not-italic font-semibold text-gray-700 dark:text-gray-300">- Fatima A., 2022 Cohort</cite>
                          </blockquote>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {FAQS.map((faq, index) => (
              <FaqItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default AboutPage;