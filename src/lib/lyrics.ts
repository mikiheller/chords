export async function fetchLyrics(
  name: string
): Promise<{ lyrics: string; source: string } | null> {
  const geniusToken = process.env.GENIUS_API_TOKEN;
  if (!geniusToken) return null;

  try {
    const searchRes = await fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(name)}`,
      { headers: { Authorization: `Bearer ${geniusToken}` } }
    );

    if (!searchRes.ok) return null;

    const searchData = await searchRes.json();
    const hits = searchData.response?.hits;

    if (!hits || hits.length === 0) return null;

    const songUrl = hits[0].result.url;

    const pageRes = await fetch(songUrl);
    if (!pageRes.ok) return null;

    const html = await pageRes.text();

    const lyricsContainers = html.match(
      /data-lyrics-container="true"[^>]*>([\s\S]*?)(?=<\/div>)/g
    );

    if (!lyricsContainers) return null;

    let lyrics = lyricsContainers
      .map((container) => {
        let text = container.replace(
          /data-lyrics-container="true"[^>]*>/,
          ""
        );
        text = text.replace(/<br\s*\/?>/gi, "\n");
        text = text.replace(/<[^>]+>/g, "");
        text = text
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/&#39;/g, "'");
        return text.trim();
      })
      .join("\n\n");

    lyrics = lyrics.replace(/\n{3,}/g, "\n\n").trim();

    return { lyrics, source: songUrl };
  } catch {
    return null;
  }
}
