import React, { useState, useEffect, useRef } from 'react';
import { 
  Dumbbell, 
  Flame, 
  TrendingUp, 
  Activity, 
  Clock, 
  Target, 
  Utensils, 
  Shield, 
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
  Calculator,
  User,
  Calendar,
  Zap,
  Award,
  Smartphone,
  Send,
  Plus,
  Minus
} from 'lucide-react';

// Pre-defined content data
const BRAND_LOGOS = [
  { name: 'Under Armour', svg: (
    <svg className="h-8 w-auto fill-current opacity-40 hover:opacity-100 hover:text-neon transition-all duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C8.686 0 6 2.686 6 6c0 1.656.672 3.156 1.757 4.243C5.643 11.3 4 13.957 4 17c0 3.866 3.134 7 7 7 1.104 0 2-.896 2-2s-.896-2-2-2c-1.657 0-3-1.343-3-3 0-2.206 1.794-4 4-4s4 1.794 4 4c0 1.657-1.343 3-3 3-1.104 0-2 .896-2 2s.896 2 2 2c3.866 0 7-3.134 7-7 0-3.043-1.643-5.7-3.757-6.757C17.328 9.156 18 7.656 18 6c0-3.314-2.686-6-6-6zm0 4c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"/>
    </svg>
  )},
  { name: 'Nike', svg: (
    <svg className="h-6 w-auto fill-current opacity-40 hover:opacity-100 hover:text-neon transition-all duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 6.5c-2.7 1.8-6.2 3.9-9.5 5.3-2.5 1.1-4.8 1.8-6.8 1.8-1.5 0-2.3-.4-2.3-1.2 0-.9 1.1-2.4 3.4-4.5 1.2-1.1 2.5-2.2 3.7-3.1-1.4.3-2.9.9-4.3 1.8-2.6 1.8-4.2 4.1-4.2 6.1 0 2.5 2.5 3.8 6.5 3.8 3.5 0 7.8-1.5 12.1-4.2 1.4-.9 2.7-1.8 3.9-2.8-.7.4-1.5.8-2.5 1.2z"/>
    </svg>
  )},
  { name: 'Adidas', svg: (
    <svg className="h-8 w-auto fill-current opacity-40 hover:opacity-100 hover:text-neon transition-all duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 19.5L16.2 5.5l-3.3 1.9 6 12.1H24zm-8.2 0L9.4 8.7l-3.3 1.9 4.6 8.9h6.1zm-8.2 0L5.3 15.1l-3.3 1.9 1.4 2.5h4.2z"/>
    </svg>
  )},
  { name: 'Puma', svg: (
    <svg className="h-8 w-auto fill-current opacity-40 hover:opacity-100 hover:text-neon transition-all duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm-1.5-4c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z"/>
    </svg>
  )},
  { name: 'Reebok', svg: (
    <svg className="h-6 w-auto fill-current opacity-40 hover:opacity-100 hover:text-neon transition-all duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 17.5l9-8 11 8H2zm9-9.5l9 8H2l9-8z"/>
    </svg>
  )}
];

const WHAT_SETS_US_APART_CARDS = [
  {
    id: 'cardio',
    tag: 'ENDURANCE',
    title: 'Cardio Training',
    description: 'Elevate your heart rate and blow past metabolic plateaus with customized treadmill, rowing, and cycling protocols curated for peak cardiovascular conditioning.',
    benefits: ['VO2 Max Optimization', 'Fat Oxidation Protocols', 'Heart Rate Zones Tracking'],
    accentColor: 'neon'
  },
  {
    id: 'strength',
    tag: 'POWER',
    title: 'Strength Build',
    description: 'The absolute core of Gold Gym. Train on elite Olympic barbells, custom dumbells up to 150 lbs, and state-of-the-art plate loaded machines built to pack on sheer raw power.',
    benefits: ['Powerlifting & Strength', 'Progressive Overload Tracking', 'Hypertrophy-Centric Coaching'],
    accentColor: 'neon'
  },
  {
    id: 'fatloss',
    tag: 'SHRED',
    title: 'Fat Loss',
    description: 'Shatter body fat using specialized high-intensity metabolic resistance circuits paired with customized local macronutrient coaching designed for sustainable cuts.',
    benefits: ['Metabolic Rate Elevation', 'Personalized Macro Blueprints', '24/7 Progress Auditing'],
    accentColor: 'neon'
  },
  {
    id: 'hiit',
    tag: 'INTENSE',
    title: 'HIIT Workouts',
    description: 'Short, explosive, high-octane circuits combining battle ropes, plyometric boxes, and intense barbell complexes to torch calories and maximize explosive athletic power.',
    benefits: ['EPOC Afterburn Effect', 'Explosive Functional Agility', 'Time-Efficient Endurance'],
    accentColor: 'neon'
  }
];

const PROGRAMS = [
  {
    id: 'prog-1',
    title: 'Barbell Basics',
    category: 'STRENGTH',
    description: 'Master the core compound movements: squat, bench press, deadlift, and overhead military press with flawless form and safety.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prog-2',
    title: 'Kettlebell Masterclass',
    category: 'FUNCTIONAL',
    description: 'Unlock explosive hip drive, core stability, and full-body endurance using dynamic kettlebell swings, snatches, and Turkish get-ups.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prog-3',
    title: 'Cardio Power Boost',
    category: 'ENDURANCE',
    description: 'High-octane intervals on elite self-powered curved treadmills, air bikes, and rowing machines engineered for maximum metabolic stress.',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prog-4',
    title: 'Hypertrophy Protocol',
    category: 'BODYBUILDING',
    description: 'Scientifically calibrated volume, high mechanical tension, and absolute muscle failure training to stimulate maximal muscle fiber growth.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prog-5',
    title: 'Rope Climbing & Calisthenics',
    category: 'BODYWEIGHT',
    description: 'Build a relentless relative strength-to-weight ratio with heavy battle ropes, peg boards, gymnastics rings, and pull-up progressions.',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prog-6',
    title: 'TRX Suspension',
    category: 'CORE & BAL',
    description: 'Leverage your own bodyweight to challenge your deep stabilizer muscles, improve joint health, and develop solid unilateral stability.',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800'
  }
];

const TRAINERS = [
  {
    id: 'trainer-1',
    name: 'Ali Khan',
    specialty: 'Elite Strength & Powerlifting Coach',
    specialtyLabel: 'STRENGTH',
    bio: 'Former Balochistan Powerlifting Champion with 12+ years of professional training experience. Specializes in advanced progressive overload coaching.',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600',
    stats: { squat: '280 kg', bench: '190 kg', deadlift: '310 kg' }
  },
  {
    id: 'trainer-2',
    name: 'Bilal Raza',
    specialty: 'Advanced Bodybuilding & Nutritionist',
    specialtyLabel: 'HYPERTROPHY',
    bio: 'Certified Sports Nutritionist focusing on tailored dynamic macronutrient meal layouts combined with high-volume aesthetic muscle design.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
    stats: { fatLoss: '-15%', muscleGain: '+8kg', activeAthletes: '150+' }
  },
  {
    id: 'trainer-3',
    name: 'Usman Tariq',
    specialty: 'HIIT & Functional Movement Expert',
    specialtyLabel: 'METABOLIC BOOST',
    bio: 'Kettlebell Specialist and mobility expert. Designs extreme cardiovascular conditioning programs that maximize the EPOC calorie burn.',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&q=80&w=600',
    stats: { vo2max: '65 ml/kg', agilityScore: 'Elite', calorieBurn: '900+/hr' }
  }
];

const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'James T.',
    location: 'Quetta, Balochistan',
    quote: "I Love The Variety Of Workouts On Fit Fusion. Whether It's HIIT, Yoga, Or Strength Training, There's Always Something New To Try. The Progress Tracking Tools Keep Me Motivated!",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    stat: 'Lost 22kg in 6 Months'
  },
  {
    id: 'test-2',
    name: 'Ryen Blaze',
    location: 'Quetta Cantonment',
    quote: "Gold Gym Quetta is a beast of its own. The atmosphere here is unlike any other commercial gym. Elite barbells, actual powerlifting racks, and coaches who know what they are doing. Added 50kg to my total!",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    stat: 'Deadlift PR: 240kg'
  },
  {
    id: 'test-3',
    name: 'Ethan Maxx',
    location: 'Jinnah Road, Quetta',
    quote: "The nutrition strategy combined with custom HIIT protocols shattered my stubborn plateau. Down to 8% body fat while retaining raw strength. Highly recommended for busy professionals.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1620122303020-43ec4b6cf7f8?auto=format&fit=crop&q=80&w=200',
    stat: 'Shredded from 18% to 9% Fat'
  }
];

const SCHEDULE = {
  Monday: { focus: 'HEAVY COMPOUND SQUATS & LEGS', duration: '75 min', intensity: 'EXTREME', routine: ['Barbell Back Squats (5x5)', 'Romanian Deadlifts (4x8)', 'Leg Press (Drop Sets)', 'Bulgarian Split Squats (3x10)', 'Calf Raises & Core Burnout'] },
  Tuesday: { focus: 'BENCH PRESS & UPPER HYPERTROPHY', duration: '60 min', intensity: 'HIGH', routine: ['Flat Barbell Bench (5x5)', 'Incline Dumbbell Press (4x8)', 'Weighted Dips (3xAMRAP)', 'Cable Chest Flyes (3x12)', 'Tricep Rope Overhead Extensions'] },
  Wednesday: { focus: 'METABOLIC CONDITIONING & HIIT', duration: '45 min', intensity: 'CRITICAL', routine: ['Kettlebell Swings (10 mins EMOM)', 'Battle Rope Waves (20s on/10s off)', 'Box Jumps & Sled Pushes', 'Curved Treadmill Sprints', 'Hanging Knee Raises'] },
  Thursday: { focus: 'DEADLIFTS & BACK BUILDER', duration: '80 min', intensity: 'EXTREME', routine: ['Conventional Deadlifts (5/3/1 Heavy)', 'Weighted Pull-Ups (4x6)', 'Barbell Bent Over Rows (4x8)', 'Lat Pulldowns (Wide Grip)', 'Seated Dumbbell Rear Delt Flyes'] },
  Friday: { focus: 'MILITARY PRESS & ARMS SHOWDOWN', duration: '60 min', intensity: 'HIGH', routine: ['Standing Overhead Press (4x6)', 'Dumbbell Lateral Raises (4x12)', 'Incline Alternating Bicep Curls', 'Hammer Curls (Heavy)', 'EZ Bar Skull Crushers'] },
  Saturday: { focus: 'BALOCHISTAN POWERLIFT SPECTACULAR', duration: '90 min', intensity: 'EXTREME', routine: ['Heavy Squat Mock-Meet', 'Deadlift Accessory Pulls', 'Farmer Walk Holds (Max Distance)', 'Atlas Stone Lifts', 'Core Plank Rotations'] }
};

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeApartCard, setActiveApartCard] = useState('strength');
  const [activeTrainerIndex, setActiveTrainerIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // Gym Planner State
  const [selectedDay, setSelectedDay] = useState<keyof typeof SCHEDULE>('Monday');

  // Interactive Workout Simulator State
  const [simulatedKcal, setSimulatedKcal] = useState(320);
  const [simulatedSets, setSimulatedSets] = useState(3);
  const [simulatedMins, setSimulatedMins] = useState(25);
  const [activeWorkoutAnim, setActiveWorkoutAnim] = useState(false);

  // Calculator State
  const [weight, setWeight] = useState(78);
  const [height, setHeight] = useState(175);
  const [goal, setGoal] = useState('strength'); // strength, lean, endurance
  const [calculatedBmr, setCalculatedBmr] = useState(0);
  const [calculatedMacros, setCalculatedMacros] = useState({ protein: 0, carbs: 0, fats: 0 });

  // Contact Form State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [membershipType, setMembershipType] = useState('elite');
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Monitor scroll for navbar glow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Recalculate BMR and custom macro targets
  useEffect(() => {
    // Harris-Benedict formula simplified
    const bmr = Math.round(10 * weight + 6.25 * height - 5 * 25 + 5);
    let multiplier = 1.55; // Moderate active
    if (goal === 'strength') multiplier = 1.6;
    if (goal === 'lean') multiplier = 1.5;
    if (goal === 'endurance') multiplier = 1.7;

    const tdee = Math.round(bmr * multiplier);
    
    let proteinGrams = 0;
    let carbsGrams = 0;
    let fatsGrams = 0;

    if (goal === 'strength') {
      // 40% Protein, 40% Carbs, 20% Fats
      proteinGrams = Math.round((tdee * 0.4) / 4);
      carbsGrams = Math.round((tdee * 0.4) / 4);
      fatsGrams = Math.round((tdee * 0.2) / 9);
    } else if (goal === 'lean') {
      // 45% Protein, 30% Carbs, 25% Fats
      proteinGrams = Math.round((tdee * 0.45) / 4);
      carbsGrams = Math.round((tdee * 0.3) / 4);
      fatsGrams = Math.round((tdee * 0.25) / 9);
    } else {
      // 30% Protein, 50% Carbs, 20% Fats
      proteinGrams = Math.round((tdee * 0.3) / 4);
      carbsGrams = Math.round((tdee * 0.5) / 4);
      fatsGrams = Math.round((tdee * 0.2) / 9);
    }

    setCalculatedBmr(tdee);
    setCalculatedMacros({ protein: proteinGrams, carbs: carbsGrams, fats: fatsGrams });
  }, [weight, height, goal]);

  // Handle Workout simulation press
  const handleSimulateLift = () => {
    setActiveWorkoutAnim(true);
    setTimeout(() => {
      setActiveWorkoutAnim(false);
    }, 600);
    setSimulatedKcal(prev => prev + 45);
    setSimulatedSets(prev => prev + 1);
    setSimulatedMins(prev => prev + 5);
  };

  const handleResetSimulate = () => {
    setSimulatedKcal(320);
    setSimulatedSets(3);
    setSimulatedMins(25);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
      }, 5000);
    }
  };

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

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans antialiased selection:bg-neon selection:text-black text-gray-300 relative overflow-x-hidden">
      
      {/* Background radial soft ambient glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-neon/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-neon/4 blur-[150px] pointer-events-none" />
      <div className="absolute top-[75%] left-[20%] w-[500px] h-[500px] rounded-full bg-neon/3 blur-[120px] pointer-events-none" />

      {/* -------------------- STICKY NAVBAR -------------------- */}
      <nav 
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-neon/20 py-4 shadow-lg shadow-black/50' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-10 h-10 bg-neon rounded flex items-center justify-center shadow-[0_0_15px_rgba(170,255,0,0.4)]">
              <Dumbbell className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div>
              <span className="font-bebas text-2xl tracking-wider text-white">GOLD <span className="text-neon">GYM</span></span>
              <span className="block text-[8px] tracking-[0.25em] text-gray-400 font-bold">QUETTA ELITE</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wider uppercase">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About', id: 'about' },
              { label: 'Features', id: 'features' },
              { label: 'Programs', id: 'programs' },
              { label: 'Trainers', id: 'trainers' },
              { label: 'Reviews', id: 'testimonials' },
              { label: 'Schedule', id: 'schedule-section' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors duration-300 hover:text-neon ${
                  activeTab === link.id ? 'text-neon border-b-2 border-neon pb-1' : 'text-gray-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Button */}
          <div>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-transparent hover:bg-neon text-neon hover:text-black border border-neon font-bold py-2 px-5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(170,255,0,0.4)] transform hover:-translate-y-0.5 active:translate-y-0"
              id="nav-contact-btn"
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>


      {/* -------------------- 1. HERO SECTION -------------------- */}
      <section 
        id="home" 
        className="relative min-h-screen pt-24 flex items-center justify-center bg-radial from-[#151a0c] via-[#0a0a0a] to-[#0a0a0a] overflow-hidden"
      >
        {/* Subtle diagonal split background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.8),rgba(10,10,10,0.95))] z-10" />
        
        {/* Giant muscular silhouette background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 filter brightness-50 contrast-125 saturate-50"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1920")' }}
        />

        {/* Decorative Grid Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 z-1" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-12 pb-16 flex flex-col justify-between min-h-[calc(100vh-6rem)]">
          
          {/* Top of Hero Container */}
          <div></div>

          {/* Core Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
            
            {/* Left Column: Big Headlines */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Members count tag */}
              <div className="inline-flex items-center space-x-3 bg-neon/10 border border-neon/30 rounded-full px-4 py-1.5 backdrop-blur-md">
                <div className="flex -space-x-2">
                  <img className="w-7 h-7 rounded-full border-2 border-black object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80" alt="Athlete Member" />
                  <img className="w-7 h-7 rounded-full border-2 border-black object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80" alt="Athlete Member" />
                  <img className="w-7 h-7 rounded-full border-2 border-black object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=80" alt="Athlete Member" />
                </div>
                <div className="text-xs font-semibold tracking-wider text-white">
                  <span className="text-neon font-black">2K+ ACTIVE</span> SQUAD MEMBERS
                </div>
              </div>

              {/* Huge Cinematic Headline */}
              <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-white select-none">
                FORGE YOUR <span className="text-neon">BODY</span>,<br />
                ELEVATE YOUR <span className="text-stroke-neon font-bold tracking-widest block sm:inline">SPIRIT</span>
              </h1>

              {/* Description */}
              <p className="text-gray-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
                Welcome to Quetta's absolute peak of functional training. Equipped with heavy Olympic iron, elite coaching programs, and an unbreakable local powerlifting culture. No excuses. Only results.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-neon hover:bg-neon-bright text-black font-extrabold text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(170,255,0,0.5)] hover:scale-105 active:scale-95 flex items-center space-x-2"
                  id="hero-cta-get-started"
                >
                  <span>LET'S START &gt;&gt;&gt;</span>
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="bg-transparent hover:bg-white/10 text-white font-extrabold text-sm uppercase tracking-widest px-8 py-4 rounded-full border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                  id="hero-cta-learn-more"
                >
                  LEARN MORE
                </button>
              </div>

            </div>

            {/* Right Column: Floating Interactive Widgets with Muscular Backdrop */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              
              {/* Gym tracker mock frame */}
              <div className="w-full max-w-sm bg-gym-card/85 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative z-20 space-y-6">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-neon/15 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-neon" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-400 font-bold tracking-wider">LIVE SIMULATOR</h4>
                      <h3 className="text-sm font-bold text-white uppercase">Your Target Burn</h3>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-black tracking-widest uppercase animate-pulse">ACTIVE LIVE</span>
                </div>

                {/* Simulated Values Display */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase">ENERGY</span>
                    <span className="text-xl font-black text-neon tracking-tight">{simulatedKcal} <span className="text-[10px] font-normal text-gray-400">kcal</span></span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase">VOLUME</span>
                    <span className="text-xl font-black text-white tracking-tight">{simulatedSets} <span className="text-[10px] font-normal text-gray-400">sets</span></span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase">DURATION</span>
                    <span className="text-xl font-black text-white tracking-tight">{simulatedMins} <span className="text-[10px] font-normal text-gray-400">mins</span></span>
                  </div>
                </div>

                {/* Complete Set Button simulator */}
                <div className="space-y-3">
                  <button 
                    onClick={handleSimulateLift}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 ${
                      activeWorkoutAnim 
                        ? 'bg-neon-bright text-black scale-95 shadow-[0_0_25px_rgba(170,255,0,0.8)]' 
                        : 'bg-white text-black hover:bg-neon hover:text-black hover:shadow-[0_0_20px_rgba(170,255,0,0.3)]'
                    }`}
                  >
                    <Dumbbell className={`w-4 h-4 ${activeWorkoutAnim ? 'animate-bounce' : ''}`} />
                    <span>{activeWorkoutAnim ? 'SET EXECUTED! (+45KCAL)' : 'SIMULATE HEAVY LIFT'}</span>
                  </button>
                  
                  <button 
                    onClick={handleResetSimulate}
                    className="w-full text-center text-[10px] uppercase font-bold text-gray-500 hover:text-red-400 transition-colors"
                  >
                    Reset Simulated Workout Tracker
                  </button>
                </div>

                {/* Additional floating highlights */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs bg-black/20 p-2 rounded border border-white/5">
                    <span className="text-gray-400 flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-neon" /> Chiltan Strength Session</span>
                    <span className="text-neon font-bold">1.5 Hours</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-black/20 p-2 rounded border border-white/5">
                    <span className="text-gray-400 flex items-center"><Target className="w-3.5 h-3.5 mr-1.5 text-neon" /> Squat Target Prep</span>
                    <span className="text-white font-bold">20 Reps Left</span>
                  </div>
                </div>

              </div>

              {/* Decorative floating widgets on sides */}
              <div className="absolute -left-12 top-1/4 hidden xl:block bg-black/80 border border-white/10 p-3.5 rounded-2xl shadow-xl z-25 text-left transform -rotate-6">
                <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider">FAT BURNING</span>
                <span className="font-bebas text-3xl text-neon tracking-wider">93% SPEED</span>
                <span className="block text-[9px] text-gray-400">Peak Performance Zone</span>
              </div>

              <div className="absolute -right-10 bottom-1/4 hidden xl:block bg-black/80 border border-white/10 p-3.5 rounded-2xl shadow-xl z-25 text-left transform rotate-3">
                <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider">MAX POWER</span>
                <span className="font-bebas text-3xl text-white tracking-wider">310 KG</span>
                <span className="block text-[9px] text-neon font-black uppercase">Balochistan PR Peak</span>
              </div>

            </div>

          </div>

          {/* Bottom Row: Grayscale brand logos row */}
          <div className="pt-12 border-t border-white/10 mt-12">
            <p className="text-center text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase mb-6">
              PARTNERED WITH THE WORLD'S BEST ATHLETIC LEADERS
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {BRAND_LOGOS.map((logo, index) => (
                <div key={index} className="text-gray-400 flex items-center justify-center">
                  {logo.svg}
                  <span className="ml-2 font-bebas text-sm tracking-widest text-gray-500 hover:text-white transition-colors duration-300">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* -------------------- 2. ABOUT / INSPIRED SECTION -------------------- */}
      <section id="about" className="py-24 bg-[#0d0d0d] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-neon font-black uppercase tracking-[0.3em] text-xs block">OUR ULTIMATE MISSION</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">
              INSPIRED TO INSPIRE YOUR <span className="text-neon">BEST SELF</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Gold Gym is Quetta's legendary strength forge. We don't just lease machinery — we engineer active human potential. Founded in Balochistan to break the fitness mold and construct real, athletic resilience that translates from the gym floor straight into your character.
            </p>
          </div>

          {/* Dark Card Grid containing a majestic design combo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left/Middle Column: 2x3 Grid of Icons and labels */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {[
                {
                  icon: <Utensils className="w-6 h-6 text-neon" />,
                  title: 'Nutrition Guidance',
                  desc: 'Custom macro guidelines calibrated for local Pakistani dietary lifestyles, optimizing real energy and physical composition.'
                },
                {
                  icon: <Users className="w-6 h-6 text-neon" />,
                  title: 'Expert Trainers',
                  desc: 'Elite Balochistan powerlifters and verified nutritional specialists guiding your forms to absolute failure safely.'
                },
                {
                  icon: <TrendingUp className="w-6 h-6 text-neon" />,
                  title: 'Progress Tracking',
                  desc: 'Weekly strength audits, physical assessments, and volumetric metrics showing your journey mathematically.'
                },
                {
                  icon: <Award className="w-6 h-6 text-neon" />,
                  title: 'Premium Membership',
                  desc: 'Uncapped 24/7 access to physical equipment, locker structures, dynamic coaching blocks, and dynamic workshops.'
                },
                {
                  icon: <Users className="w-6 h-6 text-neon" />,
                  title: 'Community Support',
                  desc: 'Train with an iron-willed squad of focused powerlifters and athletes pushing you beyond your boundaries.'
                },
                {
                  icon: <Sparkles className="w-6 h-6 text-neon" />,
                  title: 'Next-Level Fitness Support',
                  desc: 'Advanced recovery methods, premium lifting platforms, and professional sports therapy consults.'
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-gym-card/60 p-6 rounded-2xl border border-white/5 hover:border-neon/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center mb-4 group-hover:bg-neon group-hover:text-black transition-colors duration-300">
                    <span className="group-hover:text-black transition-colors">{item.icon}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}

            </div>

            {/* Right Column: Stunning integrated monochrome back photo like in reference */}
            <div className="lg:col-span-5 bg-gym-card rounded-3xl overflow-hidden border border-white/5 relative flex flex-col justify-end p-8 min-h-[400px]">
              
              {/* Image background with overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

              {/* Text content floating on top */}
              <div className="relative z-20 space-y-4">
                <div className="w-10 h-10 bg-neon rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-black" />
                </div>
                <h3 className="font-bebas text-4xl text-white tracking-wide">
                  BALOCHISTAN'S IRON FORGE
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "At Gold Gym, we have engineered an intense, safe culture of heavy compounds, metabolic drive, and physical mastery. No shortcuts allowed here. Build your temple."
                </p>
                <div className="flex items-center space-x-3 text-neon font-black text-xs tracking-wider">
                  <span>- CHIEF TRAINER, ALI KHAN</span>
                  <div className="flex-1 h-px bg-neon/30" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* -------------------- 3. WHAT SETS US APART -------------------- */}
      <section id="features" className="py-24 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-neon font-black uppercase tracking-[0.3em] text-xs block">EXCLUSIVE CAPABILITIES</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">
              DISCOVER WHAT <span className="text-neon">SETS US APART</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              We deliver a premium fitness atmosphere that's truly unmatched. Explore our four pillars of high-performance physique training. Click any card to preview its advanced guidelines and premium benefit list.
            </p>
          </div>

          {/* Horizontal Interactive Grid Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {WHAT_SETS_US_APART_CARDS.map((card) => {
              const isActive = activeApartCard === card.id;
              return (
                <div 
                  key={card.id}
                  onClick={() => setActiveApartCard(card.id)}
                  className={`cursor-pointer text-left p-8 rounded-3xl transition-all duration-500 relative flex flex-col justify-between ${
                    isActive 
                      ? 'bg-gym-card border-2 border-neon shadow-[0_0_30px_rgba(170,255,0,0.15)] -translate-y-2' 
                      : 'bg-gym-card/40 border border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* Glowing active outline */}
                  {isActive && <div className="absolute top-0 right-0 bg-neon text-black font-extrabold text-[10px] tracking-widest px-3 py-1 rounded-bl-xl rounded-tr-xl">SELECTED</div>}

                  <div className="space-y-6">
                    {/* Tag */}
                    <span className={`font-black text-xs tracking-[0.2em] block ${isActive ? 'text-neon' : 'text-gray-500'}`}>
                      {card.tag}
                    </span>

                    {/* Title */}
                    <h3 className="font-bebas text-3xl text-white tracking-wide">{card.title}</h3>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>
                      {card.description}
                    </p>

                    {/* Benefits List inside selected card */}
                    <div className={`space-y-2 pt-2 transition-all duration-300 ${isActive ? 'opacity-100 max-h-40' : 'opacity-40 max-h-0 overflow-hidden'}`}>
                      <span className="block text-[11px] text-neon font-black tracking-widest uppercase">CORE BENEFITS:</span>
                      {card.benefits.map((b, i) => (
                        <div key={i} className="flex items-center text-xs text-white">
                          <Check className="w-3.5 h-3.5 mr-2 text-neon shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* See Plan / Learn more indicator */}
                  <div className="pt-8">
                    <button 
                      className={`inline-flex items-center text-xs font-bold tracking-widest uppercase group-hover:text-neon transition-colors ${
                        isActive ? 'text-neon' : 'text-gray-400'
                      }`}
                    >
                      <span>SEE DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Dynamic Interactive Panel below based on selection */}
          <div className="mt-12 bg-gym-card/60 border border-white/5 rounded-3xl p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center space-x-2 text-neon text-xs font-bold tracking-widest uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Interactive Elite Feature Details</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Why {WHAT_SETS_US_APART_CARDS.find(c => c.id === activeApartCard)?.title} is a absolute force in Quetta:
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We incorporate customized scientific planning into our {WHAT_SETS_US_APART_CARDS.find(c => c.id === activeApartCard)?.title} sessions. Members are systematically coached using specialized compound sequences and high-tension intervals, ensuring you do not leave any performance gains on the table.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="bg-black/40 text-gray-300 text-xs px-3 py-1 rounded-full border border-white/5">Uncapped Platform Access</span>
                  <span className="bg-black/40 text-gray-300 text-xs px-3 py-1 rounded-full border border-white/5">Assigned Head Coach Auditing</span>
                  <span className="bg-black/40 text-neon text-xs px-3 py-1 rounded-full border border-neon/10 font-bold">Quetta's Only Heavy Olympic Racks</span>
                </div>
              </div>

              <div className="bg-black/50 p-6 rounded-2xl border border-white/5 space-y-4">
                <span className="text-[10px] text-gray-500 font-bold tracking-widest block uppercase">PROGRAM METRIC EST.</span>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Monthly Calorie Deficit Est.</span>
                    <span className="text-neon font-bold">12,000 kcal</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-neon h-full w-[85%]" />
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Est. Lean Mass Increment (12wks)</span>
                    <span className="text-neon font-bold">+4.5 kg</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-neon h-full w-[70%]" />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Cardio / Core Endurance Boost</span>
                    <span className="text-neon font-bold">+40%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-neon h-full w-[90%]" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* -------------------- 4. PROGRAMS SECTION -------------------- */}
      <section id="programs" className="py-24 bg-[#0d0d0d] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-neon font-black uppercase tracking-[0.3em] text-xs block">OUR BRUTAL SCHEDULINGS</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">
              TRAIN SMARTER, UNLEASH YOUR <span className="text-neon">POTENTIAL</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Carefully conceptualized physical courses engineered to challenge physical plateaus. High volume structures combined with dedicated local performance benchmarks.
            </p>
          </div>

          {/* 2-row grid of 6 program cards with dark image backgrounds & neon corner accents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.map((prog) => (
              <div 
                key={prog.id}
                className="group bg-gym-card rounded-2xl overflow-hidden border border-white/5 relative flex flex-col justify-between hover:border-neon/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Neon Corner Accent (Diagonal slash style top-right) */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden z-10">
                  <div className="bg-neon absolute transform rotate-45 top-[-10px] right-[-30px] w-16 h-8 flex items-center justify-center shadow-[0_0_10px_rgba(170,255,0,0.5)]" />
                </div>

                <div>
                  {/* Photo container */}
                  <div className="h-56 relative overflow-hidden bg-black">
                    <img 
                      className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-80 transition-all duration-500" 
                      src={prog.image} 
                      alt={prog.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gym-card via-gym-card/20 to-transparent" />
                    
                    {/* Category pill */}
                    <span className="absolute bottom-4 left-4 bg-black/80 text-neon font-black text-[10px] tracking-widest px-3 py-1 rounded border border-neon/30 uppercase">
                      {prog.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-bebas text-3xl text-white tracking-wide group-hover:text-neon transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                </div>

                {/* Footer block of the card */}
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                  <span>UNLIMITED PLATFORM SQUAD</span>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-white hover:text-neon flex items-center space-x-1.5 transition-colors"
                  >
                    <span>JOIN NOW</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* -------------------- 5. EXPERIENCE SECTION -------------------- */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-neon font-black uppercase tracking-[0.3em] text-xs block">ELITE ECOSYSTEM</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">
              EXPERIENCE FITNESS LIKE <span className="text-neon">NEVER BEFORE</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Transform the exact method you train with revolutionary workout frameworks, elite biometric tracking devices, and professional-grade machinery.
            </p>
          </div>

          {/* Two large feature cards side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card 1: Endurance Evolution */}
            <div className="bg-gym-card rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between group min-h-[420px]">
              
              {/* background image subtle */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-color-dodge hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800")' }}
              />

              <div className="relative z-10 space-y-4">
                <span className="bg-neon/10 border border-neon/30 text-neon font-black text-[10px] tracking-widest px-3 py-1 rounded uppercase inline-block">
                  AEROBIC PEAK
                </span>
                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
                  ENDURANCE EVOLUTION
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
                  Boost your stamina, peak cardiovascular thresholds, and respiratory resilience with custom tailored aerobic intervals and real-time oxygenation metrics.
                </p>

                {/* Floating Heart Rate Widget style */}
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10 max-w-xs flex items-center justify-between shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center animate-pulse">
                      <Flame className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <span className="block text-[9px] text-gray-500 font-bold uppercase">HEART RATE PRESET</span>
                      <span className="text-lg font-bold text-white">95 <span className="text-xs text-red-400 font-normal">BPM</span></span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-neon font-bold">
                    <span>93% STAMINA</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-neon hover:bg-neon-bright text-black font-extrabold text-xs uppercase tracking-widest py-3.5 px-6 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(170,255,0,0.3)] hover:scale-105"
                >
                  START ENDURANCE TRACK &gt;&gt;
                </button>
              </div>

            </div>

            {/* Card 2: Speed Surge */}
            <div className="bg-gym-card rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between group min-h-[420px]">
              
              {/* background image subtle */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-color-dodge hover:scale-105 transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800")' }}
              />

              <div className="relative z-10 space-y-4">
                <span className="bg-neon/10 border border-neon/30 text-neon font-black text-[10px] tracking-widest px-3 py-1 rounded uppercase inline-block">
                  EXPLOSIVE VELOCITY
                </span>
                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">
                  SPEED SURGE
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
                  Shatter reaction boundaries and unlock muscle fiber recruitment with high-velocity resistance cables, ballistic lifting routines, and heavy dynamic complexes.
                </p>

                {/* Floating Speed Metrics Widget style */}
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10 max-w-xs flex items-center justify-between shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-neon/10 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-neon" />
                    </div>
                    <div>
                      <span className="block text-[9px] text-gray-500 font-bold uppercase">EXPLOSIVE REPS</span>
                      <span className="text-lg font-bold text-white">1024 <span className="text-xs text-neon font-normal">STEPS</span></span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-white font-bold">
                    <span>9.2 m/s² FORCE</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-neon hover:bg-neon-bright text-black font-extrabold text-xs uppercase tracking-widest py-3.5 px-6 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(170,255,0,0.3)] hover:scale-105"
                >
                  START SPEED TRACK &gt;&gt;
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* -------------------- 6. TRAINERS SECTION -------------------- */}
      <section id="trainers" className="py-24 bg-[#0d0d0d] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-neon font-black uppercase tracking-[0.3em] text-xs block">ELITE COACHING STAFF</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">
              YOUR FITNESS GOALS, <span className="text-neon">THEIR EXPERTISE</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              We house Balochistan's absolute peak of functional trainers. No casual desk guides — our elite coaches are decorated powerlifters and nutritional authorities.
            </p>
          </div>

          {/* Interactive Trainers Display & Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TRAINERS.map((trainer, index) => {
              const isActive = activeTrainerIndex === index;
              return (
                <div 
                  key={trainer.id}
                  onClick={() => setActiveTrainerIndex(index)}
                  className={`bg-gym-card rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer flex flex-col justify-between group h-full ${
                    isActive 
                      ? 'border-neon shadow-[0_0_35px_rgba(170,255,0,0.15)] scale-102' 
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Grayscale athlete portrait with neon overlay options */}
                    <div className="h-80 relative overflow-hidden bg-black">
                      <img 
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          isActive 
                            ? 'scale-105 mix-blend-normal opacity-100' 
                            : 'mix-blend-luminosity opacity-50 group-hover:opacity-80'
                        }`} 
                        src={trainer.image} 
                        alt={trainer.name} 
                      />
                      
                      {/* Diagonal specialty tag in bottom left */}
                      <span className="absolute bottom-4 left-4 bg-neon text-black font-extrabold text-[10px] tracking-widest px-3 py-1.5 rounded uppercase">
                        {trainer.specialtyLabel}
                      </span>

                      {/* Active green ambient vignette */}
                      {isActive && <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />}
                    </div>

                    {/* Information Content */}
                    <div className="p-6 space-y-3 text-left">
                      <h3 className="font-bebas text-4xl text-white tracking-wide group-hover:text-neon transition-colors">
                        {trainer.name}
                      </h3>
                      <h4 className="text-neon text-xs font-bold uppercase tracking-wider">
                        {trainer.specialty}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {trainer.bio}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic stats row based on trainer specialty */}
                  <div className="p-6 pt-0">
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 grid grid-cols-3 gap-2 text-center text-xs">
                      {Object.entries(trainer.stats).map(([key, val]) => (
                        <div key={key}>
                          <span className="block text-[8px] text-gray-500 font-extrabold uppercase tracking-wider">{key}</span>
                          <span className="font-bebas text-lg text-white tracking-wide">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Active Trainer Dot indicators */}
          <div className="flex justify-center items-center space-x-2 mt-12">
            {TRAINERS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTrainerIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeTrainerIndex === index ? 'w-8 bg-neon' : 'w-2 bg-gray-700 hover:bg-gray-500'
                }`}
                aria-label={`Go to trainer ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </section>


      {/* -------------------- INTERACTIVE BMI & MACRO CALCULATOR -------------------- */}
      <section className="py-24 bg-[#0a0a0a] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description Column */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-neon font-black uppercase tracking-[0.3em] text-xs block">PERSONALIZED BLUEPRINT</span>
              <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight leading-[0.9]">
                BALOCHISTAN<br />POWER <span className="text-neon">CALCULATOR</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Enter your physical metrics to instantly establish scientifically estimated daily calorie and macronutrient targets. Tailored for heavy compound training environments.
              </p>

              {/* Dynamic Balochistan Training Presets */}
              <div className="space-y-4 pt-2">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Select Training Intensity Focus:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    onClick={() => setGoal('strength')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all text-center ${
                      goal === 'strength' 
                        ? 'bg-neon/15 border-neon text-neon shadow-[0_0_15px_rgba(170,255,0,0.15)]' 
                        : 'bg-gym-card/40 border-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    Chiltan Strength
                  </button>
                  <button 
                    onClick={() => setGoal('lean')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all text-center ${
                      goal === 'lean' 
                        ? 'bg-neon/15 border-neon text-neon shadow-[0_0_15px_rgba(170,255,0,0.15)]' 
                        : 'bg-gym-card/40 border-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    Quetta HIIT Boost
                  </button>
                  <button 
                    onClick={() => setGoal('endurance')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all text-center ${
                      goal === 'endurance' 
                        ? 'bg-neon/15 border-neon text-neon shadow-[0_0_15px_rgba(170,255,0,0.15)]' 
                        : 'bg-gym-card/40 border-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    Powerlift Prep
                  </button>
                </div>
              </div>

              {/* Additional Motivational Callout */}
              <div className="bg-gym-card/50 p-4 rounded-xl border border-white/5 flex items-start space-x-3 text-xs">
                <Shield className="w-5 h-5 text-neon shrink-0 mt-0.5" />
                <p className="text-gray-400 leading-relaxed">
                  <strong className="text-white">Note:</strong> These metrics are optimized to sustain skeletal integrity under severe loads. Consult our coaches in Jinnah Road, Quetta for direct custom bloodwork integrations.
                </p>
              </div>

            </div>

            {/* Right Interactive Inputs and Results Panel */}
            <div className="lg:col-span-7 bg-gym-card rounded-3xl p-8 border border-white/5 space-y-8">
              
              {/* Form Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Weight slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>YOUR WEIGHT:</span>
                    <span className="text-neon">{weight} KG</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-black/40 p-2 rounded-xl border border-white/5">
                    <button 
                      onClick={() => setWeight(prev => Math.max(40, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-neon hover:text-black flex items-center justify-center transition-colors text-white text-lg font-bold"
                    >
                      -
                    </button>
                    <input 
                      type="range" 
                      min="40" 
                      max="150" 
                      value={weight} 
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="flex-1 accent-neon cursor-pointer bg-neutral-800"
                    />
                    <button 
                      onClick={() => setWeight(prev => Math.min(150, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-neon hover:text-black flex items-center justify-center transition-colors text-white text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Height slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>YOUR HEIGHT:</span>
                    <span className="text-neon">{height} CM</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-black/40 p-2 rounded-xl border border-white/5">
                    <button 
                      onClick={() => setHeight(prev => Math.max(120, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-neon hover:text-black flex items-center justify-center transition-colors text-white text-lg font-bold"
                    >
                      -
                    </button>
                    <input 
                      type="range" 
                      min="120" 
                      max="220" 
                      value={height} 
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="flex-1 accent-neon cursor-pointer bg-neutral-800"
                    />
                    <button 
                      onClick={() => setHeight(prev => Math.min(220, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-neon hover:text-black flex items-center justify-center transition-colors text-white text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>

              {/* Dynamic Output Layout */}
              <div className="bg-black/50 p-6 rounded-2xl border border-white/10 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-2">
                  <div>
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">RECOMMENDED ENERGY INTENTION</h4>
                    <span className="font-bebas text-4xl text-neon tracking-wide">{calculatedBmr} <span className="text-lg font-normal text-white">CALORIES / DAY</span></span>
                  </div>
                  <span className="bg-neon/15 text-neon font-black text-xs px-3 py-1.5 rounded uppercase tracking-wider inline-block">
                    {goal === 'strength' ? 'CALORIC SURPLUS PREPARATION' : goal === 'lean' ? 'METABOLIC DEFICIT DRIFT' : 'ENDURANCE MAINTENANCE'}
                  </span>
                </div>

                {/* Macrometric components */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Protein */}
                  <div className="bg-gym-card p-4 rounded-xl border border-white/5 text-left">
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">
                      <span>PROTEIN</span>
                      <span className="text-neon font-black">40% TARGET</span>
                    </div>
                    <span className="font-bebas text-3xl text-white tracking-wide">{calculatedMacros.protein}g</span>
                    <span className="block text-[10px] text-gray-400 mt-1">Muscle regeneration support</span>
                  </div>

                  {/* Carbs */}
                  <div className="bg-gym-card p-4 rounded-xl border border-white/5 text-left">
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">
                      <span>CARBS</span>
                      <span className="text-neon font-black">40% TARGET</span>
                    </div>
                    <span className="font-bebas text-3xl text-white tracking-wide">{calculatedMacros.carbs}g</span>
                    <span className="block text-[10px] text-gray-400 mt-1">ATP cellular restoration</span>
                  </div>

                  {/* Fats */}
                  <div className="bg-gym-card p-4 rounded-xl border border-white/5 text-left">
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">
                      <span>FATS</span>
                      <span className="text-neon font-black">20% TARGET</span>
                    </div>
                    <span className="font-bebas text-3xl text-white tracking-wide">{calculatedMacros.fats}g</span>
                    <span className="block text-[10px] text-gray-400 mt-1">Hormonal & joint support</span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* -------------------- INTERACTIVE WEEKLY GYM PLANNER -------------------- */}
      <section id="schedule-section" className="py-24 bg-[#0d0d0d] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-neon font-black uppercase tracking-[0.3em] text-xs block">OPERATIONAL CALENDAR</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">
              SQUAD TRAINING <span className="text-neon">SCHEDULES</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              We operate 6 days a week with extreme intensity disciplines. Select a day below to examine our expert coach-guided programming schedule.
            </p>
          </div>

          {/* Interactive Day Selection tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {(Object.keys(SCHEDULE) as Array<keyof typeof SCHEDULE>).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`py-3 px-6 rounded-full font-bold text-xs uppercase tracking-widest border transition-all duration-300 ${
                  selectedDay === day 
                    ? 'bg-neon text-black border-neon shadow-[0_0_20px_rgba(170,255,0,0.4)] hover:scale-105' 
                    : 'bg-gym-card/50 border-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule Detail Box */}
          <div className="max-w-4xl mx-auto bg-gym-card border border-white/5 rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Daily Focus Callout */}
              <div className="md:col-span-5 space-y-4 text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
                <div className="inline-flex items-center text-xs text-neon font-bold uppercase tracking-widest bg-neon/10 px-3 py-1 rounded">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span>{selectedDay} FOCUS</span>
                </div>
                <h3 className="font-bebas text-4xl text-white tracking-wide leading-tight">
                  {SCHEDULE[selectedDay].focus}
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ESTIMATED DURATION:</span>
                    <span className="text-white font-bold">{SCHEDULE[selectedDay].duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">INTENSITY THRESHOLD:</span>
                    <span className="text-red-400 font-bold">{SCHEDULE[selectedDay].intensity}</span>
                  </div>
                </div>
              </div>

              {/* Routine Exercises list */}
              <div className="md:col-span-7 text-left space-y-4">
                <h4 className="text-xs text-neon font-bold uppercase tracking-widest">COACH-GUIDED CIRCUITS:</h4>
                <div className="space-y-3">
                  {SCHEDULE[selectedDay].routine.map((ex, index) => (
                    <div 
                      key={index} 
                      className="flex items-center space-x-3 bg-black/40 p-3.5 rounded-xl border border-white/5 hover:border-neon/20 transition-all duration-300"
                    >
                      <div className="w-6 h-6 rounded bg-neon/15 text-neon font-black text-xs flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="text-white font-medium text-sm">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* -------------------- 7. TESTIMONIALS -------------------- */}
      <section id="testimonials" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-neon font-black uppercase tracking-[0.3em] text-xs block">VERIFIED SQUAD REVIEWS</span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-tight">
              YOUR SUCCESS STORIES, <span className="text-neon">OUR INSPIRATION</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Read pure, unfiltered motivational chronicles written by authentic local Quetta gym members who pushed past plateaus.
            </p>
          </div>

          {/* Interactive Testimonial Slider / Carousel */}
          <div className="max-w-5xl mx-auto bg-gym-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative min-h-[450px] flex flex-col justify-between">
            
            {/* Background glowing watermark gym athlete */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity filter blur-sm"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&q=80&w=800")' }}
            />

            {/* Slider Content */}
            <div className="p-8 sm:p-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Reviewer Grayscale Portrait & stat */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full border-4 border-neon overflow-hidden shadow-lg shadow-neon/10">
                  <img 
                    className="w-full h-full object-cover" 
                    src={TESTIMONIALS[activeTestimonialIndex].avatar} 
                    alt={TESTIMONIALS[activeTestimonialIndex].name} 
                  />
                </div>
                <div>
                  <h3 className="font-bebas text-2xl text-white tracking-wide">{TESTIMONIALS[activeTestimonialIndex].name}</h3>
                  <span className="text-xs text-neon uppercase font-bold tracking-wider">{TESTIMONIALS[activeTestimonialIndex].location}</span>
                </div>
                <span className="bg-neon/10 text-neon font-extrabold text-[10px] tracking-widest px-3 py-1 rounded-full border border-neon/20 uppercase">
                  {TESTIMONIALS[activeTestimonialIndex].stat}
                </span>
              </div>

              {/* Right Column: Quote and stars */}
              <div className="lg:col-span-8 text-left space-y-6">
                
                {/* Five Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(TESTIMONIALS[activeTestimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-neon" />
                  ))}
                </div>

                {/* Big Quote */}
                <p className="font-bebas text-3xl sm:text-4xl text-white tracking-wide leading-tight select-none">
                  "{TESTIMONIALS[activeTestimonialIndex].quote}"
                </p>

                {/* Simple Coach Note validation */}
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Check className="w-4 h-4 text-neon shrink-0" />
                  <span>Verified Platinum Member of Jinnah Road branch, Quetta.</span>
                </div>

              </div>

            </div>

            {/* Slider Footer navigation bars */}
            <div className="bg-black/60 p-6 relative z-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Thumbnails to click directly */}
              <div className="flex items-center space-x-3">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTestimonialIndex(idx)}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                      activeTestimonialIndex === idx ? 'border-neon scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-85'
                    }`}
                  >
                    <img className="w-full h-full object-cover" src={t.avatar} alt={t.name} />
                  </button>
                ))}
              </div>

              {/* Arrow navigation buttons */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setActiveTestimonialIndex(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                  className="w-11 h-11 rounded-full bg-gym-card hover:bg-neon hover:text-black text-white flex items-center justify-center border border-white/5 hover:border-neon transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setActiveTestimonialIndex(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                  className="w-11 h-11 rounded-full bg-gym-card hover:bg-neon hover:text-black text-white flex items-center justify-center border border-white/5 hover:border-neon transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* -------------------- 8. CONTACT / CTA SECTION (FULL WIDTH NEON GREEN) -------------------- */}
      <section id="contact" className="bg-neon relative overflow-hidden py-16">
        
        {/* Subtle dynamic grid pattern for aesthetics */}
        <div className="absolute inset-0 bg-[radial-gradient(#000_15%,transparent_16%)] bg-[size:16px_16px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left big bold typographic statement */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <span className="text-black font-black uppercase tracking-[0.25em] text-xs block">JOIN THE ELITE BALOCHISTAN CLUB</span>
              <h2 className="font-bebas text-6xl sm:text-7xl md:text-8xl text-black tracking-tight leading-[0.8] select-none">
                CONNECT.<br />ENGAGE.<br />TRANSFORM.
              </h2>
              <p className="text-black/80 font-bold text-sm sm:text-base max-w-md">
                Claim your pass at Quetta's premier high-performance physical facility. Ready-to-lift compound barbells, expert sports therapy, and premium lockers await.
              </p>
              
              {/* Local location address */}
              <div className="space-y-2 pt-2 text-black font-black text-xs sm:text-sm tracking-wider uppercase">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-black stroke-[2.5]" />
                  <span>Jinnah Road / Cantonment near Chiltan, Quetta, Balochistan, Pakistan</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-black stroke-[2.5]" />
                  <span>+92 333 7812345 (Direct Gym Desk)</span>
                </div>
              </div>
            </div>

            {/* Right Contact submission Form with live validation */}
            <div className="lg:col-span-6">
              
              <div className="bg-black text-white p-8 rounded-3xl shadow-2xl relative">
                
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-neon/10 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-neon" />
                    </div>
                    <h3 className="font-bebas text-3xl text-white tracking-wide">MEMBERSHIP REQUEST SUBMITTED</h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">
                      Assalam-o-Alaikum, <strong className="text-white">{name}</strong>! Our Head Coach is auditing your details. Expect a direct invitation on WhatsApp / Email within 6 hours.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-neon hover:underline font-bold uppercase tracking-wider block mx-auto pt-4"
                    >
                      Submit Another Membership Pass Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                    
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h3 className="font-bebas text-3xl tracking-wide text-white">GET YOUR PLATINUM PASS</h3>
                      <span className="text-[10px] bg-neon/10 text-neon font-bold tracking-widest px-2.5 py-1 rounded">LIMITED SLOTS LEFT</span>
                    </div>

                    {/* Name input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">YOUR NAME:</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sardar Hamza Khan" 
                        className="w-full bg-gym-card text-white text-sm px-4 py-3 rounded-xl border border-white/5 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon transition-all"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">EMAIL ADDRESS:</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. hamza@quetta.com" 
                        className="w-full bg-gym-card text-white text-sm px-4 py-3 rounded-xl border border-white/5 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon transition-all"
                      />
                    </div>

                    {/* Select Package option */}
                    <div className="space-y-1">
                      <label className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">MEMBERSHIP CATEGORY:</label>
                      <select 
                        value={membershipType}
                        onChange={(e) => setMembershipType(e.target.value)}
                        className="w-full bg-gym-card text-white text-sm px-4 py-3 rounded-xl border border-white/5 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon transition-all cursor-pointer"
                      >
                        <option value="elite">Platinum Unlimited Plan — Rs. 6,500/mo</option>
                        <option value="standard">Standard Compound Plan — Rs. 4,000/mo</option>
                        <option value="student">Student Strong Plan — Rs. 3,000/mo</option>
                        <option value="vip">Personal Heavy Coaching — Rs. 15,000/mo</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      className="w-full bg-neon hover:bg-neon-bright text-black font-extrabold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(170,255,0,0.3)] hover:scale-102 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-black" />
                      <span>SECURE MY ELITE MEMBERSHIP PASS</span>
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* -------------------- 9. FOOTER -------------------- */}
      <footer className="bg-black/95 text-gray-400 pt-16 pb-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
            
            {/* Column 1: Brand Info */}
            <div className="md:col-span-4 space-y-4 text-left">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
                <div className="w-9 h-9 bg-neon rounded flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-bebas text-xl tracking-wider text-white">GOLD <span className="text-neon">GYM</span></span>
                  <span className="block text-[7px] tracking-[0.25em] text-gray-400 font-bold">QUETTA ELITE</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed max-w-sm">
                The absolute iron benchmark of Quetta. Proudly engineering athletic performance, heavy powerlifting integrity, and resilient body dynamics in Balochistan, Pakistan since 2018.
              </p>
              
              {/* Social icons */}
              <div className="flex items-center space-x-3 pt-2">
                {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((s) => (
                  <a 
                    key={s} 
                    href="#" 
                    className="w-8 h-8 rounded-full bg-gym-card hover:bg-neon hover:text-black flex items-center justify-center border border-white/5 text-gray-400 hover:border-neon transition-all duration-300 text-xs"
                    title={s}
                  >
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="text-xs text-white font-extrabold uppercase tracking-widest border-l-2 border-neon pl-2.5">NAVIGATION</h4>
              <ul className="space-y-2 text-xs">
                {[
                  { label: 'Home Page Focus', id: 'home' },
                  { label: 'Our Mission & Story', id: 'about' },
                  { label: 'Exclusive Features', id: 'features' },
                  { label: 'Elite Programs List', id: 'programs' },
                  { label: 'Coaching Directory', id: 'trainers' },
                  { label: 'Calculators & Presets', id: 'schedule-section' }
                ].map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      className="hover:text-neon hover:underline transition-colors cursor-pointer text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact & Hours */}
            <div className="md:col-span-5 space-y-4 text-left">
              <h4 className="text-xs text-white font-extrabold uppercase tracking-widest border-l-2 border-neon pl-2.5">CONTACTS & HOURS</h4>
              <div className="space-y-3 text-xs">
                
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                  <span>Jinnah Road / Cantonment near Chiltan, Quetta, Balochistan, Pakistan</span>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Clock className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-white font-bold">MONDAY - SATURDAY:</span>
                    <span className="block">Morning: 06:00 AM - 11:00 AM</span>
                    <span className="block">Evening: 04:00 PM - 11:00 PM</span>
                    <span className="block text-red-400 font-extrabold mt-1">SUNDAY: RECOVERY (CLOSED)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Mail className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                  <span>join@goldgymquetta.com</span>
                </div>

              </div>
            </div>

          </div>

          {/* Copyright and signature */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
            <div className="text-left">
              <span>© {new Date().getFullYear()} Gold Gym Quetta. All Rights Reserved.</span>
              <span className="block sm:inline sm:ml-2">Elite Strength & Conditioning, Balochistan.</span>
            </div>
            <div className="text-right">
              <span>Designed with supreme dedication for Balochistan's powerlifters.</span>
            </div>
          </div>

        </div>
      </footer>


      {/* -------------------- FLOATING WHATSAPP BUTTON -------------------- */}
      <a 
        href="https://wa.me/923337812345?text=Hi%20Gold%20Gym%20Quetta,%20I%20am%20interested%20in%20joining%20the%20elite%20training%20squad!%20Please%20guide%20me%20on%20membership%20slots." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        id="whatsapp-floating-btn"
        title="Chat on WhatsApp with Gold Gym Quetta"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-xs font-black uppercase tracking-wider group-hover:pr-3 select-none">
          CHAT WITH US
        </span>
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.541 0 10.05-4.505 10.053-10.041.002-2.683-1.041-5.205-2.939-7.106C16.59 1.556 14.075.512 11.393.512c-5.545 0-10.055 4.506-10.058 10.044-.002 1.933.51 3.816 1.483 5.503L1.812 21.88l6.096-1.598-1.261-.728z"/>
        </svg>
      </a>

    </div>
  );
}
