import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

export const dynamic = "force-dynamic"; // Ensures API does not get statically exported

type ResponseArtistType = {
  name: string;
  images: {
    url: string;
  }[];
  external_urls: {
    spotify: string;
  };
};

export async function GET(req: NextRequest) {
  try {
    const { access_token } = await getAccessToken();
    const response = await fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(response);
      throw new Error(`Spotify API Error: ${response.statusText}`);
    }
    const { items } = await response.json();

    const artists = items.map((artist: ResponseArtistType) => ({
      name: artist.name,
      image: artist.images[0]?.url || "https://via.placeholder.com/50",
      url: artist.external_urls.spotify,
    }));

    return NextResponse.json(
      { artists },
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          "cache-control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      }
    );
  } catch (error: any) {
    console.error("Failed to fetch top artists:", error);
    return NextResponse.json(
      { error: "Failed to fetch top artists.", message: error.message },
      { status: 500 }
    );
  }
}
