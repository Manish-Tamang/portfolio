import { FC } from 'react';
import styles from '@/styles/Months.module.css';

type MonthsProps = {
  months: {
    firstDay: string;
    name: string;
    totalWeeks: number;
  }[];
}
export const Months: FC<MonthsProps> = ({ months }) => {
  if (!months || months.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {months.map((month, index) => (
        <div key={index} className={styles.month}>
          {month.name}
        </div>
      ))}
    </div>
  );
};