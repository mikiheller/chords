"use client";

import Link from "next/link";
import { useState } from "react";
import { guitarChords, ukuleleChords } from "@/lib/chords";

type Instrument = "guitar" | "ukulele";

function groupChords(chords: Record<string, string>) {
  const groups: Record<string, [string, string][]> = {};

  for (const [name, pattern] of Object.entries(chords)) {
    let category = "Other";
    if (/^[A-G][#b]?$/.test(name)) category = "Major";
    else if (/m$/.test(name) && !/dim|maj/.test(name)) category = "Minor";
    else if (/^[A-G][#b]?7$/.test(name)) category = "7th";
    else if (/m7$/.test(name) && !name.includes("maj")) category = "Minor 7th";
    else if (/maj7$/.test(name)) category = "Major 7th";
    else if (/sus2$/.test(name)) category = "Sus2";
    else if (/sus4$/.test(name)) category = "Sus4";
    else if (/add9/.test(name)) category = "Add9";
    else if (/dim/.test(name)) category = "Diminished";
    else if (/aug/.test(name)) category = "Augmented";
    else if (/5$/.test(name)) category = "Power (5)";
    else if (/\//.test(name)) category = "Slash";
    else if (/9$/.test(name)) category = "9th";
    else if (/6$/.test(name) && !/m6/.test(name)) category = "6th";
    else if (/m6$/.test(name)) category = "Minor 6th";

    if (!groups[category]) groups[category] = [];
    groups[category].push([name, pattern]);
  }

  return groups;
}

export default function ChordsDictionaryPage() {
  const [instrument, setInstrument] = useState<Instrument>("guitar");
  const chords = instrument === "guitar" ? guitarChords : ukuleleChords;
  const groups = groupChords(chords);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-sm px-5 py-8">
        <nav className="mb-6">
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Home
          </Link>
        </nav>

        <h1 className="text-xl font-bold tracking-tight text-foreground mb-1">
          Chord Dictionary
        </h1>
        <p className="text-xs text-muted mb-5">
          {Object.keys(chords).length} chords &middot;{" "}
          {instrument === "guitar" ? "6" : "4"} strings
        </p>

        <div className="flex gap-2 mb-5">
          {(["guitar", "ukulele"] as const).map((inst) => (
            <button
              key={inst}
              onClick={() => setInstrument(inst)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                instrument === inst
                  ? "bg-accent text-white"
                  : "bg-surface text-muted hover:text-foreground"
              }`}
            >
              {inst === "guitar" ? "🎸 Guitar" : "🪕 Ukulele"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {Object.entries(groups).map(([category, entries]) => (
            <div
              key={category}
              className="rounded-lg bg-card-bg border border-card-border px-4 py-3"
            >
              <h2 className="text-[10px] font-semibold text-muted uppercase tracking-wide mb-2">
                {category}
              </h2>
              <div className="flex gap-x-6 font-mono text-xs">
                {(() => {
                  const mid = Math.ceil(entries.length / 2);
                  const col1 = entries.slice(0, mid);
                  const col2 = entries.slice(mid);
                  return [col1, col2].map((col, ci) => (
                    <div key={ci} className="flex-1 space-y-0.5">
                      {col.map(([name, pattern]) => (
                        <div key={name} className="flex items-baseline">
                          <span className="font-bold text-foreground w-14 shrink-0">
                            {name}
                          </span>
                          <span className="text-muted tracking-wider">{pattern}</span>
                        </div>
                      ))}
                    </div>
                  ));
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
