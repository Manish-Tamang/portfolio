import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; 


export async function GET(req: NextRequest) {
  const accessToken = process.env.WAKATIME_ACCESS_TOKEN;
  const refreshToken = process.env.WAKATIME_REFRESH_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No WakaTime access token found. Please authenticate." },
      { status: 401 }
    );
  }

  try {
    console.log("Fetching WakaTime data...");

    let response = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/all_time",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 401 && refreshToken) {
      console.log("Access token expired. Refreshing token...");

      const refreshResponse = await fetch("https://wakatime.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: process.env.WAKATIME_CLIENT_ID || "",
          client_secret: process.env.WAKATIME_CLIENT_SECRET || "",
        }),
      });

      if (!refreshResponse.ok) {
        const refreshErrorText = await refreshResponse.text();
        throw new Error(`Failed to refresh token: ${refreshErrorText}`);
      }

      const refreshData = await refreshResponse.json();
      const newAccessToken = refreshData.access_token;

      console.log("New access token obtained:", newAccessToken);

      response = await fetch(
        "https://wakatime.com/api/v1/users/current/stats/all_time",
        {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WakaTime API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error: any) {
    console.error("Error fetching WakaTime data:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch WakaTime data.",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
