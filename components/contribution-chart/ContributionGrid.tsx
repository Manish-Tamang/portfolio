"use client";
import { FC, useState } from 'react';
import { format, parseISO, isAfter } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styles from '@/styles/ContributionGraph.module.css';

interface ContributionDay {
    color: string;
    contributionCount: number;
    date: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
    firstDay: string;
}

interface ContributionGridProps {
    weeks: ContributionWeek[];
    colors: string[];
}

export const ContributionGrid: FC<ContributionGridProps> = ({ weeks, colors }) => {
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    const [hoveredCell, setHoveredCell] = useState<string | null>(null);
    const today = new Date();

    const getCellColor = (count: number) => {
        if (colors && colors.length >= 5) {
            switch (true) {
                case count === 0:
                    return colors[0];
                case count < 10:
                    return colors[1];
                case count < 20:
                    return colors[2];
                case count < 30:
                    return colors[3];
                default:
                    return colors[4];
            }
        } else {
            switch (true) {
                case count === 0:
                    return '#EDEDED';
                case count < 10:
                    return '#ACD5F2';
                case count < 20:
                    return '#7FA8C9';
                case count < 30:
                    return '#527BA0';
                default:
                    return '#254E77';
            }
        }
    };

    const maxDaysInWeek = Math.max(...weeks.map(week => week.contributionDays.length));
    const numWeeks = weeks.length;

    return (
        <div
            className={styles.grid}
            style={{ gridTemplateColumns: `repeat(${numWeeks}, 10px)` }}
        >
            {Array.from({ length: maxDaysInWeek }).map((_, dayIndex) => (
                Array.from({ length: numWeeks }).map((__, weekIndex) => {
                    const week = weeks[weekIndex];
                    const day = week.contributionDays[dayIndex];
                    const cellId = `${weekIndex}-${dayIndex}`;

                    if (!day || isAfter(parseISO(day.date), today)) {
                        return (
                            <div
                                key={cellId}
                                className={styles.cell}
                                style={{ backgroundColor: "#EDEDED" }}
                            >
                                <div className={styles.contributions}></div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={cellId}
                            className={styles.cell}
                            style={{ backgroundColor: getCellColor(day.contributionCount) }}
                            onMouseEnter={() => setHoveredCell(cellId)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => setActiveTooltip(activeTooltip === cellId ? null : cellId)}
                        >
                            <div className={styles.contributions}>{day?.contributionCount || 0}</div>
                            {(activeTooltip === cellId || hoveredCell === cellId) && (
                                <div className={styles.tooltip}>
                                    <div>{day?.contributionCount || 0} contributions</div>
                                    <div className={styles.date}>
                                        {day ? format(parseISO(day.date), 'EEE, MMM d, yyyy', { locale: enUS }) : 'No Date'} { }
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })
            ))}
        </div>
    );
};