import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { cn } from '../lib/utils';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    image: string;
    color: string;
    icon: React.ReactNode;
  };
  index: number;
  onSelect: () => void;
}

export default function CourseCard({ course, index, onSelect }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col h-full cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={cn("absolute inset-0 opacity-20", course.color)} />
        <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
          {course.icon}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
              +2k
            </div>
          </div>
          <button className="flex items-center gap-2 font-bold text-indigo-600 group-hover:gap-3 transition-all">
            Enter <Play className="w-4 h-4 fill-indigo-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}