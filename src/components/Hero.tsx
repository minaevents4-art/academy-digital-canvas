import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PlayCircle, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7908ae77-ade3-4699-8a42-6994e617dbab/hero-bg-5bd9b836-1772171972700.webp" 
          alt="Wings Academy Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute top-20 left-10 w-32 h-32 bg-sky-200/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-200/50 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span className="text-sky-600 text-sm font-bold tracking-wide uppercase">Award-Winning Education</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Spread Your Wings and <span className="text-sky-500">Soar Higher.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience the magic of learning English, Math, Music, and Art through immersive interactive play. We make education the adventure of a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-sky-200 flex items-center justify-center gap-2 group">
                  Explore Courses
                  <PlayCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto bg-white border-2 border-slate-100 hover:border-sky-500 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  Try Free Demo
                </button>
              </div>
              
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-slate-500 text-sm">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                    </div>
                  ))}
                </div>
                <p><span className="font-bold text-slate-800">10k+</span> students joined this month</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7908ae77-ade3-4699-8a42-6994e617dbab/hero-bg-5bd9b836-1772171972700.webp" 
                alt="Wings Academy Hero" 
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-slate-50"
            >
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Top Rated</p>
                <p className="text-sm font-extrabold">4.9/5 Average</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-slate-50"
            >
              <div className="bg-green-100 p-2 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">✓</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Today</p>
                <p className="text-sm font-extrabold">2,450 Learning</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;