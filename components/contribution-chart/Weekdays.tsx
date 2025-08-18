
import { FC } from 'react';
import styles from '@/styles/Weekdays.module.css';

export const Weekdays: FC = () => {
    const allDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className={styles.container}>
            {allDays.map((_, index) => {
                // Shift labels down by one row to align with grid: Mon->row 2, Wed->row 4, Fri->row 6
                let label = '';
                if (index === 1) label = 'Mon';
                if (index === 3) label = 'Wed';
                if (index === 5) label = 'Fri';
                return (
                    <div key={index} className={`${styles.day} text-[10px] text-gray-500 dark:text-gray-400`}>
                        {label}
                    </div>
                );
            })}
        </div>
    );
};