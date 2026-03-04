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
      <div className="mx-auto max-w-xl px-6 py-10">
        <nav className="mb-10">
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Home
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Chord Dictionary
          </h1>
          <p className="mt-1 text-xs text-muted uppercase tracking-wide">
            {Object.keys(chords).length} chords &middot;{" "}
            {instrument === "guitar" ? "6" : "4"} strings
          </p>
        </header>

        <div className="flex gap-2 mb-8">
          {(["guitar", "ukulele"] as const).map((inst) => (
            <button
              key={inst}
              onClick={() => setInstrument(inst)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                instrument === inst
                  ? "bg-accent text-white shadow-sm"
                  : "bg-surface text-muted hover:text-foreground"
              }`}
            >
              {inst === "guitar" ? "🎸 Guitar" : "🪕 Ukulele"}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {Object.entries(groups).map(([category, entries]) => (
            <div
              key={category}
              className="rounded-xl bg-card-bg p-5 ring-1 ring-card-border shadow-sm"
            >
              <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                {category}
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 font-mono text-sm">
                {entries.map(([name, pattern]) => (
                  <div key={name} className="flex items-baseline">
                    <span className="font-semibold text-foreground w-16 shrink-0">
                      {name}
                    </span>
                    <span className="text-muted tracking-widest">{pattern}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
