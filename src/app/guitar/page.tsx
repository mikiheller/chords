"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Song } from "@/lib/supabase";

export default function GuitarPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/songs?instrument=guitar")
      .then((res) => res.json())
      .then((data) => {
        setSongs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
          🎸 Guitar
        </h1>
        {!loading && (
          <p className="text-xs text-muted mb-6">
            {songs.length} {songs.length === 1 ? "song" : "songs"}
          </p>
        )}

        {loading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : songs.length === 0 ? (
          <div className="rounded-xl bg-card-bg border border-card-border p-10 text-center">
            <p className="text-sm text-muted mb-2">No songs yet</p>
            <Link href="/" className="text-xs text-accent hover:text-accent-hover">
              Add your first →
            </Link>
          </div>
        ) : (
          <div className="space-y-1.5">
            {songs.map((song) => (
              <Link
                key={song.id}
                href={`/song/${song.id}`}
                className="flex items-center justify-between rounded-lg bg-card-bg border border-card-border px-4 py-3 transition-all hover:border-accent/30 hover:shadow-sm"
              >
                <span className="text-sm font-medium text-foreground">
                  {song.name}
                </span>
                {song.capo && (
                  <span className="text-[10px] font-semibold text-chord bg-chord/10 px-2 py-0.5 rounded-full">
                    Capo {song.capo}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
