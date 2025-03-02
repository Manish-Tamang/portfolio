import { FC } from 'react';
import styles from '@/styles/Months.module.css';
import { parseISO, format } from 'date-fns';

type MonthsProps = {
    days: string[];
}
export const Months: FC<MonthsProps> = ({ days }) => {
    if (!days || days.length === 0) {
        return null;
    }
    const months = days.reduce((acc, day) => {
        const date = parseISO(day);
        const month = format(date, 'MMM')
        if (!acc.includes(month)) {
            acc.push(month);
        }
        return acc
    }, [] as string[]);

    return (
        <div className={styles.container}>
            {months.map((month, index) => (
                <div key={index} className={styles.month}>
                    {month}
                </div>
            ))}
        </div>
    );
};