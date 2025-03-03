"use client";
import { FC, useState, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styles from '@/styles/ContributionGraph.module.css';

type ContributionGridProps = {
  weeks: {
    contributionDays: {
      color: string;
      contributionCount: number;
      date: string;
    }[];
    firstDay: string;
  }[];
};

export const ContributionGrid: FC<ContributionGridProps> = ({ weeks }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const reversedWeeks = useMemo(
    () =>
      [...weeks].reverse().map(week => ({
        ...week,
        contributionDays: [...week.contributionDays] // Revert days
      })),
    [weeks]
  );

  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(53, 15px)` }}>
      {reversedWeeks.map((week, weekIndex) => (
        week.contributionDays.map((day, dayIndex) => (
          <div
            key={`${weekIndex}-${dayIndex}`}
            className={styles.cell}
            style={{ backgroundColor: day.color }}
            onMouseEnter={() => setActiveTooltip(day.date)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className={styles.contributions}>{day.contributionCount}</div>
            {activeTooltip === day.date && (
              <div className={styles.tooltip}>
                <div>{day.contributionCount} contributions</div>
                <div className={styles.date}>
                  {format(parseISO(day.date), 'EEEE, MMMM d, yyyy', { locale: enUS })}
                </div>
              </div>
            )}
          </div>
        ))
      ))}
    </div>
  );
};