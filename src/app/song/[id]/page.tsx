"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Song } from "@/lib/supabase";
import { extractChordNames, getChordFingerings } from "@/lib/chords";

export default function SongPage() {
  const { id } = useParams();
  const router = useRouter();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/songs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setSong(null);
        } else {
          setSong(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this song?")) return;
    setDeleting(true);
    try {
      await fetch(`/api/songs/${id}`, { method: "DELETE" });
      router.push(`/${song?.instrument || ""}`);
    } catch {
      setDeleting(false);
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

  const chordNames = extractChordNames(song.chords);
  const fingerings = getChordFingerings(chordNames, song.instrument);
  const unknownChords = chordNames.filter((name) => !fingerings[name]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-6 py-10">
        {/* Nav */}
        <nav className="flex items-center justify-between mb-10">
          <Link
            href={`/${song.instrument}`}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Back
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`/song/${id}/edit`}
              className="text-xs text-muted hover:text-foreground transition-colors uppercase tracking-wide"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs text-muted hover:text-red-500 transition-colors uppercase tracking-wide disabled:opacity-50"
            >
              {deleting ? "..." : "Delete"}
            </button>
          </div>
        </nav>

        {/* Song Name */}
        <h1 className="text-2xl font-bold tracking-tight text-foreground leading-snug">
          {song.name}
        </h1>

        {/* Capo */}
        {song.capo && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Capo {song.capo}
            </span>
          </div>
        )}

        {/* Chord Fingerings */}
        {Object.keys(fingerings).length > 0 && (
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 rounded-xl bg-card-bg p-5 ring-1 ring-card-border shadow-sm">
              {Object.entries(fingerings).map(([name, pattern]) => (
                <div key={name} className="flex items-baseline font-mono text-sm">
                  <span className="font-semibold text-foreground w-16 shrink-0">
                    {name}
                  </span>
                  <span className="text-muted tracking-widest">{pattern}</span>
                </div>
              ))}
            </div>
            {unknownChords.length > 0 && (
              <p className="mt-2 text-xs text-muted/60 pl-1">
                Not in dictionary: {unknownChords.join(", ")}
              </p>
            )}
          </div>
        )}

        {/* Chords */}
        <div className="mt-8">
          <pre className="font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-chord font-semibold">
            {song.chords}
          </pre>
        </div>

        {/* Lyrics */}
        {song.lyrics && (
          <div className="mt-10 pt-8 border-t border-card-border">
            <pre className="font-sans text-[13px] leading-7 whitespace-pre-wrap text-foreground/70">
              {song.lyrics}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
