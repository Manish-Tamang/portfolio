"use client";
import { FC, useState } from 'react';
import { format, parseISO, subDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styles from '@/styles/ContributionGraph.module.css';

type ContributionGridProps = {
    data: Record<string, number>;
};

export const ContributionGrid: FC<ContributionGridProps> = ({ data }) => {
    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
    const [hoveredCell, setHoveredCell] = useState<number | null>(null);

    const getCellColor = (count: number) => {
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
    };

    const today = new Date();
    const ninetyDaysAgo = subDays(today, 89);
    
    //Filter the data for the last 90 days
    const days = Object.keys(data).filter(date => {
        const parsedDate = parseISO(date);
        return parsedDate >= ninetyDaysAgo && parsedDate <= today
    });

    const numRows = 7;
    const numCols = Math.ceil(days.length / numRows);

    return (
        <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${numCols}, 15px)` }}>
            {days.map((date, index) => (
                <div
                    key={index}
                    className={styles.cell}
                    style={{ backgroundColor: getCellColor(data[date]) }}
                    onMouseEnter={() => setHoveredCell(index)}
                    onMouseLeave={() => setHoveredCell(null)}
                    onClick={() => setActiveTooltip(activeTooltip === index ? null : index)}
                >
                    <div className={styles.contributions}>{data[date]}</div>
                    {(activeTooltip === index || hoveredCell === index) && (
                        <div className={styles.tooltip}>
                            <div>{data[date]} contributions</div>
                            <div className={styles.date}>
                                {format(parseISO(date), 'EEEE, MMMM d, yyyy', { locale: enUS })}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};