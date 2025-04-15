import { Metadata } from "next";
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';


export async function generateMetadata(): Promise<Metadata> {
    try {

        const querySnapshot = await getDocs(collection(db, "guestbook"));
        const entries = querySnapshot.docs.map((doc) => {
            const entry = doc.data();
            return {
                id: doc.id,
                name: entry.name,
                message: entry.message,
                timestamp: entry.timestamp instanceof Timestamp ? entry.timestamp.toMillis() : 0,
            };
        });

        const sortedEntries = entries.sort((a, b) => b.timestamp - a.timestamp);
        const recentEntries = sortedEntries.slice(0, 5);
        const recentMessages = recentEntries.map(entry =>
            `${entry.name}: ${entry.message.substring(0, 30)}${entry.message.length > 30 ? '...' : ''}`
        ).join(' | ');

        const description = recentEntries.length > 0
            ? `Recent messages: ${recentMessages}`
            : 'Leave a message in my guestbook. Share your thoughts, appreciation, or just say hello!';

        return {
            title: 'Guestbook | Manish Tamang',
            description,
            openGraph: {
                title: 'Guestbook | Manish Tamang',
                description,
                type: 'website',
                images: [
                    {
                        url: '/OG-Image.png',
                        width: 1200,
                        height: 630,
                        alt: 'Manish Tamang Portfolio',
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: 'Guestbook | Manish Tamang',
                description,
                images: ['/OG-Image.png'],
            },
        };
    } catch (error) {
        console.error("Error generating metadata:", error);


        return {
            title: 'Guestbook | Manish Tamang',
            description: 'Leave a message in my guestbook. Share your thoughts, appreciation, or just say hello!',
            openGraph: {
                title: 'Guestbook | Manish Tamang',
                description: 'Leave a message in my guestbook. Share your thoughts, appreciation, or just say hello!',
                type: 'website',
                images: [
                    {
                        url: '/OG-Image.png',
                        width: 1200,
                        height: 630,
                        alt: 'Manish Tamang Portfolio',
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: 'Guestbook | Manish Tamang',
                description: 'Leave a message in my guestbook. Share your thoughts, appreciation, or just say hello!',
                images: ['/OG-Image.png'],
            },
        };
    }
}

export default function GuestbookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
} 