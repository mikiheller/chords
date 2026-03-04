import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }

  const geniusToken = process.env.GENIUS_API_TOKEN;
  if (!geniusToken) {
    return NextResponse.json(
      { error: "Genius API token not configured" },
      { status: 500 }
    );
  }

  try {
    const searchRes = await fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(name)}`,
      { headers: { Authorization: `Bearer ${geniusToken}` } }
    );

    if (!searchRes.ok) {
      throw new Error("Genius API search failed");
    }

    const searchData = await searchRes.json();
    const hits = searchData.response?.hits;

    if (!hits || hits.length === 0) {
      return NextResponse.json(
        { error: "No lyrics found" },
        { status: 404 }
      );
    }

    const songUrl = hits[0].result.url;

    const pageRes = await fetch(songUrl);
    if (!pageRes.ok) {
      throw new Error("Failed to fetch lyrics page");
    }

    const html = await pageRes.text();

    const lyricsContainers = html.match(
      /data-lyrics-container="true"[^>]*>([\s\S]*?)(?=<\/div>)/g
    );

    if (!lyricsContainers) {
      return NextResponse.json(
        { error: "Could not parse lyrics" },
        { status: 404 }
      );
    }

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

    return NextResponse.json({ lyrics, source: songUrl });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to fetch lyrics",
      },
      { status: 500 }
    );
  }
}
