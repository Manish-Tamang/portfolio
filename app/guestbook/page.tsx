"use client";

import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, Timestamp, addDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import GuestbookCard from "@/components/guestbookCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface GuestbookEntryData {
    id: string;
    name: string;
    imageUrl?: string;
    timestamp: number;
    message: string;
    email?: string;
}

const guestbookCache = {
    data: null as GuestbookEntryData[] | null,
    timestamp: null as number | null,
    expiry: 60 * 1000,
};

export default function GuestbookPage() {
    const [entries, setEntries] = useState<GuestbookEntryData[]>([]);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [message, setMessage] = useState("");
    const { toast } = useToast();
    const { data: session, status } = useSession();
    const router = useRouter();

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
                    email: entry.email || "",
                };
            });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user) {
            toast({
                title: "You must be logged in to leave a message.",
                variant: "destructive",
            });
            return;
        }

        if (!message.trim()) {
            toast({
                title: "Message cannot be empty.",
                variant: "destructive",
            });
            return;
        }

        try {
            await addDoc(collection(db, "guestbook"), {
                name: session.user.name,
                imageUrl: session.user.image,
                timestamp: Timestamp.now(),
                message: message,
                email: session.user.email,
            });

            setMessage("");
            fetchData();

            toast({
                title: "Message added successfully!",
            });
        } catch (error: any) {
            console.error("Error adding entry: ", error);
            toast({
                title: "Error adding message.",
                description: error.message,
                variant: "destructive",
            });
        }
    };

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