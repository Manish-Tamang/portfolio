import { NextRequest, NextResponse } from "next/server";
import { getTopTracks } from "@/lib/spotify";

export const runtime = "edge";

type ResponseTrackType = {
  artists: { name: string }[];
  name: string;
  external_urls: { spotify: string };
  album: { images: { url: string }[] };
};

export async function GET(req: NextRequest) {
  const response = await getTopTracks();
  const { items } = await response.json();

  const tracks = items.slice(0, 50).map((track: ResponseTrackType) => ({
    artist: track.artists.map((artist) => artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    cover: track.album.images[1]?.url || track.album.images[0]?.url,
    title: track.name,
  }));

  return NextResponse.json(
    { tracks },
    {
      status: 200,
      headers: {
        "cache-control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    }
  );
}
