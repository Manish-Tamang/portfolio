
import { FC } from 'react';
import styles from '@/styles/Weekdays.module.css';

export const Weekdays: FC = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className={styles.container}>
            {days.map((day, index) => (
                <div key={index} className={styles.day}>
                    {day}
                </div>
            ))}
        </div>
    );
};