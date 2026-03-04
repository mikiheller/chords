"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showAdd, setShowAdd] = useState(false);
  const [instrument, setInstrument] = useState<"guitar" | "ukulele">("guitar");
  const [name, setName] = useState("");
  const [capo, setCapo] = useState("");
  const [chords, setChords] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instrument,
          name,
          capo: capo ? parseInt(capo) : null,
          chords,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add song");
      }

      const song = await res.json();
      router.push(`/song/${song.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-6 py-20">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            chords
          </h1>
          <p className="mt-3 text-sm tracking-wide text-muted uppercase">
            Guitar &amp; Ukulele
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 mb-14">
          <Link
            href="/guitar"
            className="group relative overflow-hidden rounded-2xl bg-card-bg p-8 shadow-sm ring-1 ring-card-border transition-all hover:shadow-lg hover:ring-accent/30 hover:-translate-y-0.5"
          >
            <div className="text-4xl mb-3">🎸</div>
            <div className="text-lg font-semibold text-foreground">Guitar</div>
            <div className="text-xs text-muted mt-0.5">View songs →</div>
          </Link>

          <Link
            href="/ukulele"
            className="group relative overflow-hidden rounded-2xl bg-card-bg p-8 shadow-sm ring-1 ring-card-border transition-all hover:shadow-lg hover:ring-accent/30 hover:-translate-y-0.5"
          >
            <div className="text-4xl mb-3">🪕</div>
            <div className="text-lg font-semibold text-foreground">Ukulele</div>
            <div className="text-xs text-muted mt-0.5">View songs →</div>
          </Link>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowAdd(!showAdd)}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
              showAdd
                ? "bg-surface text-muted ring-1 ring-card-border"
                : "bg-accent text-white shadow-md shadow-accent/20 hover:bg-accent-hover"
            }`}
          >
            {showAdd ? "Cancel" : "+ Add a Song"}
          </button>
        </div>

        {showAdd && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-2xl bg-card-bg p-7 shadow-sm ring-1 ring-card-border"
          >
            {error && (
              <div className="mb-5 rounded-lg bg-red-50 ring-1 ring-red-200 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex gap-2">
                {(["guitar", "ukulele"] as const).map((inst) => (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setInstrument(inst)}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      instrument === inst
                        ? "bg-accent text-white shadow-sm"
                        : "bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    {inst === "guitar" ? "🎸 Guitar" : "🪕 Ukulele"}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. I Never Told You by Colbie Caillat"
                  className="w-full rounded-lg bg-surface px-4 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">
                  Capo <span className="normal-case text-muted/50">optional</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={capo}
                  onChange={(e) => setCapo(e.target.value)}
                  placeholder="e.g. 6"
                  className="w-24 rounded-lg bg-surface px-4 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wide">
                  Chords
                </label>
                <textarea
                  value={chords}
                  onChange={(e) => setChords(e.target.value)}
                  required
                  rows={7}
                  placeholder={`E C G D x2\n\nPrechorus\nC G C G D\n\nChorus\nE C G D`}
                  className="w-full rounded-lg bg-surface px-4 py-3 text-sm font-mono placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-accent/20 transition-all hover:bg-accent-hover disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Song"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/chords-dictionary"
            className="text-xs text-muted/60 hover:text-accent transition-colors uppercase tracking-wide"
          >
            Chord Dictionary
          </Link>
        </div>
      </div>
    </div>
  );
}
