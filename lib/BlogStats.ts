import { client } from "@/sanity/lib/client";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { BlogPostStats } from "./types";

export async function getBlogPostStats(): Promise<BlogPostStats[]> {
  try {
    const sanityQuery = `*[_type == "post"]{slug {current}, title}`;
    const sanityPosts = await client.fetch(sanityQuery);

    if (!sanityPosts) {
      console.warn("No posts found in Sanity.");
      return [];
    }

    const stats: BlogPostStats[] = sanityPosts.map(
      (post: { slug: { current: string }; title: string }) => ({
        slug: post.slug.current,
        title: post.title,
        thumbsUp: 0,
        heart: 0,
        trophy: 0,
        bookmark: 0,
        views: 0,
        totalReactions: 0,
      })
    );

    await Promise.all(
      stats.map(async (post) => {
        const viewDocRef = doc(db, "views", post.slug);
        const viewDocSnap = await getDoc(viewDocRef);

        if (viewDocSnap.exists()) {
          post.views = viewDocSnap.data()?.count || 0;
        }

        const reactionDocRef = doc(db, "posts", post.slug);
        const reactionDocSnap = await getDoc(reactionDocRef);

        if (reactionDocSnap.exists()) {
          const reactionData = reactionDocSnap.data();
          post.thumbsUp = reactionData?.thumbsUp || 0;
          post.heart = reactionData?.heart || 0;
          post.trophy = reactionData?.trophy || 0;
          post.bookmark = reactionData?.bookmark || 0;
          post.totalReactions =
            post.thumbsUp + post.heart + post.trophy + post.bookmark;
        }
      })
    );

    return stats;
  } catch (error) {
    console.error("Error fetching blog post stats:", error);
    return [];
  }
}
