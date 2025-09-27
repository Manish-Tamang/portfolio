import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const TABLE = "guestbook_entries";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("id, name, email, image_url, message, timestamp")
      .order("timestamp", { ascending: false });
    if (error) throw error;
    
    console.log('Fetched entries from Supabase:', data);
    console.log('First entry image_url:', data?.[0]?.image_url);
    
    return NextResponse.json({ entries: data || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, name, email, imageUrl, message } = await req.json();
    if (!id || !name || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    // Use admin client so RLS won't block server-side insertion
    console.log('Inserting to Supabase:', {
      id,
      name,
      email: email || null,
      image_url: imageUrl || null,
      message: message || null,
      timestamp: new Date().toISOString(),
    });
    
    const { error } = await supabaseAdmin.from(TABLE).insert({
      id,
      name,
      email: email || null,
      image_url: imageUrl || null,
      message: message || null,
      timestamp: new Date().toISOString(),
    });
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to add" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    // Use admin client for deletion
    const { error } = await supabaseAdmin.from(TABLE).delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to delete" }, { status: 500 });
  }
}


