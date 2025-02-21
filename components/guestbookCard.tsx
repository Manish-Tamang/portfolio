import React from "react";
import styles from "@/styles/guestbook.module.css";

interface GuestbookCardProps {
    name: string;
    avatar: string;
    timestamp: string;
    comment: string;
    likes: number;
}

const GuestbookCard: React.FC<GuestbookCardProps> = ({
    name,
    avatar,
    timestamp,
    comment,
    likes,
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.comments}>
               
                <div className={styles["comment-container"]}>
                    <div className={styles.user}>
                        <div className={styles["user-pic"]}>
                            <img src={avatar} alt={name} className={styles.avatar} />
                        </div>
                        <div className={styles["user-info"]}>
                            <span>{name}</span>
                            <p>{timestamp}</p>
                        </div>
                    </div>
                    <p className={styles["comment-content"]}>{comment}</p>
                </div>
            </div>
        </div>
    );
};

export default GuestbookCard;
