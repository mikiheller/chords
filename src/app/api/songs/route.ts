import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { autoSpaceChords } from "@/lib/chords";
import { fetchLyrics } from "@/lib/lyrics";

export async function GET(request: NextRequest) {
  const instrument = request.nextUrl.searchParams.get("instrument");

  let query = supabase
    .from("songs")
    .select("*")
    .order("name", { ascending: true });

  if (instrument) {
    query = query.eq("instrument", instrument);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { instrument, name, capo, chords } = body;

  if (!instrument || !name || !chords) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const spacedChords = autoSpaceChords(chords);

  let lyrics = null;
  try {
    const result = await fetchLyrics(name);
    if (result) {
      lyrics = result.lyrics;
    }
  } catch {
    // Lyrics fetch is best-effort
  }

  const { data, error } = await supabase
    .from("songs")
    .insert([{ instrument, name, capo, chords: spacedChords, lyrics }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
