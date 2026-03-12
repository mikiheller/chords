"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Song } from "@/lib/supabase";

export default function UkulelePage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [noCapoOnly, setNoCapoOnly] = useState(false);

  useEffect(() => {
    fetch("/api/songs?instrument=ukulele")
      .then((res) => res.json())
      .then((data) => {
        setSongs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = noCapoOnly ? songs.filter((s) => !s.capo) : songs;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-5 py-8">
        <nav className="mb-6">
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Home
          </Link>
        </nav>

        <h1 className="text-xl font-bold tracking-tight text-foreground mb-1">
          🪕 Ukulele
        </h1>
        {!loading && (
          <p className="text-xs text-muted mb-4">
            {filtered.length} {filtered.length === 1 ? "song" : "songs"}
          </p>
        )}

        {!loading && songs.length > 0 && (
          <button
            onClick={() => setNoCapoOnly(!noCapoOnly)}
            className={`mb-4 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
              noCapoOnly
                ? "bg-accent text-white"
                : "bg-surface text-muted hover:text-foreground"
            }`}
          >
            No capo
          </button>
        )}

        {loading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl bg-card-bg border border-card-border p-10 text-center">
            <p className="text-sm text-muted mb-2">
              {noCapoOnly ? "No songs without capo" : "No songs yet"}
            </p>
            {!noCapoOnly && (
              <Link href="/" className="text-xs text-accent hover:text-accent-hover">
                Add your first →
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-1.5">
            {filtered.map((song) => (
              <Link
                key={song.id}
                href={`/song/${song.id}`}
                className="flex items-center justify-between gap-3 rounded-lg bg-card-bg border border-card-border px-4 py-3 transition-all hover:border-accent/30 hover:shadow-sm"
              >
                <span className="text-sm font-medium text-foreground">
                  {song.name}
                </span>
                {song.capo && (
                  <span className="text-[10px] font-semibold text-chord bg-chord/10 px-2 py-0.5 rounded-full shrink-0">
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
