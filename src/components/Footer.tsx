import React from 'react';
import { GraduationCap, Github, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-sky-500 p-2 rounded-xl">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Wings<span className="text-sky-500">Academy</span>
              </span>
            </div>
            <p className="leading-relaxed">
              Empowering the next generation through innovative learning, creativity, and play. Join the movement.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-sky-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Our Curriculum</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Parent Portal</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Student Work</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-sky-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Safety Rules</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
                <span>123 Learning Lane, Creative Valley, EDU 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-500 shrink-0" />
                <span>hello@wingsacademy.edu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-500 shrink-0" />
                <span>+1 (555) 946-4722</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Wings Academy Education Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;