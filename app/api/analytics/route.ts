import { NextResponse } from "next/server";

const UMAMI_API_URL = "https://api.umami.is/v1";
const UMAMI_API_KEY = process.env.UMAMI_API_KEY;
const WEBSITE_ID = process.env.WEBSITE_ID;

export async function GET(req: Request) {
  if (!WEBSITE_ID || !UMAMI_API_KEY) {
    return NextResponse.json(
      { error: "Missing required environment variables." },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const headers = {
    "x-umami-api-key": UMAMI_API_KEY,
    "Content-Type": "application/json",
  };

  let apiUrl = "";
  try {
    if (type === "sessions") {
      const now = Date.now();
      const endAt = now;
      const startAt = now - 100000 * 60 * 1000;
      apiUrl = `${UMAMI_API_URL}/websites/${WEBSITE_ID}/sessions?startAt=${startAt}&endAt=${endAt}`;
    } else if (type === "stats") {
      const now = Date.now();
      const threeMonthsAgo = now - 90 * 24 * 60 * 60 * 1000;
      apiUrl = `${UMAMI_API_URL}/websites/${WEBSITE_ID}/stats?startAt=${threeMonthsAgo}&endAt=${now}`;
    } else {
      apiUrl = `${UMAMI_API_URL}/websites/${WEBSITE_ID}/active`;
    }

    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        return NextResponse.json(errorJson, { status: response.status });
      } catch (parseError) {
        return NextResponse.json(
          { error: errorText },
          { status: response.status }
        );
      }
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
