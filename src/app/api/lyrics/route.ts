import { NextRequest, NextResponse } from "next/server";
import { fetchLyrics } from "@/lib/lyrics";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }

  const result = await fetchLyrics(name);

  if (!result) {
    return NextResponse.json(
      { error: "No lyrics found" },
      { status: 404 }
    );
  }

  return NextResponse.json(result);
}
