"use client";
import React, { useState } from "react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { MultiStepLoader } from "./ui/multi-step-loader";

const loadingStates = [
  { text: "Analyzing bytecode" },
  { text: "Consulting AI model" },
  { text: "Finalizing vulnerability report" },
];

export const Hero = () => {
  const [contractCode, setContractCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!contractCode.trim()) return;
    setLoading(true);
    // Fake delay to simulate analysis (replace with actual call)
    setTimeout(() => setLoading(false), 4000);
  };

  return (
    <HeroHighlight containerClassName="h-[42rem]">
      <div className="text-center max-w-2xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
          Audit your <Highlight>Smart Contract</Highlight> with AI
        </h1>

        <textarea
          rows={6}
          placeholder="Paste your Solidity code here..."
          className="w-full mt-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={contractCode}
          onChange={(e) => setContractCode(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Analyze with AI
        </button>
      </div>

      <MultiStepLoader
        loading={loading}
        loadingStates={loadingStates}
        duration={1500}
      />
    </HeroHighlight>
  );
};
