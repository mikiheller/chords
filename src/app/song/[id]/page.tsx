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
      <div className="mx-auto max-w-lg px-5 py-8">
        {/* Nav */}
        <nav className="flex items-center justify-between mb-6">
          <Link
            href={`/${song.instrument}`}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Back
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={`/song/${id}/edit`}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs text-muted hover:text-red-500 transition-colors disabled:opacity-50"
            >
              {deleting ? "..." : "Delete"}
            </button>
          </div>
        </nav>

        {/* Song Name + Capo */}
        <div className="mb-5">
          <h1 className="text-xl font-bold tracking-tight text-foreground leading-tight">
            {song.name}
          </h1>
          {song.capo && (
            <p className="mt-1 text-sm font-medium text-chord">
              Capo {song.capo}
            </p>
          )}
        </div>

        {/* Chord Fingerings */}
        {Object.keys(fingerings).length > 0 && (
          <div className="mb-5 rounded-lg bg-card-bg border border-card-border px-4 py-3">
            <div className="flex gap-x-6 font-mono text-xs">
              {(() => {
                const entries = Object.entries(fingerings);
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
            {unknownChords.length > 0 && (
              <p className="mt-2 text-[11px] text-muted/50 border-t border-card-border pt-2">
                Unknown: {unknownChords.join(", ")}
              </p>
            )}
          </div>
        )}

        {/* Chords */}
        <pre className="font-mono text-xs leading-5 whitespace-pre-wrap text-chord font-bold mb-5">
          {song.chords}
        </pre>

        {/* Lyrics */}
        {song.lyrics && (
          <>
            <hr className="border-card-border mb-5" />
            <pre className="font-sans text-sm leading-5 whitespace-pre-wrap text-foreground/70">
              {song.lyrics}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}
