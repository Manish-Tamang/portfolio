import { NextResponse } from 'next/server';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "guestbook"));
    const entries = querySnapshot.docs.map((doc) => {
      const entry = doc.data();
      return {
        id: doc.id,
        name: entry.name,
        imageUrl: entry.imageUrl || "",
        timestamp: entry.timestamp instanceof Timestamp ? entry.timestamp.toMillis() : 0,
        message: entry.message,
        email: entry.email || "",
      };
    });

    // Sort by newest first
    const sortedEntries = entries.sort((a, b) => b.timestamp - a.timestamp);
    
    return NextResponse.json({ entries: sortedEntries });
  } catch (error) {
    console.error("Error fetching guestbook entries for metadata:", error);
    return NextResponse.json({ error: "Failed to fetch guestbook entries" }, { status: 500 });
  }
} 