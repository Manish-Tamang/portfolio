"use client"
import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import GuestbookCard from "@/components/guestbookCard";

interface GuestbookEntryData {
    id: string;
    name: string;
    imageUrl: string;
    timestamp: Timestamp;
    message: string;
    likes: number;
}

export default function GuestbookPage() {
    const [entries, setEntries] = useState<GuestbookEntryData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "guestbook"));
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    likes: 0, // Default likes to 0
                })) as GuestbookEntryData[];

                setEntries(data);
            } catch (error) {
                console.error("Error fetching entries: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Guestbook</h1>
            <div>
                {entries.length === 0 ? (
                    <p>No messages yet.</p>
                ) : (
                    entries.map((entry) => (
                        <GuestbookCard
                            key={entry.id}
                            name={entry.name}
                            avatar={entry.imageUrl}
                            timestamp={new Date(entry.timestamp.toMillis()).toLocaleString()}
                            comment={entry.message}
                            likes={entry.likes}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
