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
            🎸 Guitar
          </h1>
          {!loading && (
            <p className="mt-1 text-xs text-muted uppercase tracking-wide">
              {songs.length} {songs.length === 1 ? "song" : "songs"}
            </p>
          )}
        </header>

        {loading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : songs.length === 0 ? (
          <div className="rounded-2xl bg-card-bg p-12 text-center ring-1 ring-card-border shadow-sm">
            <p className="text-sm text-muted mb-3">No songs yet</p>
            <Link
              href="/"
              className="text-sm font-medium text-accent hover:text-accent-hover"
            >
              Add your first →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {songs.map((song) => (
              <Link
                key={song.id}
                href={`/song/${song.id}`}
                className="flex items-center justify-between rounded-xl bg-card-bg px-5 py-4 ring-1 ring-card-border shadow-sm transition-all hover:shadow-md hover:ring-accent/20 hover:-translate-y-px"
              >
                <span className="font-medium text-foreground text-sm">
                  {song.name}
                </span>
                {song.capo && (
                  <span className="text-[11px] font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
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
