import { FC } from 'react';
import styles from '@/styles/Info.module.css';

interface InfoProps {
    colors: string[];
}

export const Info: FC<InfoProps> = ({ colors }) => {
    const tooltipTexts = [
        'No contributions',
        'Low contributions',
        'Moderate contributions',
        'High contributions',
        'Highest contributions',
    ];

    return (
        <div className={styles.container}>
            <div className="text-gray-900 dark:text-gray-100 text-sm">Less</div>
            <div className={styles.colors}>
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={styles.color}
                        style={{ backgroundColor: color }}
                    >
                        <div className={styles.tooltip}>{tooltipTexts[index]}</div>
                    </div>
                ))}
            </div>
            <div className="text-gray-900 dark:text-gray-100 text-sm">More</div>
        </div>
    );
};