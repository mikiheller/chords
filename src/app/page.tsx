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
      <div className="mx-auto max-w-sm px-5 py-20">
        <header className="mb-14 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            chords
          </h1>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-10">
          <Link
            href="/guitar"
            className="group rounded-xl bg-card-bg border border-card-border p-6 transition-all hover:border-accent/30 hover:shadow-sm"
          >
            <div className="text-2xl mb-1">🎸</div>
            <div className="text-sm font-semibold text-foreground">Guitar</div>
          </Link>
          <Link
            href="/ukulele"
            className="group rounded-xl bg-card-bg border border-card-border p-6 transition-all hover:border-accent/30 hover:shadow-sm"
          >
            <div className="text-2xl mb-1">🪕</div>
            <div className="text-sm font-semibold text-foreground">Ukulele</div>
          </Link>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowAdd(!showAdd)}
            className={`text-sm font-medium transition-colors ${
              showAdd
                ? "text-muted hover:text-foreground"
                : "text-accent hover:text-accent-hover"
            }`}
          >
            {showAdd ? "Cancel" : "+ Add a song"}
          </button>
        </div>

        {showAdd && (
          <form
            onSubmit={handleSubmit}
            className="mt-5 rounded-xl bg-card-bg border border-card-border p-5"
          >
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-2.5 text-xs text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex gap-2">
                {(["guitar", "ukulele"] as const).map((inst) => (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setInstrument(inst)}
                    className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                      instrument === inst
                        ? "bg-accent text-white"
                        : "bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    {inst === "guitar" ? "🎸 Guitar" : "🪕 Ukulele"}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Song name, e.g. Strawberry Wine by Deana Carter"
                className="w-full rounded-lg bg-surface px-3 py-2 text-sm placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />

              <input
                type="number"
                min="1"
                max="12"
                value={capo}
                onChange={(e) => setCapo(e.target.value)}
                placeholder="Capo (optional)"
                className="w-24 rounded-lg bg-surface px-3 py-2 text-sm placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />

              <textarea
                value={chords}
                onChange={(e) => setChords(e.target.value)}
                required
                rows={6}
                placeholder={`E C G D x2\n\nChorus\nE C G D`}
                className="w-full rounded-lg bg-surface px-3 py-2.5 text-sm font-mono placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white transition-all hover:bg-accent-hover disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Song"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/chords-dictionary"
            className="text-xs text-muted/40 hover:text-muted transition-colors"
          >
            Chord Dictionary
          </Link>
        </div>
      </div>
    </div>
  );
}
