interface LrcLibResult {
  trackName: string;
  artistName: string;
  plainLyrics: string | null;
}

export async function fetchLyrics(
  name: string
): Promise<{ lyrics: string } | null> {
  try {
    // "I Never Told You by Colbie Caillat" → search for "I Never Told You Colbie Caillat"
    const searchQuery = name.replace(/\s+by\s+/i, " ").trim();

    const res = await fetch(
      `https://lrclib.net/api/search?q=${encodeURIComponent(searchQuery)}`,
      { headers: { "User-Agent": "Chords App/1.0" } }
    );

    if (!res.ok) return null;

    const results: LrcLibResult[] = await res.json();

    if (!results || results.length === 0) return null;

    // Find the first result that has lyrics
    const match = results.find((r) => r.plainLyrics);

    if (!match?.plainLyrics) return null;

    const lyrics = match.plainLyrics.replace(/\n{3,}/g, "\n\n").trim();

    return { lyrics };
  } catch {
    return null;
  }
}
