import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  return NextResponse.json({ success: true, message: `Unsubscribed ${email}` });
} 