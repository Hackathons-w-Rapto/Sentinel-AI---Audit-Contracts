"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import removeMarkdown from "remove-markdown";

const loadingStates = [
  { text: "Analyzing bytecode" },
  { text: "Consulting AI model" },
  { text: "Scanning for known exploits" },
  { text: "Finalizing audit report" },
];

type AIResponse = {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
};



export default function SentinelLanding() {
  const [contractCode, setContractCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);
    setError(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: contractCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setReport(data.result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <HeroHighlight containerClassName="bg-gray-50 dark:bg-black">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <Highlight>SentinelAI</Highlight> — Smart Contract Auditor
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Instantly analyze smart contract bytecode using decentralized AI.
            Get insights on known vulnerabilities before you deploy.
          </p>
        </div>
      </HeroHighlight>

      <div className="bg-gray-50 dark:bg-black py-12 px-6 flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl space-y-4 mb-8"
        >
          <textarea
            className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-zinc-900 dark:text-white"
            placeholder="Paste smart contract code..."
            value={contractCode}
            onChange={(e) => setContractCode(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            disabled={loading}
          >
            Audit Contract
          </button>
        </form>

        <Loader
          loading={loading}
          loadingStates={loadingStates}
          duration={2000}
        />

        {loading && (
          <button
            className="fixed top-4 right-4 text-black dark:text-white z-[120]"
            onClick={() => setLoading(false)}
          >
            <IconSquareRoundedX className="h-10 w-10" />
          </button>
        )}

        {error && (
          <div className="w-full max-w-xl bg-red-100 dark:bg-red-900 rounded-xl p-4 mb-4 text-red-800 dark:text-red-200 border border-red-400 dark:border-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        {report && (
          <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-lg border dark:border-zinc-700 transition-all">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              🧪 Vulnerability Report
            </h2>
            {report.candidates && report.candidates[0]?.content?.parts ? (
              <pre className="whitespace-pre-wrap text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 p-6 rounded-lg overflow-x-auto">
                {removeMarkdown(report.candidates[0].content.parts[0].text)}
              </pre>
            ) : (
              <div className="text-gray-600 dark:text-gray-400">
                No vulnerabilities found or unexpected response format.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
