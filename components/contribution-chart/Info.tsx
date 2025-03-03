import { FC } from 'react';
import styles from '@/styles/Info.module.css';

type InfoProps = {
    colors: string[];
};

export const Info: FC<InfoProps> = ({ colors }) => {
    const tooltipTexts = [
        'No contributions',
        '1-9 contributions',
        '10-19 contributions',
        '20-29 contributions',
        '30+ contributions',
    ];

    return (
        <div className={styles.container}>
            <div className={styles.less}>Less</div>
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
            <div className={styles.more}>More</div>
        </div>
    );
};