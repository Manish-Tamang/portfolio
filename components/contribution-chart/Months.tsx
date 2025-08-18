
import { FC } from 'react';
import styles from '@/styles/Months.module.css';

interface Month {
    firstDay: string;
    name: string;
    totalWeeks: number;
}

interface MonthsProps {
    months: Month[];
}

export const Months: FC<MonthsProps> = ({ months }) => {
    if (!months || months.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            {months.map((month, index) => {
                const CELL = 10; // must match grid cell size
                const GAP = 2;   // must match grid gap
                const widthPx = Math.max(0, (month.totalWeeks || 0) * (CELL + GAP));
                const label = month?.name ? month.name.slice(0, 3) : '';
                return (
                    <div
                        key={index}
                        className={styles.month}
                        style={{ width: `${widthPx}px` }}
                    >
                        <span className="text-[10px] text-gray-700 dark:text-gray-200">
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};