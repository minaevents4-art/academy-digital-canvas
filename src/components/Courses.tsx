import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, Music, Palette, ArrowRight } from 'lucide-react';

const courses = [
  {
    title: 'Creative English',
    description: 'Master storytelling and vocabulary through interactive tales and word quests.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/7908ae77-ade3-4699-8a42-6994e617dbab/english-course-a1b7c85d-1772171947897.webp',
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
    color: 'bg-blue-50',
    accent: 'sky',
    lessons: 24,
    students: '1.2k'
  },
  {
    title: 'Logic Math',
    description: 'Solve complex puzzles and build mathematical foundations with gamified challenges.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/7908ae77-ade3-4699-8a42-6994e617dbab/math-course-6b384078-1772171948777.webp',
    icon: <Calculator className="w-6 h-6 text-orange-500" />,
    color: 'bg-orange-50',
    accent: 'orange',
    lessons: 32,
    students: '950'
  },
  {
    title: 'Melody Music',
    description: 'Learn instruments and music theory using our virtual playground of sounds.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/7908ae77-ade3-4699-8a42-6994e617dbab/music-course-67cfdacc-1772171948480.webp',
    icon: <Music className="w-6 h-6 text-purple-500" />,
    color: 'bg-purple-50',
    accent: 'purple',
    lessons: 18,
    students: '1.5k'
  },
  {
    title: 'Digital Arts',
    description: 'Express yourself through digital painting, animation, and creative design.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/7908ae77-ade3-4699-8a42-6994e617dbab/art-course-4b5b99d2-1772171948877.webp',
    icon: <Palette className="w-6 h-6 text-rose-500" />,
    color: 'bg-rose-50',
    accent: 'rose',
    lessons: 20,
    students: '2.1k'
  }
];

const Courses = () => {
  return (
    <section id="courses" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Our Learning Adventures</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Each course is designed by experts to provide a perfect balance of fun and fundamental learning. Choose your path and start your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-sky-100 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className={`absolute bottom-4 left-4 p-2 rounded-xl backdrop-blur-md bg-white/90 shadow-lg`}>
                  {course.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase">Students</span>
                    <span className="text-sm font-extrabold text-slate-700">{course.students}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase">Lessons</span>
                    <span className="text-sm font-extrabold text-slate-700">{course.lessons}</span>
                  </div>
                </div>
                <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 text-slate-900 font-bold group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;