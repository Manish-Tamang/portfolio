"use client";

import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, Timestamp, addDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import GuestbookCard from "@/components/guestbookCard";
import SignInCard from "@/components/SignIn";
import AuthButtons from "@/components/AuthButtons";
import { GuestbookSkeletons } from "@/components/GuestbookSkeletons";
import { Textarea } from "@/components/ui/textarea";


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
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            if (guestbookCache.data && guestbookCache.timestamp && (Date.now() - guestbookCache.timestamp < guestbookCache.expiry)) {
                setEntries(guestbookCache.data);
                setIsLoading(false);
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
        } finally {
            setIsLoading(false);
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
            <div className="mb-4" >
                {!session?.user ? (
                    <SignInCard />
                ) : (
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                            {session.user.image ? (
                                <Avatar>
                                    <AvatarImage src={session?.user?.image} alt={session.user.name || "User Avatar"} />
                                    <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                            ) : (
                                <Avatar>
                                    <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                            )}
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{session.user.name}</p>
                            </div>
                        </div>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Leave a message..."
                            className="w-full mb-2 rounded-[4px] border border-[#38A662] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#38A662] focus:border-[#38A662]"
                        />
                        {/* <Button type="submit" className="bg-[#38A662] hover:bg-[#2c8a4f] text-white">Post Message</Button> */}
                        <button
                            type="submit"
                            className="cursor-pointer transition-all bg-[#38A662] text-white px-6 py-2 rounded-[4px]
border-[#2D8A4D] w-full
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                        >Post Message
                        </button>
                    </form>
                )}
                <AuthButtons session={session} />
            </div>
            <div className="flex justify-end mb-2">
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
            {isLoading ? (
                <GuestbookSkeletons />
            ) : entries.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No messages yet.</p>
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