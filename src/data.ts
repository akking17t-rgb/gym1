export interface BrandLogo {
  name: string;
  logoUrl?: string;
  svg?: string;
}

export interface WhatSetsUsApartCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  benefits: string[];
}

export interface ProgramItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  specialtyLabel: string;
  bio: string;
  image: string;
  stats: Record<string, string>;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
  stat: string;
}

export const BRAND_LOGOS: BrandLogo[] = [
  { name: 'Under Armour' },
  { name: 'Reebok' },
  { name: 'Adidas' },
  { name: 'Puma' },
  { name: 'The North Face' },
  { name: 'Nike' }
];

export const INSPIRED_ITEMS = [
  {
    title: "Nutrition Guidance",
    description: "Customized macronutrient profiles and meal blueprints engineered for your exact metabolic thresholds."
  },
  {
    title: "Expert Trainers",
    description: "Train with certified champions and meal architects committed to flawless compound forms."
  },
  {
    title: "Progress Tracking",
    description: "Real-time auditing of your body composition, volume stats, and recovery milestones."
  },
  {
    title: "Premium Membership",
    description: "Unlock full 24/7 access, elite barbell racks, custom zones, and recovery spaces."
  },
  {
    title: "Community Support",
    description: "Join an elite, high-vibe group of dedicated athletes pushing physical boundaries daily."
  },
  {
    title: "Next-Level Fitness Spaces",
    description: "Equipped with high-performance calibrated plates, specialized bars, and recovery lounges."
  }
];

export const WHAT_SETS_US_APART_CARDS: WhatSetsUsApartCard[] = [
  {
    id: 'cardio',
    tag: 'ENDURANCE',
    title: 'Cardio Training',
    description: 'Boost endurance and heart health with high-energy cardio sessions designed to keep you moving.',
    benefits: ['VO2 Max Tracking', 'Fat Oxidation', 'Heart Zones']
  },
  {
    id: 'strength',
    tag: 'POWER',
    title: 'Strength Build',
    description: 'Develop power and resilience through expert-guided strength training tailored to all fitness levels.',
    benefits: ['Flawless Compounds', 'Progressive Overload', 'Coached Failure']
  },
  {
    id: 'fatloss',
    tag: 'SHRED',
    title: 'Fat Loss',
    description: 'Shed unwanted fat with dynamic workout routines and fat-burning strategies that deliver lasting results.',
    benefits: ['Active Melt Rate', 'Macro Blueprints', 'Progress Auditing']
  },
  {
    id: 'hiit',
    tag: 'INTENSE',
    title: 'HIIT Workouts',
    description: 'Maximize calorie burn and improve fitness with short, intense high-intensity interval training sessions.',
    benefits: ['EPOC Afterburn', 'Athletic Agility', 'Max Calorie Burn']
  }
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'prog-1',
    title: 'Barbell Basics',
    category: 'STRENGTH',
    description: 'Master clean compound barbell movements including squats, deadlifts, and bench presses with flawless coaching.',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prog-2',
    title: 'Kettlebell Masterclass',
    category: 'FUNCTIONAL',
    description: 'Dynamic flows, snatches, and deep explosive core routines for advanced athletic conditioning.',
    image: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prog-3',
    title: 'Cardio Power Boost',
    category: 'ENDURANCE',
    description: 'High-octane treadmill and curved runner sessions targeting metabolic threshold improvements.',
    image: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prog-4',
    title: 'Hypertrophy',
    category: 'BODYBUILDING',
    description: 'Volumetric and mechanical tension splits engineered specifically for premium muscle density and aesthetics.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prog-5',
    title: 'Rope Climbing',
    category: 'BODYWEIGHT',
    description: 'Upper body pulling power, grip strength, and core stabilization routines utilizing heavy ropes.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prog-6',
    title: 'TRX Suspension',
    category: 'CORE & STABILITY',
    description: 'Suspended bodyweight leverage training to isolate deep stabilizers and athletic balance lines.',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800'
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Blake Hunter',
    specialty: 'Elite Strength & Powerlifting Coach',
    specialtyLabel: 'STRENGTH',
    bio: 'Champion powerlifter specializing in compound movement mastery, safe progressive overload, and competitive preparation.',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600',
    stats: { squat: '280 kg', bench: '190 kg', deadlift: '310 kg' }
  },
  {
    id: 'trainer-2',
    name: 'Liam Crossfit',
    specialty: 'Advanced Conditioning & Mobility Coach',
    specialtyLabel: 'METABOLIC',
    bio: 'Crossfit specialist focused on metabolic conditioning, complex kettlebell flows, and cardiovascular threshold extension.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
    stats: { fatLoss: '-15%', muscleGain: '+8kg', athletes: '150+' }
  },
  {
    id: 'trainer-3',
    name: 'Logan Torque',
    specialty: 'Hypertrophy & Meal Architect',
    specialtyLabel: 'HYPERTROPHY',
    bio: 'Dedicated bodybuilder specializing in high-density aesthetic sculpts, dynamic sets, and precision meal coaching.',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&q=80&w=600',
    stats: { vo2max: '65 ml/kg', agility: 'Elite', burn: '900+/hr' }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'James F.',
    location: 'LA, USA',
    quote: "I Love The Variety Of Workouts On FiTusion. Whether It's HIIT, Yoga, Or Strength Training, There's Always Something New To Try. The Progress Tracking Tools Keep Me Motivated!",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    stat: 'Member for 2 Years'
  },
  {
    id: 'test-2',
    name: 'Ryen Blaze',
    location: 'NY, USA',
    quote: "The personalized macro calculations combined with high-intensity strength programs completely rebuilt my physique. Extremely professional environment.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    stat: 'Down 12% Body Fat'
  },
  {
    id: 'test-3',
    name: 'Ethan Maxx',
    location: 'TX, USA',
    quote: "From the calibrated barbell plates to the community atmosphere, FiTusion is the ultimate training facility. Unmatched training guidelines.",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    stat: 'Added 40kg to Lift'
  }
];

export const SCHEDULE = {
  Monday: { 
    focus: 'HEAVY SQUATS & LEGS', 
    duration: '75 min', 
    intensity: 'EXTREME', 
    routine: ['Barbell Back Squats (5x5)', 'Romanian Deadlifts (4x8)', 'Leg Press (Drop Sets)', 'Bulgarian Split Squats (3x10)', 'Seated Calf Raises & Core'] 
  },
  Tuesday: { 
    focus: 'BENCH PRESS & UPPER', 
    duration: '60 min', 
    intensity: 'HIGH', 
    routine: ['Flat Barbell Bench (5x5)', 'Incline Dumbbell Press (4x8)', 'Weighted Chest Dips (3xAMRAP)', 'Cable Chest Flyes (3x12)', 'Tricep Rope Overhead'] 
  },
  Wednesday: { 
    focus: 'METABOLIC HIIT', 
    duration: '45 min', 
    intensity: 'CRITICAL', 
    routine: ['Kettlebell Swings (10 min EMOM)', 'Battle Rope Waves (20s / 10s)', 'Box Jumps & Sled Pushes', 'Curved Treadmill Sprints', 'Hanging Knee Raises & Planks'] 
  },
  Thursday: { 
    focus: 'DEADLIFTS & BACK BUILDER', 
    duration: '80 min', 
    intensity: 'EXTREME', 
    routine: ['Conventional Deadlifts (5/3/1)', 'Weighted Pull-Ups (4x6)', 'Barbell Bent Over Rows (4x8)', 'Lat Pulldowns (Wide Grip)', 'Seated Rear Delt Flyes'] 
  },
  Friday: { 
    focus: 'MILITARY PRESS & ARMS', 
    duration: '60 min', 
    intensity: 'HIGH', 
    routine: ['Standing Overhead Press (4x6)', 'Dumbbell Lateral Raises (4x12)', 'Incline Dumbbell Bicep Curls', 'Hammer Curls (Heavy)', 'EZ Bar Skull Crushers'] 
  },
  Saturday: { 
    focus: 'POWERLIFT SPECTACULAR', 
    duration: '90 min', 
    intensity: 'EXTREME', 
    routine: ['Heavy Squat Mock-Meet', 'Deadlift Accessory Pulls', 'Farmer Walk Holds (Max Dist)', 'Atlas Stone Lifts', 'Core Rotations & Stretching'] 
  }
};
