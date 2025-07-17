import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

  if (!RESEND_API_KEY || !AUDIENCE_ID) {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }

  try {
    const result = await resend.contacts.list({
      audienceId: AUDIENCE_ID,
    });
    if (result.error) {
      console.error("Resend SDK error:", result.error);
      return NextResponse.json({ count: 0 }, { status: 500 });
    }
    const count = result.data?.data?.length || 0;
    return NextResponse.json({ count });

  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}