import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('guestbook_entries')
      .select('id, name, image_url, message, email, timestamp')
      .order('timestamp', { ascending: false });
    if (error) throw error;
    const entries = (data || []).map((e: any) => ({
      id: e.id,
      name: e.name,
      imageUrl: e.image_url || '',
      message: e.message || '',
      email: e.email || '',
      timestamp: e.timestamp ? new Date(e.timestamp).getTime() : 0,
    }));
    return NextResponse.json({ entries });
  } catch (error) {
    console.error('Error fetching guestbook entries for metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch guestbook entries' }, { status: 500 });
  }
}