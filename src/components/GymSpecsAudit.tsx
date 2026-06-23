import React, { useState } from 'react';
import { Cpu, Database, HardDrive, ShieldCheck, Zap, Award, Flame, RotateCcw } from 'lucide-react';

export default function GymSpecsAudit() {
  const [tested, setTested] = useState(false);
  const [testing, setTesting] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<'your-pc' | 'basic-pc' | 'supercomputer'>('your-pc');

  // Hardcoded DxDiag data for "your-pc"
  const SYSTEM_SPECS = {
    cpu: 'AMD Ryzen 5 PRO 3400G with Radeon Vega Graphics (8 CPUs) ~3.7GHz',
    gpu: 'NVIDIA GeForce GTX 960 (4GB Dedicated VRAM)',
    ram: '8192 MB (8GB) Dual-Channel High-Speed RAM',
    os: 'Windows 10 Pro 64-bit (10.0, Build 19045)',
    bios: 'F58b UEFI (Gigabyte A320M-S2H Master Motherboard)',
    storage: 'C: [SSD] 128GB + F/G: [SATA HDD] 500GB'
  };

  const handleRunAudit = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      setTested(true);
    }, 1800);
  };

  const handleReset = () => {
    setTested(false);
  };

  return (
    <div id="system-audit" className="bg-[#121212] border border-[#AAFF00]/20 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
      {/* Decorative neon ambient background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#AAFF00]/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6">
        <div className="text-left space-y-2">
          <div className="inline-flex items-center space-x-2 bg-[#AAFF00]/10 border border-[#AAFF00]/30 text-[#AAFF00] font-black text-[10px] tracking-widest px-3 py-1 rounded-full uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>EXCLUSIVE SYSTEM COUPLING</span>
          </div>
          <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-wide">
            HARDWARE POWER <span className="text-[#AAFF00]">BENCHMARK AUDIT</span>
          </h3>
          <p className="text-gray-400 text-sm max-w-xl">
            Compare your hardware specs to your equivalent athletic lifting capacity. Let's convert processing cores into deadlift power!
          </p>
        </div>

        {/* Profile Selector */}
        <div className="flex items-center space-x-2 bg-black/40 p-1.5 rounded-xl border border-white/5 self-start md:self-auto">
          <button 
            onClick={() => { setSelectedProfile('your-pc'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedProfile === 'your-pc' ? 'bg-[#AAFF00] text-black shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            Your DxDiag
          </button>
          <button 
            onClick={() => { setSelectedProfile('basic-pc'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedProfile === 'basic-pc' ? 'bg-[#AAFF00] text-black shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            Basic Mobile
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Specs Display Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3.5 text-left font-mono">
            <div className="flex justify-between items-center text-xs text-[#AAFF00] border-b border-white/15 pb-2">
              <span>SYSTEM DIAGNOSTIC REPORT</span>
              <span>STATUS: ONLINE</span>
            </div>

            {selectedProfile === 'your-pc' ? (
              <>
                <div className="flex items-start justify-between text-xs gap-4">
                  <span className="text-gray-500 shrink-0 uppercase flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-gray-400" /> PROCESSOR
                  </span>
                  <span className="text-white text-right font-medium">{SYSTEM_SPECS.cpu}</span>
                </div>
                <div className="flex items-start justify-between text-xs gap-4">
                  <span className="text-gray-500 shrink-0 uppercase flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-gray-400" /> GRAPHICS CARD
                  </span>
                  <span className="text-white text-right font-medium">{SYSTEM_SPECS.gpu}</span>
                </div>
                <div className="flex items-start justify-between text-xs gap-4">
                  <span className="text-gray-500 shrink-0 uppercase flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-gray-400" /> RAM CAPACITY
                  </span>
                  <span className="text-white text-right font-medium">{SYSTEM_SPECS.ram}</span>
                </div>
                <div className="flex items-start justify-between text-xs gap-4">
                  <span className="text-gray-500 shrink-0 uppercase flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-gray-400" /> DISK ARRAYS
                  </span>
                  <span className="text-white text-right font-medium">{SYSTEM_SPECS.storage}</span>
                </div>
                <div className="flex items-start justify-between text-xs gap-4">
                  <span className="text-gray-500 shrink-0 uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-gray-400" /> OPERATING SYS
                  </span>
                  <span className="text-white text-right font-medium">{SYSTEM_SPECS.os}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between text-xs gap-4">
                  <span className="text-gray-500 shrink-0 uppercase flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-gray-400" /> PROCESSOR
                  </span>
                  <span className="text-white text-right font-medium">Standard Dual-Core Low Voltage ARM Mobile CPU</span>
                </div>
                <div className="flex items-start justify-between text-xs gap-4">
                  <span className="text-gray-500 shrink-0 uppercase flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-gray-400" /> GRAPHICS CARD
                  </span>
                  <span className="text-white text-right font-medium">Integrated Mobile GPU Core (Low Bandwidth)</span>
                </div>
                <div className="flex items-start justify-between text-xs gap-4">
                  <span className="text-gray-500 shrink-0 uppercase flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-gray-400" /> RAM CAPACITY
                  </span>
                  <span className="text-white text-right font-medium">4096 MB (4GB) LPDDR3 Shared RAM</span>
                </div>
                <div className="flex items-start justify-between text-xs gap-4">
                  <span className="text-gray-500 shrink-0 uppercase flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-gray-400" /> STORAGE
                  </span>
                  <span className="text-white text-right font-medium">64GB eMMC 5.1 Flash Storage</span>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {!tested && !testing ? (
              <button 
                onClick={handleRunAudit}
                className="bg-[#AAFF00] hover:bg-[#C8FF00] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(170,255,0,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                RUN STRENGTH AUDIT &gt;&gt;
              </button>
            ) : testing ? (
              <div className="flex items-center space-x-3 text-white text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-6 py-3.5 rounded-xl">
                <span className="w-4 h-4 border-2 border-t-transparent border-[#AAFF00] rounded-full animate-spin" />
                <span>BENCHMARKING PC FLOPS & SQUAT CONVERSION COEF...</span>
              </div>
            ) : (
              <button 
                onClick={handleReset}
                className="bg-transparent hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RE-RUN DIAGNOSTIC TESTS</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Scoring Column */}
        <div className="lg:col-span-5 bg-black/50 p-6 rounded-2xl border border-white/5 flex flex-col justify-between text-left relative overflow-hidden">
          
          {!tested && !testing ? (
            <div className="my-auto text-center py-8 space-y-3">
              <Award className="w-12 h-12 text-gray-600 mx-auto stroke-[1.5]" />
              <h4 className="text-white font-bold uppercase text-sm tracking-wider">Awaiting Strength Calculation</h4>
              <p className="text-gray-500 text-xs max-w-xs mx-auto">
                Click "RUN STRENGTH AUDIT" to calculate your hardware conversion rank!
              </p>
            </div>
          ) : testing ? (
            <div className="my-auto space-y-4">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="bg-[#AAFF00] h-full rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] text-[#AAFF00] font-bold tracking-widest font-mono uppercase">ANALYZING SPECIFICATION CAPABILITY</span>
                <span className="block text-xs text-gray-400">Comparing hardware multipliers against powerlifting benchmarks...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6 flex flex-col justify-between h-full">
              
              {/* Scoring Top */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">HARDWARE STRENGTH GRADE</span>
                  <span className="text-xs font-black text-[#AAFF00] bg-[#AAFF00]/10 border border-[#AAFF00]/20 px-2 py-0.5 rounded font-mono uppercase">
                    {selectedProfile === 'your-pc' ? 'GRADE S+' : 'GRADE C'}
                  </span>
                </div>

                <h4 className="font-bebas text-4xl text-white tracking-wide">
                  {selectedProfile === 'your-pc' ? 'CHILTAN TITAN LEVEL' : 'CHICKEN WEIGHT LEVEL'}
                </h4>

                <p className="text-gray-400 text-xs leading-relaxed">
                  {selectedProfile === 'your-pc' ? (
                    'Ryzen 5 CPU + GTX 960 GPU provides solid thread cycles to muscular output. Equal to deadlifting 240kg.'
                  ) : (
                    'Low-voltage mobile chips lack compound strength threads. Calibrate with physical barbells to boost biological rates.'
                  )}
                </p>
              </div>

              {/* Multipliers Box */}
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 grid grid-cols-2 gap-4 font-mono">
                <div>
                  <span className="block text-[8px] text-gray-500 uppercase font-bold">Lifting Coef</span>
                  <span className="text-lg font-bold text-white">
                    {selectedProfile === 'your-pc' ? '4.85x MAX' : '1.20x MIN'}
                  </span>
                </div>
                <div>
                  <span className="block text-[8px] text-gray-500 uppercase font-bold">Lifting Bracket</span>
                  <span className="text-lg font-bold text-[#AAFF00]">
                    {selectedProfile === 'your-pc' ? 'HEAVY RIG' : 'LIGHT RIG'}
                  </span>
                </div>
              </div>

              {/* Status footer inside card */}
              <div className="flex items-center space-x-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <Award className="w-4 h-4 text-[#AAFF00]" />
                <span>GOLD GYM QUETTA CERTIFIED HARDWARE</span>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
