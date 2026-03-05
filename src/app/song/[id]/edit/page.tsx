"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Song } from "@/lib/supabase";

export default function EditSongPage() {
  const { id } = useParams();
  const router = useRouter();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [capo, setCapo] = useState("");
  const [chords, setChords] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [instrument, setInstrument] = useState<"guitar" | "ukulele">("guitar");

  useEffect(() => {
    fetch(`/api/songs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSong(data);
          setName(data.name);
          setCapo(data.capo?.toString() || "");
          setChords(data.chords);
          setLyrics(data.lyrics || "");
          setInstrument(data.instrument);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/songs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instrument,
          name,
          capo: capo ? parseInt(capo) : null,
          chords,
          lyrics: lyrics || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      router.push(`/song/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted mb-4">Song not found</p>
          <Link href="/" className="text-sm text-accent hover:text-accent-hover">
            Go home →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-5 py-8">
        <nav className="mb-6">
          <Link
            href={`/song/${id}`}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Cancel
          </Link>
        </nav>

        <h1 className="text-xl font-bold tracking-tight text-foreground mb-6">
          Edit Song
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-2.5 text-xs text-red-600">
              {error}
            </div>
          )}

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
            placeholder="Song name"
            className="w-full rounded-lg bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
          />

          <input
            type="number"
            min="1"
            max="12"
            value={capo}
            onChange={(e) => setCapo(e.target.value)}
            placeholder="Capo (optional)"
            className="w-24 rounded-lg bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
          />

          <textarea
            value={chords}
            onChange={(e) => setChords(e.target.value)}
            required
            rows={8}
            className="w-full rounded-lg bg-surface px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/20"
          />

          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            rows={16}
            placeholder="Lyrics"
            className="w-full rounded-lg bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white transition-all hover:bg-accent-hover disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
