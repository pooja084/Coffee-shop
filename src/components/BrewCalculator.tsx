import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Droplets, Thermometer, Gauge, Clock, ChevronRight, Check } from 'lucide-react';
import { BREW_METHODS } from '../data/coffeeData';
import { BrewMethod } from '../types/coffee';

export const BrewCalculator: React.FC = () => {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('v60');
  const [coffeeDose, setCoffeeDose] = useState<number>(18);
  const [customRatio, setCustomRatio] = useState<number>(16);

  // Active method
  const currentMethod: BrewMethod =
    BREW_METHODS.find((m) => m.id === selectedMethodId) || BREW_METHODS[0];

  // Sync default ratio when method changes
  useEffect(() => {
    setCustomRatio(currentMethod.ratio);
    setCoffeeDose(currentMethod.defaultDoseGrams);
    setIsRunning(false);
    setCurrentSeconds(0);
  }, [selectedMethodId]);

  // Derived calculations
  const totalWaterGrams = Math.round(coffeeDose * customRatio);

  // Brew Timer State
  const [isRunning, setIsRunning] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Convert step times like "0:45" to seconds for step tracking
  const parseTimeToSeconds = (timeStr: string) => {
    const parts = timeStr.split(':').map(Number);
    return parts[0] * 60 + parts[1];
  };

  // Identify active step based on currentSeconds
  let activeStepIndex = 0;
  for (let i = 0; i < currentMethod.steps.length; i++) {
    const stepSecs = parseTimeToSeconds(currentMethod.steps[i].time);
    if (currentSeconds >= stepSecs) {
      activeStepIndex = i;
    }
  }

  return (
    <section id="brew-guide" className="py-16 sm:py-24 border-b border-[#E8E4DA] bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#827768] mb-2">
            The Atelier Barista Lab
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1816]">
            Interactive Extraction & Ratio Calculator
          </h2>
          <p className="text-sm sm:text-base text-[#5C5549] mt-3 leading-relaxed">
            Brewing exceptional coffee is pure extraction physics. Dial your dose, calculate mineral water targets, and follow our live pour timer for cafe-quality clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Method Selector & Ratios */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Method Tabs (Segmented controls) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BREW_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethodId(method.id)}
                  className={`p-3 rounded-lg text-left border transition-all ${
                    selectedMethodId === method.id
                      ? 'border-[#1A1816] bg-[#1A1816] text-[#FBFBF9] shadow-xs'
                      : 'border-[#DFD9CD] bg-[#FAF8F4] text-[#3E3830] hover:border-[#B5AEA0]'
                  }`}
                >
                  <div className="text-xs font-semibold">{method.name}</div>
                  <div className={`text-[10px] mt-0.5 ${selectedMethodId === method.id ? 'text-[#D0C8B8]' : 'text-[#857B6D]'}`}>
                    1:{method.ratio} Ratio
                  </div>
                </button>
              ))}
            </div>

            {/* Slider / Dose Inputs */}
            <div className="bg-[#FAF8F5] border border-[#E3DDD1] rounded-xl p-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#5C5549]">
                    Coffee Dose (Grams)
                  </label>
                  <span className="font-mono tabular-nums text-lg font-bold text-[#1A1816]">
                    {coffeeDose}g
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="1"
                  value={coffeeDose}
                  onChange={(e) => setCoffeeDose(Number(e.target.value))}
                  className="w-full accent-[#1A1816] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#8C8375] font-mono mt-1">
                  <span>12g (Single Cup)</span>
                  <span>30g (Double Sharing)</span>
                  <span>60g (Full Carafe)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#5C5549]">
                    Brew Ratio (1 : X)
                  </label>
                  <span className="font-mono tabular-nums text-sm font-semibold text-[#1A1816]">
                    1 : {customRatio}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[14, 15, 16, 16.5, 17].map((r) => (
                    <button
                      key={r}
                      onClick={() => setCustomRatio(r)}
                      className={`flex-1 py-1.5 text-xs font-mono font-medium rounded-md border transition-colors ${
                        customRatio === r
                          ? 'border-[#1A1816] bg-[#1A1816] text-[#FBFBF9]'
                          : 'border-[#DDD7CA] bg-white text-[#4A443B] hover:border-[#8E8474]'
                      }`}
                    >
                      1:{r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extraction Specs Output Cards */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EAE5DA]">
                <div className="bg-[#F0ECE3] p-3 rounded-lg">
                  <div className="flex items-center gap-1.5 text-[#73695B] text-[11px] mb-1">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>Target Water</span>
                  </div>
                  <div className="font-mono tabular-nums text-base sm:text-lg font-bold text-[#1A1816]">
                    {totalWaterGrams}g
                  </div>
                </div>

                <div className="bg-[#F0ECE3] p-3 rounded-lg">
                  <div className="flex items-center gap-1.5 text-[#73695B] text-[11px] mb-1">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>Water Temp</span>
                  </div>
                  <div className="font-mono tabular-nums text-base sm:text-lg font-bold text-[#1A1816]">
                    {currentMethod.waterTempC}°C
                  </div>
                  <div className="text-[10px] text-[#7F7668]">({currentMethod.waterTempF}°F)</div>
                </div>

                <div className="bg-[#F0ECE3] p-3 rounded-lg">
                  <div className="flex items-center gap-1.5 text-[#73695B] text-[11px] mb-1">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>Grind Spec</span>
                  </div>
                  <div className="text-xs font-semibold text-[#1A1816] line-clamp-2">
                    {currentMethod.grindSize}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Live Step-by-Step Timer Studio */}
          <div className="lg:col-span-6 bg-[#FAF8F5] border border-[#E3DDD1] rounded-xl p-6 sm:p-8 space-y-6">
            
            {/* Timer Header & Digital Readout */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE5DA]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#827768] block">
                  Brew Timing Engine
                </span>
                <h3 className="font-display text-xl text-[#1A1816]">
                  {currentMethod.name} Pour Guide
                </h3>
              </div>

              {/* Digital Clock */}
              <div className="flex items-center gap-3">
                <div className="font-mono tabular-nums text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1816] bg-[#EDE9DE] px-4 py-2 rounded-lg border border-[#D8D2C3]">
                  {formatTimer(currentSeconds)}
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="p-3 text-[#FBFBF9] bg-[#1A1816] hover:bg-[#312B25] rounded-lg transition-colors shadow-xs"
                    aria-label={isRunning ? 'Pause timer' : 'Start timer'}
                  >
                    {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setIsRunning(false);
                      setCurrentSeconds(0);
                    }}
                    className="p-3 text-[#3E3830] bg-[#ECE7DC] hover:bg-[#DDD7C9] rounded-lg transition-colors"
                    aria-label="Reset timer"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Step list with dynamic progress */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#7A7061] mb-1">
                Extraction Protocol ({currentMethod.totalTime})
              </div>

              {currentMethod.steps.map((step, index) => {
                const isActive = index === activeStepIndex && isRunning;
                const isCompleted = parseTimeToSeconds(step.time) <= currentSeconds && currentSeconds > 0 && index < activeStepIndex;
                
                // Scale target water based on custom dose
                const stepRatioPercent = step.waterTargetGrams / (currentMethod.defaultDoseGrams * currentMethod.ratio);
                const scaledWaterTarget = Math.round(stepRatioPercent * totalWaterGrams);

                return (
                  <div
                    key={step.action}
                    className={`p-3.5 rounded-lg border transition-all ${
                      isActive
                        ? 'border-[#1A1816] bg-[#EDE8DC] shadow-xs'
                        : isCompleted
                        ? 'border-[#E0DBCF] bg-[#FAF8F5] opacity-70'
                        : 'border-[#EBE6DA] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono tabular-nums font-semibold text-[#1A1816] bg-[#E3DDD1] px-1.5 py-0.5 rounded text-[11px]">
                          {step.time}
                        </span>
                        <span className="font-semibold text-[#1A1816]">
                          {step.action}
                        </span>
                      </div>

                      <div className="font-mono tabular-nums font-semibold text-[#8C5D30] text-xs">
                        Target: {scaledWaterTarget}g
                      </div>
                    </div>

                    <p className="text-xs text-[#595247] pl-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] text-[#827869] italic pt-2">
              Tip: Pour in gentle concentric rings starting from center outwards, avoiding pouring directly against the paper filter walls.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
