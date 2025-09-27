/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  getDocs,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SignInCard from "@/components/SignIn";
import AuthButtons from "@/components/AuthButtons";
import { GuestbookSkeletons } from "@/components/GuestbookSkeletons";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

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

interface GuestbookCardProps {
  name: string;
  avatar?: string;
  timestamp: string;
  comment: string;
  id: string;
  itemIndex?: number;
}

const GuestbookCardComponent: React.FC<GuestbookCardProps> = ({
  name,
  avatar,
  timestamp,
  comment,
  id,
  itemIndex,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedComment =
    comment.length > 90 ? comment.slice(0, 90) + "..." : comment;
  const { data: session } = useSession();

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Decorative flower assets 
  const flowerImages = [
    "/img/guestbook-flowers/flower-one.png",
    "/img/guestbook-flowers/flower-two.png",
    "/img/guestbook-flowers/flower-three.png",
    "/img/guestbook-flowers/flower-four.png",
    "/img/guestbook-flowers/flower-five.png",
    "/img/guestbook-flowers/flower-six.png",
    "/img/guestbook-flowers/flower-seven.png",
    "/img/guestbook-flowers/flower-eight.png",
    "/img/guestbook-flowers/flower-nine.png",
    "/img/guestbook-flowers/flower-ten.png",
    "/img/guestbook-flowers/flower-eleven.png",
    "/img/guestbook-flowers/flower-twelve.png",
    "/img/guestbook-flowers/flower-thirteen.png",
    "/img/guestbook-flowers/flower-fourteen.png",
    "/img/guestbook-flowers/flower-fifteen.png",
    "/img/guestbook-flowers/flower-sixteen.png",
  ];

  const hashString = (value: string): number => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };
  // Prefer ordered sequence by list position when provided; fallback to deterministic hash
  const flowerIndex = typeof itemIndex === 'number'
    ? (itemIndex % flowerImages.length)
    : (hashString(id || name || timestamp) % flowerImages.length);

  const getAvatarColor = (name: string) => {
    const colors = [
      "from-[#38A662] to-[#2D8A4D]", // Green
      "from-[#3B82F6] to-[#2563EB]", // Blue
      "from-[#F59E0B] to-[#D97706]", // Orange
      "from-[#8B5CF6] to-[#7C3AED]", // Purple
      "from-[#EC4899] to-[#DB2777]", // Pink
      "from-[#10B981] to-[#059669]", // Emerald
      "from-[#F97316] to-[#EA580C]", // Orange
      "from-[#6366F1] to-[#4F46E5]", // Indigo
    ];

    // Use the sum of character codes to determine color
    const sum = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Convert to 12-hour format with AM/PM
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
  };

  const deleteGuestbookEntry = async () => {
    try {
      const guestbookDoc = doc(db, "guestbook", id);
      await deleteDoc(guestbookDoc);
      toast.success("Guestbook entry deleted successfully!");
      window.location.reload();
    } catch (error: any) {
      console.error("Error deleting guestbook entry:", error);
      toast.error("Error deleting guestbook entry:" + error.message);
    }
  };

  return (
    <div className="rounded-[4px] p-3 w-full border border-gray-200 dark:border-gray-700 shadow-sm mb-2 bg-white dark:bg-neutral-900 relative overflow-hidden">
      <div className="absolute bottom-2 right-2">
        <Image
          src={flowerImages[flowerIndex]}
          alt=""
          width={32}
          height={32}
          className="pointer-events-none select-none"
          priority={false}
        />
      </div>
      {isAdmin && (
        <button
          onClick={deleteGuestbookEntry}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
      <div className="flex items-center gap-3">
        {avatar ? (
          <Avatar>
            <Image src={avatar} alt={name} draggable={false} width={40} height={40} className="rounded-full" />
          </Avatar>
        ) : (
          <Avatar>
            <AvatarFallback
              className={`bg-gradient-to-br ${getAvatarColor(name)} text-white`}
            >
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">
            {name}
          </span>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            {formatTimestamp(timestamp)}
          </p>
        </div>
      </div>
      <p className="mt-2 text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed">
        {isExpanded ? comment : truncatedComment}
        {comment.length > 90 && (
          <span
            className="text-[#38A662] cursor-pointer ml-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? " See less" : " See more"}
          </span>
        )}
      </p>
    </div>
  );
};

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntryData[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { toast: useTheToast } = useToast();
  const { theme } = useTheme();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/guestbook');
      if (!res.ok) throw new Error('Failed to fetch guestbook entries');
      const json = await res.json();
      const data = (json.entries || []).map((e: any) => ({
        id: e.id,
        name: e.name,
        imageUrl: e.image_url || '',
        timestamp: e.timestamp || 0,
        message: e.message,
        email: e.email || '',
      }));
      guestbookCache.data = data;
      guestbookCache.timestamp = Date.now();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries: ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortedEntries = [...entries].sort((a, b) =>
    sortOrder === "newest"
      ? b.timestamp - a.timestamp
      : a.timestamp - b.timestamp
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      useTheToast({
        title: "You must be logged in to leave a message.",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      useTheToast({
        title: "Message cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    try {
      const id = crypto.randomUUID();
      const payload = {
        id,
        name: session.user.name,
        imageUrl: session.user.image,
        message,
        email: session.user.email,
      };
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Failed to save');
      }
      try {
        const emailResponse = await fetch("/api/send-guestbook-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: session.user.name,
            userEmail: session.user.email,
            message: message,
          }),
        });

        if (!emailResponse.ok) {
          console.error("Failed to send email:", await emailResponse.text());
          toast.error("Message added, but failed to send notification email.");
        } else {
          console.log("Email sent successfully!");
        }
      } catch (emailError) {
        console.error("Error calling email API:", emailError);
        toast.error("Message added, but email notification failed.");
      }

      setMessage("");
      fetchData();

      toast.success("Message added successfully!");
    } catch (error: any) {
      console.error("Error adding entry: ", error);
      useTheToast({
        title: "Error adding message.",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: theme === "light" ? "#F9FAFB" : "#363636",
            color: theme === "light" ? "#374151" : "#fff",
          },
          success: {
            duration: 3000,
          },
        }}
      />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold font-peachi mb-1 dark:text-white text-gray-800"
      >
        Guestbook
      </motion.h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Leave a comment below. It could be anything – appreciation, information,
        wisdom, anything good or bad about me or even humor. Surprise me! and get a decorative flower with your message.
      </p>{" "}
      <div className="mb-4">
        {!session?.user ? (
          <SignInCard />
        ) : (
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              {session.user.image ? (
                <Avatar>
                  <Image
                    src={session?.user?.image}
                    alt={session.user.name || "User Avatar"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar>
                  <AvatarFallback>
                    {session.user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {session.user.name}
                </p>
              </div>
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a message..."
              className="w-full mb-2 rounded-[4px] border border-[#38A662] bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#38A662] focus:border-[#38A662]"
            />
            <button
              type="submit"
              className="cursor-pointer transition-all bg-[#38A662] text-white px-6 py-2 rounded-[4px] border-[#2D8A4D] w-full border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Post Message
            </button>
          </form>
        )}
        <AuthButtons session={session} />
      </div>
      <div className="flex justify-end mb-2">
        <Select
          onValueChange={(value) => setSortOrder(value as "newest" | "oldest")}
          defaultValue="newest"
        >
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
        <p className="text-center text-gray-500 dark:text-gray-400">
          No messages yet.
        </p>
      ) : (
        sortedEntries.map((entry, idx) => (
          <GuestbookCardComponent
            key={entry.id}
            id={entry.id}
            name={entry.name}
            avatar={entry.imageUrl}
            timestamp={new Date(entry.timestamp).toLocaleString()}
            comment={entry.message}
            itemIndex={idx}
          />
        ))
      )}
    </div>
  );
}
