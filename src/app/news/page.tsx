
"use client";

import { useState } from "react";

type AnalysisResult = {
  score: number;
  label: string;
  summary: string;
  signals: string[];
};

function analyzeNews(text: string): AnalysisResult {
  const content = text.trim();
  const signals: string[] = [];

  const sensationalPatterns = [
    /\b(shocking|unbelievable|miracle|secret exposed)\b/i,
    /\b(share this|forward this|wake up)\b/i,
    /!{2,}/,
    /\b(100% guaranteed|everyone is hiding)\b/i,
  ];

  for (const pattern of sensationalPatterns) {
    if (pattern.test(content)) {
      signals.push("Sensational or highly persuasive wording detected.");
      break;
    }
  }

  if (/\b(always|never|all people|everyone knows)\b/i.test(content)) {
    signals.push("Contains broad or absolute claims.");
  }

  if (/\b(according to|reported by|source:|study published)\b/i.test(content)) {
    signals.push("Mentions a source or study; the source has not been independently checked.");
  } else {
    signals.push("No explicit source attribution was detected.");
  }

  if (content.length < 80) {
    signals.push("Short text provides limited context for assessment.");
  }

  if (signals.length === 1 && content.length >= 80) {
    signals.push("No listed wording warning was detected; this does not establish accuracy.");
  }

  const warningCount = signals.filter(
    (signal) =>
      !signal.startsWith("Mentions a source") &&
      !signal.startsWith("No listed wording"),
  ).length;

  const score = Math.max(25, Math.min(85, 80 - warningCount * 20));

  return {
    score,
    label:
      score >= 65
        ? "Fewer warning signals"
        : score >= 45
          ? "Review recommended"
          : "Multiple warning signals",
    summary:
      "This preliminary result checks wording patterns only. It does not verify the story, identify its original publisher, or establish whether it is true or false.",
    signals,
  };
}

export default function NewsPage() {
  const [newsText, setNewsText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  function handleAnalyze() {
    if (newsText.trim().length < 20) {
      setError("Enter at least 20 characters so there is text to inspect.");
      setResult(null);
      return;
    }

    setError("");
    setResult(analyzeNews(newsText));
  }

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center gap-2 text-sm text-muted">
          <span>VeriTrust</span>
          <span>/</span>
          <span>News credibility</span>
        </div>

        <section className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-[#c47b55]" />
            TEXTUAL SIGNAL ANALYSIS
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Look beyond the headline.
          </h1>

          <p className="max-w-2xl text-base leading-7 text-muted">
            Inspect news text for potentially misleading language, broad
            claims, and missing source attribution before you share it.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Analyze a news excerpt</h2>
                <p className="mt-1 text-sm text-muted">
                  Paste a headline or article excerpt below.
                </p>
              </div>
              <span className="rounded-lg bg-surface-soft px-2.5 py-1 text-xs text-muted">
                Text only
              </span>
            </div>

            <textarea
              value={newsText}
              onChange={(event) => {
                setNewsText(event.target.value);
                setError("");
              }}
              placeholder="Paste a news headline or article excerpt here..."
              rows={9}
              className="w-full resize-y rounded-xl border border-border bg-background p-4 text-sm leading-6 outline-none transition focus:border-[#174a3a] focus:ring-2 focus:ring-[#174a3a]/10"
            />

            <div className="mt-2 flex justify-between text-xs text-muted">
              <span>{newsText.length} characters</span>
              <button
                type="button"
                onClick={() => {
                  setNewsText("");
                  setResult(null);
                  setError("");
                }}
                className="underline underline-offset-4 hover:text-foreground"
              >
                Clear text
              </button>
            </div>

            {error && (
              <p role="alert" className="mt-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleAnalyze}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#174a3a] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#103b2e] sm:w-auto"
            >
              Analyze text <span aria-hidden="true">→</span>
            </button>

            <p className="mt-4 text-xs leading-5 text-muted">
              Demo mode: this analysis uses local wording rules, not live
              fact-checking or an AI verification service.
            </p>
          </div>

          <aside className="rounded-2xl border border-border bg-surface-soft p-5 sm:p-6">
            <h2 className="text-lg font-semibold">What we inspect</h2>
            <div className="mt-5 space-y-5">
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[#174a3a]">
                  01
                </span>
                <div>
                  <h3 className="text-sm font-medium">Sensational wording</h3>
                  <p className="mt-1 text-sm leading-5 text-muted">
                    Phrases that may pressure readers or exaggerate a claim.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[#174a3a]">
                  02
                </span>
                <div>
                  <h3 className="text-sm font-medium">Absolute claims</h3>
                  <p className="mt-1 text-sm leading-5 text-muted">
                    Statements that use sweeping or unconditional language.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[#174a3a]">
                  03
                </span>
                <div>
                  <h3 className="text-sm font-medium">Source attribution</h3>
                  <p className="mt-1 text-sm leading-5 text-muted">
                    Whether the excerpt explicitly mentions a source or study.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {result && (
          <section
            aria-live="polite"
            className="space-y-5 rounded-2xl border border-border bg-surface p-5 sm:p-7"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                  Preliminary analysis
                </p>
                <h2 className="mt-2 text-2xl font-semibold">{result.label}</h2>
              </div>
              <div className="rounded-xl border border-border px-4 py-3 text-right">
                <p className="text-2xl font-semibold tabular-nums">
                  {result.score}/100
                </p>
                <p className="text-xs text-muted">Heuristic indicator</p>
              </div>
            </div>

            <p className="text-sm leading-6 text-muted">{result.summary}</p>

            <div>
              <h3 className="text-sm font-semibold">Signals observed</h3>
              <ul className="mt-3 space-y-3">
                {result.signals.map((signal, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-6">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c47b55]" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-surface-soft p-4 text-sm leading-6">
              <strong>Important limitation:</strong> wording patterns alone
              cannot determine whether a news story is true, false, satire, or
              misleading. Verify important claims with independent,
              reputable sources.
            </div>
          </section>
        )}
      </div>
    </main>
  );
}