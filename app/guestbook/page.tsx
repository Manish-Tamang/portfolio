"use client";

import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import GuestbookCard from "@/components/guestbookCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GuestbookEntryData {
    id: string;
    name: string;
    imageUrl?: string;
    timestamp: number;
    message: string;
}

const guestbookCache = {
    data: null as GuestbookEntryData[] | null,
    timestamp: null as number | null,
    expiry: 60 * 1000, 
};

export default function GuestbookPage() {
    const [entries, setEntries] = useState<GuestbookEntryData[]>([]);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const fetchData = useCallback(async () => {
        try {
            
            if (guestbookCache.data && guestbookCache.timestamp && (Date.now() - guestbookCache.timestamp < guestbookCache.expiry)) {
                setEntries(guestbookCache.data);
                return; 
            }

            const querySnapshot = await getDocs(collection(db, "guestbook"));
            const data = querySnapshot.docs.map((doc) => {
                const entry = doc.data();
                return {
                    id: doc.id,
                    name: entry.name,
                    imageUrl: entry.imageUrl || "",
                    timestamp: entry.timestamp instanceof Timestamp ? entry.timestamp.toMillis() : 0,
                    message: entry.message,
                };
            });

            // Update cache
            guestbookCache.data = data;
            guestbookCache.timestamp = Date.now();

            setEntries(data);
        } catch (error) {
            console.error("Error fetching entries: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const sortedEntries = [...entries].sort((a, b) =>
        sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
    );

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-end mb-4">
                <Select onValueChange={(value) => setSortOrder(value as "newest" | "oldest")} defaultValue="newest">
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {entries.length === 0 ? (
                <p className="text-center text-gray-500">No messages yet.</p>
            ) : (
                sortedEntries.map((entry) => (
                    <GuestbookCard
                        key={entry.id}
                        name={entry.name}
                        avatar={entry.imageUrl}
                        timestamp={new Date(entry.timestamp).toLocaleString()}
                        comment={entry.message}
                    />
                ))
            )}
        </div>
    );
}