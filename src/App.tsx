import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Flame, 
  TrendingUp, 
  Activity, 
  Clock, 
  Target, 
  Utensils, 
  Users, 
  Phone, 
  MapPin, 
  Mail, 
  Star, 
  ArrowRight, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  Award, 
  Send,
  MessageCircle,
  X,
  Smartphone,
  ChevronDown,
  Info
} from 'lucide-react';

import GymSpecsAudit from './components/GymSpecsAudit';
import { 
  WHAT_SETS_US_APART_CARDS, 
  PROGRAMS, 
  TRAINERS, 
  TESTIMONIALS, 
  SCHEDULE,
  INSPIRED_ITEMS,
  BRAND_LOGOS
} from './data';

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeApartCard, setActiveApartCard] = useState('strength');
  const [activeTrainerIndex, setActiveTrainerIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // Biometrics Live States for interactive widgets
  const [liveBpm, setLiveBpm] = useState(95);
  const [liveSteps, setLiveSteps] = useState(1024);

  // Modals / Drawers States
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isMacroOpen, setIsMacroOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);

  // Gym Planner Day Selection
  const [selectedDay, setSelectedDay] = useState<keyof typeof SCHEDULE>('Monday');

  // Calculator State
  const [weight, setWeight] = useState(78);
  const [height, setHeight] = useState(175);
  const [goal, setGoal] = useState('strength'); // strength, lean, endurance
  const [calculatedBmr, setCalculatedBmr] = useState(0);
  const [calculatedMacros, setCalculatedMacros] = useState({ protein: 0, carbs: 0, fats: 0 });

  // Contact / Newsletter Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCategory, setContactCategory] = useState('elite');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Monitor scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate real-time biometric oscillations
  useEffect(() => {
    const bpmInterval = setInterval(() => {
      setLiveBpm(prev => {
        const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + offset;
        return next > 120 ? 110 : next < 85 ? 90 : next;
      });
    }, 3000);

    const stepsInterval = setInterval(() => {
      setLiveSteps(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);

    return () => {
      clearInterval(bpmInterval);
      clearInterval(stepsInterval);
    };
  }, []);

  // Recalculate BMR and Macros
  useEffect(() => {
    const bmr = Math.round(10 * weight + 6.25 * height - 5 * 25 + 5);
    let multiplier = 1.55; 
    if (goal === 'strength') multiplier = 1.6;
    if (goal === 'lean') multiplier = 1.5;
    if (goal === 'endurance') multiplier = 1.7;

    const tdee = Math.round(bmr * multiplier);
    
    let proteinGrams = 0;
    let carbsGrams = 0;
    let fatsGrams = 0;

    if (goal === 'strength') {
      proteinGrams = Math.round((tdee * 0.35) / 4);
      carbsGrams = Math.round((tdee * 0.45) / 4);
      fatsGrams = Math.round((tdee * 0.20) / 9);
    } else if (goal === 'lean') {
      proteinGrams = Math.round((tdee * 0.45) / 4);
      carbsGrams = Math.round((tdee * 0.30) / 4);
      fatsGrams = Math.round((tdee * 0.25) / 9);
    } else {
      proteinGrams = Math.round((tdee * 0.30) / 4);
      carbsGrams = Math.round((tdee * 0.50) / 4);
      fatsGrams = Math.round((tdee * 0.20) / 9);
    }

    setCalculatedBmr(tdee);
    setCalculatedMacros({ protein: proteinGrams, carbs: carbsGrams, fats: fatsGrams });
  }, [weight, height, goal]);

  // Handle forms submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName('');
        setContactEmail('');
      }, 5000);
    }
  };

  // Scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans antialiased text-gray-300 selection:bg-[#AAFF00] selection:text-black relative overflow-x-hidden">
      
      {/* Background radial ambient glows matching FiTusion style */}
      <div className="absolute top-[5%] left-[-15%] w-[600px] h-[600px] rounded-full bg-[#AAFF00]/4 blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-15%] w-[700px] h-[700px] rounded-full bg-[#AAFF00]/3 blur-[160px] pointer-events-none" />
      <div className="absolute top-[65%] left-[10%] w-[600px] h-[600px] rounded-full bg-[#AAFF00]/4 blur-[130px] pointer-events-none" />

      {/* -------------------- 1. NAVIGATION BAR -------------------- */}
      <nav 
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/5 py-4 shadow-xl' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Customized FiTusion Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute w-2 h-7 bg-[#AAFF00] transform -skew-x-12 translate-x-[-4px]" />
              <div className="absolute w-4 h-2 bg-[#AAFF00] transform -skew-x-12 translate-y-[-8px] translate-x-[2px]" />
              <div className="absolute w-3.5 h-1.5 bg-[#AAFF00] transform -skew-x-12 translate-y-[-2px] translate-x-[0px]" />
            </div>
            <span className="font-bebas text-2xl tracking-wider text-white">Fi<span className="text-[#AAFF00]">Tusion</span></span>
          </div>

          {/* Nav Links: Home, About, Features, Service, Exercise */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-widest uppercase">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About', id: 'about' },
              { label: 'Features', id: 'features' },
              { label: 'Service', id: 'services' },
              { label: 'Exercise', id: 'exercise' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors duration-300 hover:text-[#AAFF00] cursor-pointer ${
                  activeTab === link.id ? 'text-[#AAFF00] border-b-2 border-[#AAFF00] pb-1' : 'text-gray-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-[#AAFF00] hover:bg-white text-black font-extrabold py-2.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(170,255,0,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Contact Us
            </button>
            <button 
              onClick={() => { setIsMacroOpen(true); }}
              className="hidden sm:inline-block border border-white/20 hover:border-[#AAFF00] text-white hover:text-[#AAFF00] font-bold py-2.5 px-5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>


      {/* -------------------- 2. HERO SECTION -------------------- */}
      <section id="home" className="pt-32 pb-20 min-h-screen flex flex-col justify-between relative overflow-hidden">
        
        {/* Side Text Margins */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center space-y-4 text-[10px] tracking-[0.4em] font-bold text-gray-500 font-mono select-none">
          <span className="transform -rotate-90 origin-center mb-8">P</span>
          <span className="transform -rotate-90 origin-center mb-8">R</span>
          <span className="transform -rotate-90 origin-center mb-8">E</span>
          <span className="transform -rotate-90 origin-center">V</span>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center space-y-4 text-[10px] tracking-[0.4em] font-bold text-gray-500 font-mono select-none">
          <span className="transform -rotate-90 origin-center mb-8">N</span>
          <span className="transform -rotate-90 origin-center mb-8">E</span>
          <span className="transform -rotate-90 origin-center mb-8">X</span>
          <span className="transform -rotate-90 origin-center">T</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Hero Left: Sculpt Your Body, Elevate Your Spirit */}
          <div className="lg:col-span-7 text-left space-y-8 lg:pr-8">
            <h1 className="font-bebas text-[50px] sm:text-[75px] md:text-[90px] lg:text-[105px] font-black text-white leading-[0.9] tracking-tight uppercase">
              Sculpt <span className="font-serif italic text-[#AAFF00] lowercase font-normal tracking-wide">your</span> Body,<br />
              Elevate <span className="font-serif italic text-[#AAFF00] lowercase font-normal tracking-wide">your</span> Spirit
            </h1>
            
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              We help you achieve your ultimate physical and mental threshold with our custom athletic conditioning blueprints, professional coaches, and state-of-the-art barbell environments.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('exercise')}
                className="bg-[#AAFF00] hover:bg-white text-black font-extrabold px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(170,255,0,0.6)] flex items-center space-x-2 transform hover:-translate-y-1 cursor-pointer"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              
              <button 
                onClick={() => setIsAuditOpen(true)}
                className="bg-white/5 hover:bg-white/10 text-white font-extrabold px-6 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border border-white/10 hover:border-[#AAFF00]/40 flex items-center space-x-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#AAFF00]" />
                <span>Hardware Audit</span>
              </button>
            </div>
          </div>

          {/* Hero Right: Bodybuilder Image with Orbital Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[500px] lg:h-[600px] w-full">
            
            {/* Center Background Athlete Image */}
            <div className="relative w-[320px] sm:w-[400px] h-[450px] sm:h-[550px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-75 mix-blend-luminosity scale-105"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            {/* ORBITAL WIDGETS */}
            {/* 1. Hours - Top Left */}
            <div className="absolute top-[10%] left-[-5%] sm:left-[5%] bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center space-x-3 shadow-xl transform -rotate-6 hover:rotate-0 transition-all duration-300 hover:scale-105">
              <div className="w-9 h-9 bg-[#AAFF00]/10 border border-[#AAFF00]/30 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#AAFF00]" />
              </div>
              <div className="text-left font-mono">
                <span className="block text-[9px] text-gray-500 uppercase font-black">Daily Hours</span>
                <span className="text-base font-black text-white">1.5 <span className="text-xs text-gray-400">HRS</span></span>
              </div>
            </div>

            {/* 2. Poses - Top Right */}
            <div className="absolute top-[20%] right-[-5%] sm:right-[5%] bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center space-x-3 shadow-xl transform rotate-6 hover:rotate-0 transition-all duration-300 hover:scale-105">
              <div className="w-9 h-9 bg-[#AAFF00]/10 border border-[#AAFF00]/30 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#AAFF00]" />
              </div>
              <div className="text-left font-mono">
                <span className="block text-[9px] text-gray-500 uppercase font-black">Poses</span>
                <span className="text-base font-black text-white">20 <span className="text-xs text-gray-400">SESSIONS</span></span>
              </div>
            </div>

            {/* 3. Kcal - Bottom Left */}
            <div className="absolute bottom-[20%] left-[-10%] sm:left-[0%] bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center space-x-3 shadow-xl transform rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105">
              <div className="w-9 h-9 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-red-500 animate-pulse" />
              </div>
              <div className="text-left font-mono">
                <span className="block text-[9px] text-gray-500 uppercase font-black">Kcal Burned</span>
                <span className="text-base font-black text-white">550 <span className="text-xs text-red-400">KCAL</span></span>
              </div>
            </div>

            {/* 4. Sets - Bottom Right */}
            <div className="absolute bottom-[15%] right-[-8%] sm:right-[2%] bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center space-x-3 shadow-xl transform -rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-105">
              <div className="w-9 h-9 bg-[#AAFF00]/10 border border-[#AAFF00]/30 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-[#AAFF00]" />
              </div>
              <div className="text-left font-mono">
                <span className="block text-[9px] text-gray-500 uppercase font-black">Daily Sets</span>
                <span className="text-base font-black text-white">5 <span className="text-xs text-gray-400">SETS</span></span>
              </div>
            </div>

          </div>

        </div>

        {/* Hero Footer Stretches */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center border-t border-white/5 pt-8 relative z-10">
          
          {/* Left: Overlapping Avatars + Happy Spirits */}
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-3 overflow-hidden">
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-[#050505] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="member" />
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-[#050505] object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="member" />
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-[#050505] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="member" />
            </div>
            <div className="text-left font-mono">
              <span className="block text-sm font-black text-white">12k+ Members</span>
              <span className="block text-[10px] text-gray-500 uppercase font-bold">Happy Spirits Transforming Daily</span>
            </div>
          </div>

          {/* Right: Let's Start Button */}
          <div className="sm:text-right">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-[#AAFF00] hover:bg-white text-black font-extrabold px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(170,255,0,0.5)] inline-flex items-center space-x-2 group cursor-pointer"
            >
              <span>Let's Start</span>
              <span className="text-xs tracking-tighter opacity-80 group-hover:translate-x-1 transition-transform">{">>>"}</span>
            </button>
          </div>

        </div>

      </section>


      {/* -------------------- 3. BRAND LOGOS ROW -------------------- */}
      <section className="py-12 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-8">
            {BRAND_LOGOS.map((brand, idx) => (
              <span 
                key={idx}
                className="font-bebas text-2xl sm:text-3xl lg:text-4xl tracking-widest text-white/30 hover:text-white transition-colors duration-300 cursor-default uppercase"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* -------------------- 4. INSPIRED TO INSPIRE SECTION -------------------- */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left space-y-8">
              
              <div className="space-y-3">
                <span className="text-[#AAFF00] font-black uppercase tracking-[0.3em] text-xs block font-mono">FIRES OF MOTIVATION</span>
                <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight leading-none">
                  Inspired to<br />
                  Inspire <span className="font-serif italic text-[#AAFF00] lowercase font-normal tracking-wide">your</span> Best Self
                </h2>
                <p className="text-gray-400 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
                  We're Your Partner in Achieving A Healthier, Stronger, And More Confident You. Let our elite curriculum guide you.
                </p>
              </div>

              {/* Bento Grid layout of Bullet items matching image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {INSPIRED_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 rounded-full bg-[#AAFF00]/10 border border-[#AAFF00]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#AAFF00] group-hover:text-black transition-colors duration-300">
                      <Check className="w-3.5 h-3.5 text-[#AAFF00] group-hover:text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base group-hover:text-[#AAFF00] transition-colors">{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right B&W Athlete Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-[#AAFF00]/10 rounded-3xl blur-2xl transform rotate-3 scale-95 pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black aspect-square max-w-md mx-auto">
                <img 
                  className="w-full h-full object-cover mix-blend-luminosity opacity-80 hover:opacity-100 hover:scale-105 hover:mix-blend-normal transition-all duration-700" 
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800" 
                  alt="inspired athlete" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* -------------------- 5. DISCOVER WHAT SETS US APART -------------------- */}
      <section id="features" className="py-24 bg-black/50 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#AAFF00] font-black uppercase tracking-[0.3em] text-xs block font-mono">EXCLUSIVE PILLARS</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight leading-none">
              Discover<br />
              What <span className="font-serif italic text-[#AAFF00] lowercase font-normal tracking-wide">Sets Us</span> Apart
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              We Deliver A Fitness Experience That's Truly One-Of-A-Kind. Explore How We Help You Achieve Your Goals Faster And Smarter.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {WHAT_SETS_US_APART_CARDS.map((card) => {
              const isActive = activeApartCard === card.id;
              return (
                <div 
                  key={card.id}
                  onClick={() => setActiveApartCard(card.id)}
                  className={`cursor-pointer text-left p-8 rounded-3xl transition-all duration-500 relative flex flex-col justify-between ${
                    isActive 
                      ? 'bg-[#121212] border-2 border-[#AAFF00] shadow-[0_0_30px_rgba(170,255,0,0.15)] -translate-y-2' 
                      : 'bg-black/30 border border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Icon mapping */}
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                        isActive ? 'bg-[#AAFF00] border-transparent text-black' : 'bg-white/5 border-white/10 text-[#AAFF00]'
                      }`}>
                        {card.id === 'cardio' && <Activity className="w-6 h-6" />}
                        {card.id === 'strength' && <Dumbbell className="w-6 h-6" />}
                        {card.id === 'fatloss' && <Flame className="w-6 h-6" />}
                        {card.id === 'hiit' && <Zap className="w-6 h-6" />}
                      </div>
                      <span className={`font-mono text-[9px] font-bold tracking-widest ${isActive ? 'text-[#AAFF00]' : 'text-gray-500'}`}>
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="font-bebas text-3xl text-white tracking-wider leading-none">{card.title}</h3>
                    
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* See Plan button at the bottom */}
                  <div className="pt-8 mt-auto">
                    {isActive ? (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsMacroOpen(true); }}
                        className="bg-[#AAFF00] hover:bg-white text-black font-extrabold text-xs tracking-wider px-5 py-2.5 rounded-full transition-colors w-full uppercase"
                      >
                        See Plan
                      </button>
                    ) : (
                      <button 
                        className="border border-[#AAFF00]/30 text-[#AAFF00] hover:bg-[#AAFF00] hover:text-black font-extrabold text-xs tracking-wider px-5 py-2.5 rounded-full transition-all w-full uppercase"
                      >
                        See Plan
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Slashes Pagination indicators below cards */}
          <div className="flex justify-center items-center space-x-1.5 mt-8 font-mono text-xs text-gray-600">
            <span className={`transition-all ${activeApartCard === 'cardio' ? 'text-[#AAFF00] font-black' : ''}`}>///</span>
            <span className={`transition-all ${activeApartCard === 'strength' ? 'text-[#AAFF00] font-black' : ''}`}>///</span>
            <span className={`transition-all ${activeApartCard === 'fatloss' ? 'text-[#AAFF00] font-black' : ''}`}>///</span>
            <span className={`transition-all ${activeApartCard === 'hiit' ? 'text-[#AAFF00] font-black' : ''}`}>///</span>
          </div>

        </div>
      </section>


      {/* -------------------- 6. TRAIN SMARTER UNLEASH POTENTIAL -------------------- */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#AAFF00] font-black uppercase tracking-[0.3em] text-xs block font-mono">DEDICATED FITNESS ACADEMY</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight leading-none">
              Train Smarter<br />
              Unleash <span className="font-serif italic text-[#AAFF00] lowercase font-normal tracking-wide">your</span> Potential
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Unlock Your Potential With Our Expertly Designed Courses, Tailored To Help You Maximize Results In Less Time.
            </p>
          </div>

          {/* 3x2 Grid representing the courses shown in the picture */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.map((prog) => (
              <div 
                key={prog.id}
                onClick={() => setSelectedCourse(prog)}
                className="group cursor-pointer bg-black/40 rounded-2xl overflow-hidden border border-white/5 relative hover:border-[#AAFF00]/40 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                
                {/* Diagonal subtle Ribbon */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden z-10">
                  <div className="bg-[#AAFF00] absolute transform rotate-45 top-[-10px] right-[-30px] w-16 h-8 flex items-center justify-center shadow-[0_0_10px_rgba(170,255,0,0.4)]" />
                </div>

                {/* Card Top Image */}
                <div className="h-64 relative bg-black overflow-hidden">
                  <img 
                    className="w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-85 transition-transform duration-700" 
                    src={prog.image} 
                    alt={prog.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <span className="absolute bottom-4 left-4 bg-black/85 text-[#AAFF00] font-mono font-bold text-[9px] tracking-widest px-3 py-1 rounded border border-[#AAFF00]/20 uppercase">
                    {prog.category}
                  </span>
                </div>

                {/* Card Title & Link */}
                <div className="p-6 bg-[#0c0c0c] text-left space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-bebas text-3xl text-white tracking-wider group-hover:text-[#AAFF00] transition-colors">{prog.title}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2">{prog.description}</p>
                  </div>
                  
                  <div className="flex items-center text-xs font-black tracking-widest text-gray-400 group-hover:text-[#AAFF00] transition-colors uppercase pt-2">
                    <span>Explore Course Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* -------------------- 7. EXPERIENCE FITNESS LIKE NEVER BEFORE (BENTO) -------------------- */}
      <section id="exercise" className="py-24 bg-black/40 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#AAFF00] font-black uppercase tracking-[0.3em] text-xs block font-mono">BIOMETRIC ENGINE</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight leading-none">
              Experience<br />
              Fitness Like <span className="font-serif italic text-[#AAFF00] lowercase font-normal tracking-wide">Never</span> Before
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform The Way You Train With Innovative Workouts, Expert Guidance, And State-Of-The-Art Facilities.
            </p>
          </div>

          {/* Two huge feature cards side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Left Card: Endurance Evolution */}
            <div className="bg-[#0c0c0c] rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between group min-h-[440px] text-left">
              
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-color-dodge hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=800")' }}
              />

              <div className="relative z-10 space-y-6">
                <span className="bg-[#AAFF00]/10 border border-[#AAFF00]/30 text-[#AAFF00] font-mono font-bold text-[9px] tracking-widest px-3 py-1 rounded uppercase inline-block">
                  AEROBIC THRESHOLD
                </span>
                
                <div className="space-y-2">
                  <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none">
                    Endurance Evolution
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                    Boost Your Stamina And Resilience With Tailored Cardio And Endurance Workouts Designed To Keep You Moving Stronger For Longer.
                  </p>
                </div>

                {/* HEART RATE DYNAMIC COMPONENT */}
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10 max-w-xs flex items-center justify-between shadow-lg transform hover:-translate-y-1 transition-transform">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center animate-pulse">
                      <Flame className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-500 uppercase font-bold">LIVE HEART RATE</span>
                      <span className="text-lg font-mono font-black text-white">
                        {liveBpm} <span className="text-xs text-gray-400">BPM</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-[#AAFF00] font-black font-mono">TARGET CALIBRATED</span>
                    <span className="text-[8px] text-gray-500 font-mono">ZONES ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8">
                <button 
                  onClick={() => { setIsMacroOpen(true); }}
                  className="bg-[#AAFF00] hover:bg-white text-black font-extrabold text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-colors inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

            </div>

            {/* Right Card: Speed Surge */}
            <div className="bg-[#0c0c0c] rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between group min-h-[440px] text-left">
              
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-color-dodge hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=800")' }}
              />

              <div className="relative z-10 space-y-6">
                <span className="bg-[#AAFF00]/10 border border-[#AAFF00]/30 text-[#AAFF00] font-mono font-bold text-[9px] tracking-widest px-3 py-1 rounded uppercase inline-block">
                  EXPLOSIVE CALIBRATION
                </span>
                
                <div className="space-y-2">
                  <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none">
                    Speed Surge
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                    Boost Your Agility And Explosiveness With High-Intensity Sprint And Movement Drills. Speed Surge Is Designed To Take Your Performance To The Next Level!
                  </p>
                </div>

                {/* TRACKS COMPONENT */}
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10 max-w-xs flex items-center justify-between shadow-lg transform hover:-translate-y-1 transition-transform">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-500 uppercase font-bold">METABOLIC WORKOUT</span>
                      <span className="text-lg font-mono font-black text-white">
                        {liveSteps} <span className="text-xs text-gray-400">STEPS</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-blue-400 font-bold font-mono">PACE INCREASED</span>
                    <span className="block text-[8px] text-gray-500 font-mono">CALORIES MELTING</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8">
                <button 
                  onClick={() => { setIsMacroOpen(true); }}
                  className="bg-[#AAFF00] hover:bg-white text-black font-extrabold text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-colors inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* -------------------- 8. YOUR FITNESS GOALS, THEIR EXPERTISE (TRAINERS) -------------------- */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#AAFF00] font-black uppercase tracking-[0.3em] text-xs block font-mono font-bold">CERTIFIED ATLETIC MENTORS</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight leading-none">
              Your Fitness<br />
              Goals, <span className="font-serif italic text-[#AAFF00] lowercase font-normal tracking-wide">Their</span> Expertise
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Our Team Of Certified Trainers Brings Unparalleled Expertise To Help You Achieve Your Fitness Goals.
            </p>
          </div>

          {/* Grid of 3 Trainers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TRAINERS.map((trainer, idx) => (
              <div 
                key={trainer.id}
                onClick={() => { setActiveTrainerIndex(idx); setIsQuickContactOpen(true); }}
                className="group cursor-pointer bg-[#0c0c0c] rounded-2xl overflow-hidden border border-white/5 relative flex flex-col hover:border-[#AAFF00]/40 transition-all duration-300 hover:-translate-y-2 text-left"
              >
                
                {/* Photo frame with skewed border overlap on hover */}
                <div className="h-80 bg-black relative overflow-hidden">
                  <img 
                    className="w-full h-full object-cover mix-blend-luminosity group-hover:scale-105 group-hover:mix-blend-normal transition-all duration-500" 
                    src={trainer.image} 
                    alt={trainer.name} 
                  />
                  
                  {/* Subtle Angled green shapes in corners */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                    <div className="absolute bottom-[-10px] right-[-10px] w-16 h-1.5 bg-[#AAFF00] transform -rotate-45" />
                    <div className="absolute bottom-[-10px] right-[-10px] w-1.5 h-16 bg-[#AAFF00] transform -rotate-45" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-80" />
                  
                  <span className="absolute bottom-4 left-4 bg-black/80 border border-[#AAFF00]/30 text-[#AAFF00] text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 rounded">
                    {trainer.specialtyLabel}
                  </span>
                </div>

                {/* Bio brief */}
                <div className="p-6 space-y-2 bg-[#0c0c0c]">
                  <h3 className="font-bebas text-3xl text-white tracking-wide leading-none group-hover:text-[#AAFF00] transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2">
                    {trainer.bio}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Slashes Indicator row below trainers */}
          <div className="flex justify-center items-center space-x-1 mt-10 text-xs font-mono text-gray-700">
            <span className="text-[#AAFF00] font-black font-extrabold">///</span>
            <span className="text-[#AAFF00] font-black font-extrabold">///</span>
            <span className="text-[#AAFF00] font-black font-extrabold">///</span>
          </div>

        </div>
      </section>


      {/* -------------------- 9. YOUR SUCCESS STORIES, OUR INSPIRATION -------------------- */}
      <section className="py-24 bg-black/50 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#AAFF00] font-black uppercase tracking-[0.3em] text-xs block font-mono">PROUD ATHLETIC REVIEWS</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight leading-none">
              Your Success<br />
              Stories, <span className="font-serif italic text-[#AAFF00] lowercase font-normal tracking-wide">Our</span> Inspiration
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              See How Our Customers Have Achieved Their Goals And Let Their Journeys Inspire Yours!
            </p>
          </div>

          {/* Staggered double column layout representing the reviews block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto text-left">
            
            {/* Left Big Highlight Testimonial Card */}
            <div className="lg:col-span-8 bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
              <div className="absolute top-4 right-8 font-bebas text-[140px] text-[#AAFF00]/5 select-none pointer-events-none">“</div>
              
              <div className="space-y-6 relative z-10">
                {/* Stars layout */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#AAFF00]" />
                  ))}
                </div>

                <p className="text-white text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed">
                  "I Love The Variety Of Workouts On FiTusion. Whether It's HIIT, Yoga, Or Strength Training, There's Always Something New To Try. The Progress Tracking Tools Keep Me Motivated!"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-6 mt-8 relative z-10">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#AAFF00]">
                    <img className="w-full h-full object-cover" src={TESTIMONIALS[0].avatar} alt="James" />
                  </div>
                  <div>
                    <h4 className="text-white font-extrabold text-base leading-none">- James F.</h4>
                    <span className="text-gray-500 text-xs font-mono font-semibold uppercase">{TESTIMONIALS[0].location}</span>
                  </div>
                </div>

                {/* High Contrast Stars badge */}
                <div className="flex items-center space-x-1.5 bg-[#AAFF00]/10 border border-[#AAFF00]/20 px-4 py-1.5 rounded-full text-[#AAFF00] text-xs font-mono font-bold">
                  <span>★ GOLDEN GRADE MEMBER</span>
                </div>
              </div>

            </div>

            {/* Right Mini Reviews Staggered Block */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
              
              {/* Mini Card 1: Ryen Blaze */}
              <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 flex flex-col justify-between flex-1 relative overflow-hidden hover:border-[#AAFF00]/30 transition-colors">
                <p className="text-gray-400 text-xs leading-relaxed italic">
                  "{TESTIMONIALS[1].quote}"
                </p>
                <div className="flex items-center space-x-3 mt-4 border-t border-white/5 pt-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#AAFF00]">
                    <img className="w-full h-full object-cover" src={TESTIMONIALS[1].avatar} alt="Ryen" />
                  </div>
                  <div>
                    <h5 className="text-white text-xs font-bold">{TESTIMONIALS[1].name}</h5>
                    <span className="text-gray-500 text-[9px] font-mono block uppercase">{TESTIMONIALS[1].stat}</span>
                  </div>
                </div>
              </div>

              {/* Mini Card 2: Ethan Maxx */}
              <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 flex flex-col justify-between flex-1 relative overflow-hidden hover:border-[#AAFF00]/30 transition-colors">
                <p className="text-gray-400 text-xs leading-relaxed italic">
                  "{TESTIMONIALS[2].quote}"
                </p>
                <div className="flex items-center space-x-3 mt-4 border-t border-white/5 pt-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#AAFF00]">
                    <img className="w-full h-full object-cover" src={TESTIMONIALS[2].avatar} alt="Ethan" />
                  </div>
                  <div>
                    <h5 className="text-white text-xs font-bold">{TESTIMONIALS[2].name}</h5>
                    <span className="text-gray-500 text-[9px] font-mono block uppercase">{TESTIMONIALS[2].stat}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Testimonial pagination controls */}
          <div className="flex justify-center items-center space-x-4 mt-12">
            <button 
              onClick={() => {
                setActiveTestimonialIndex(prev => prev > 0 ? prev - 1 : TESTIMONIALS.length - 1);
              }}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#AAFF00] hover:text-[#AAFF00] flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-gray-500">
              01 <span className="text-[#AAFF00]">/</span> 03
            </span>
            <button 
              onClick={() => {
                setActiveTestimonialIndex(prev => prev < TESTIMONIALS.length - 1 ? prev + 1 : 0);
              }}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#AAFF00] hover:text-[#AAFF00] flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>


      {/* -------------------- 10. CONNECT ENGAGE TRANSFORM (NEWSLETTER) -------------------- */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#AAFF00] text-black rounded-[32px] p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center">
          
          {/* Subtle Grid backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="max-w-2xl space-y-6 relative z-10">
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-tighter text-black leading-none uppercase">
              Connect Engage Transform
            </h2>
            <p className="text-black/85 text-xs sm:text-sm md:text-base font-semibold max-w-lg mx-auto">
              Join A Vibrant Community For Fuel Motivation, Engagement Drives Progress, And Transformation
            </p>

            {newsletterSubmitted ? (
              <div className="bg-black text-white px-6 py-4 rounded-2xl inline-flex items-center space-x-2 font-mono text-xs border border-white/10 animate-bounce shadow-xl">
                <Check className="w-4 h-4 text-[#AAFF00]" />
                <span>WELCOME TO THE FITUSION ELITE PLATFORM LIST!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-md mx-auto w-full pt-2">
                <input 
                  type="email" 
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your Email" 
                  className="bg-white text-black text-xs px-5 py-3.5 rounded-full placeholder-black/55 focus:outline-none flex-1 font-semibold border border-transparent focus:border-black/30"
                />
                <button 
                  type="submit"
                  className="bg-black text-[#AAFF00] hover:bg-neutral-900 font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 shadow-xl cursor-pointer shrink-0"
                >
                  Join Now
                </button>
              </form>
            )}
          </div>

        </div>
      </section>


      {/* -------------------- 11. FOOTER SECTION -------------------- */}
      <footer className="bg-[#020202] text-gray-500 text-xs py-16 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-12">
            
            {/* Logo + Slogan */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <div className="absolute w-1.5 h-6 bg-[#AAFF00] transform -skew-x-12 translate-x-[-3px]" />
                  <div className="absolute w-3.5 h-1.5 bg-[#AAFF00] transform -skew-x-12 translate-y-[-6px] translate-x-[1px]" />
                  <div className="absolute w-3 h-1 bg-[#AAFF00] transform -skew-x-12 translate-y-[-1px] translate-x-[0px]" />
                </div>
                <span className="font-bebas text-xl tracking-wider text-white">Fi<span className="text-[#AAFF00]">Tusion</span></span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
                Your Go-To For Personalized Workouts, Meal Plans, And Expert Fitness Advice. Join the physical transformation revolution.
              </p>

              {/* Follow Us On */}
              <div className="space-y-2 pt-2">
                <span className="block text-[10px] text-gray-600 uppercase font-black font-mono tracking-wider">Follow Us On</span>
                <div className="flex items-center space-x-4">
                  {[
                    { icon: 'FB', url: 'https://facebook.com/fitusion' },
                    { icon: 'LN', url: 'https://linkedin.com/company/fitusion' },
                    { icon: 'IG', url: 'https://instagram.com/fitusion' },
                    { icon: 'X', url: 'https://x.com/fitusion' }
                  ].map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-[#AAFF00] hover:text-[#AAFF00] transition-all text-[11px] font-bold font-mono"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-4 space-y-4 text-left">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest font-mono">Directories</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-400 font-medium">
                <button onClick={() => scrollToSection('home')} className="hover:text-[#AAFF00] transition-colors self-start text-left cursor-pointer">Home</button>
                <button onClick={() => scrollToSection('about')} className="hover:text-[#AAFF00] transition-colors self-start text-left cursor-pointer">About</button>
                <button onClick={() => scrollToSection('features')} className="hover:text-[#AAFF00] transition-colors self-start text-left cursor-pointer">Features</button>
                <button onClick={() => scrollToSection('services')} className="hover:text-[#AAFF00] transition-colors self-start text-left cursor-pointer">Service</button>
                <button onClick={() => scrollToSection('exercise')} className="hover:text-[#AAFF00] transition-colors self-start text-left cursor-pointer">Exercise</button>
                <button onClick={() => setIsMacroOpen(true)} className="hover:text-[#AAFF00] text-[#AAFF00]/90 font-bold transition-colors self-start text-left cursor-pointer flex items-center space-x-1">
                  <span>Calibrators</span>
                </button>
              </div>
            </div>

            {/* Contact Info Column */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest font-mono">Contact Info</h4>
              <p className="text-gray-400 leading-relaxed space-y-2">
                <span className="block"><strong className="text-white font-medium">Working Hours:</strong> Monday-Sunday, 8:00 AM - 5:00 PM</span>
                <span className="block"><strong className="text-white font-medium">Email:</strong> <span className="text-[#AAFF00] hover:underline">FiTusion@gmail.com</span></span>
              </p>
            </div>

          </div>

          {/* Bottom attribution */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <span className="text-gray-600">
              © {new Date().getFullYear()} FiTusion Platform. Sculpt your body, elevate your spirit.
            </span>
            <div className="flex space-x-4 text-gray-500 font-bold uppercase tracking-widest">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:text-[#AAFF00] transition-colors">Privacy</a>
              <span>•</span>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-[#AAFF00] transition-colors">Membership Terms</a>
            </div>
          </div>

        </div>
      </footer>


      {/* -------------------- INTERACTIVE POPUP MODALS & SIDEBARS -------------------- */}

      {/* 1. COMPLETED REVOLUTIONARY WEEKLY CALENDAR & SCHEDULE DETAIL MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-48 relative bg-black">
              <img className="w-full h-full object-cover opacity-60" src={selectedCourse.image} alt={selectedCourse.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
              <div className="absolute bottom-6 left-6 text-left space-y-1">
                <span className="bg-[#AAFF00] text-black text-[9px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded uppercase">{selectedCourse.category}</span>
                <h3 className="font-bebas text-4xl text-white tracking-wide">{selectedCourse.title}</h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="block text-[10px] text-gray-500 font-bold tracking-widest font-mono uppercase">ABOUT COURSE OUTLINE</span>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedCourse.description}</p>
              </div>

              {/* Weekly sequence calendar helper inside modal */}
              <div className="border-t border-white/10 pt-5 space-y-4">
                <span className="block text-[10px] text-[#AAFF00] font-black tracking-widest font-mono uppercase">WEEKLY EXERCISE ROTATIONS</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-gray-500 font-bold uppercase text-[9px]">MONDAY / TUESDAY</span>
                    <span className="text-white font-medium block mt-1">Form Correction & Compounding (5 sets x 5 reps)</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-gray-500 font-bold uppercase text-[9px]">THURSDAY / SATURDAY</span>
                    <span className="text-white font-medium block mt-1">Metabolic Overloads & Progressive Conditioning</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/15">
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase px-5 py-3 rounded-full tracking-wider transition-colors cursor-pointer"
                >
                  Close View
                </button>
                <button 
                  onClick={() => { setSelectedCourse(null); scrollToSection('contact'); }}
                  className="bg-[#AAFF00] hover:bg-white text-black font-extrabold text-xs uppercase px-6 py-3 rounded-full tracking-widest transition-colors cursor-pointer"
                >
                  Join Course Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ADVANCED INTERACTIVE DXDIAG HARDWARE AUDIT POPUP */}
      {isAuditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0c0c0c] border border-[#AAFF00]/30 rounded-3xl max-w-4xl w-full p-4 sm:p-6 overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setIsAuditOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto max-h-[85vh] pr-1">
              <GymSpecsAudit />
            </div>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC MACRONUTRIENTS SLIDER CALIBRATOR DRAWER / MODAL */}
      {isMacroOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0c0c0c] border border-white/10 rounded-[32px] max-w-3xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setIsMacroOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <span className="text-[#AAFF00] font-mono font-bold text-[10px] tracking-widest block uppercase">CALIBRATE BIOLOGICAL ENGINE</span>
              <h3 className="font-bebas text-4xl text-white tracking-wide">Macronutrient & BMR Calibrator</h3>
              <p className="text-gray-500 text-xs">Drag weight and height sliders to immediately recalculate TDEE macros targets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
              
              {/* Form Controls Column */}
              <div className="space-y-6">
                
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">CHOOSE FITNESS TARGET</label>
                  <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                    {[
                      { label: 'Bulk Strength', val: 'strength' },
                      { label: 'Shred Lean', val: 'lean' },
                      { label: 'Endurance', val: 'endurance' }
                    ].map((item) => (
                      <button
                        key={item.val}
                        onClick={() => setGoal(item.val)}
                        className={`py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          goal === item.val ? 'bg-[#AAFF00] text-black shadow-lg font-black' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight range slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 uppercase tracking-wider font-mono">WEIGHT</span>
                    <span className="text-[#AAFF00] font-bold font-mono">{weight} KG</span>
                  </div>
                  <input 
                    type="range" 
                    min="40" 
                    max="150" 
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full accent-[#AAFF00] bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                {/* Height range slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 uppercase tracking-wider font-mono">HEIGHT</span>
                    <span className="text-[#AAFF00] font-bold font-mono">{height} CM</span>
                  </div>
                  <input 
                    type="range" 
                    min="130" 
                    max="220" 
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-[#AAFF00] bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
                  />
                </div>

              </div>

              {/* Outputs Column */}
              <div className="bg-black/50 p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block font-mono">Calculated Energy Target (TDEE)</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-black text-[#AAFF00] font-mono">{calculatedBmr}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">kcal / day</span>
                    </div>
                  </div>

                  {/* Micro macronutrients bars */}
                  <div className="space-y-3 font-mono text-[11px] pt-4 border-t border-white/5">
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-gray-400">
                        <span className="font-bold">PROTEIN</span>
                        <span className="text-white">{calculatedMacros.protein}g</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#AAFF00] h-full" style={{ width: `${(calculatedMacros.protein * 4 / calculatedBmr) * 100}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-gray-400">
                        <span className="font-bold">CARBS</span>
                        <span className="text-white">{calculatedMacros.carbs}g</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-400 h-full" style={{ width: `${(calculatedMacros.carbs * 4 / calculatedBmr) * 100}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-gray-400">
                        <span className="font-bold">FATS</span>
                        <span className="text-white">{calculatedMacros.fats}g</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-400 h-full" style={{ width: `${(calculatedMacros.fats * 9 / calculatedBmr) * 100}%` }} />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => setIsMacroOpen(false)}
                    className="w-full bg-[#AAFF00] hover:bg-white text-black font-extrabold text-xs uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg"
                  >
                    Lock-In Meal Formula
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* 4. TRAINER QUICK CONTACT SHEET */}
      {isQuickContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0c0c0c] border border-white/10 rounded-[32px] max-w-md w-full p-6 sm:p-8 text-left relative shadow-2xl">
            <button 
              onClick={() => setIsQuickContactOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#AAFF00]">
                  <img className="w-full h-full object-cover" src={TRAINERS[activeTrainerIndex].image} alt="trainer" />
                </div>
                <div>
                  <h4 className="text-white font-bebas text-3xl tracking-wide leading-none">{TRAINERS[activeTrainerIndex].name}</h4>
                  <span className="text-[#AAFF00] text-xs font-bold">{TRAINERS[activeTrainerIndex].specialtyLabel}</span>
                </div>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Connect directly with {TRAINERS[activeTrainerIndex].name}. Ask about your target muscular splits, barbell programs, or metabolic zones.
              </p>

              <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2.5 font-mono text-[11px]">
                <span className="block text-gray-500 font-bold uppercase tracking-wider">ATHLETIC SCORECARD</span>
                {Object.entries(TRAINERS[activeTrainerIndex].stats).map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400 uppercase">{label}:</span>
                    <span className="text-white font-extrabold">{val}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a 
                  href={`https://wa.me/923337827456?text=Hi%20${TRAINERS[activeTrainerIndex].name},%20I'm%20interested%20in%20coaching%20with%20FiTusion!`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xl hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
