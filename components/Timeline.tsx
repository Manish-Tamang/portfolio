import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { FiArrowRight } from 'react-icons/fi';


interface TimelineItem {
    _id: string;
    year: string;
    title: string;
    description: string;
}

interface GroupedTimelineData {
    year: string;
    items: TimelineItem[];
}

const Divider = () => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-600 w-full my-8" />
    );
};

const Timeline = () => {
    const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [visibleItems, setVisibleItems] = useState<GroupedTimelineData[]>([]);

    useEffect(() => {
        const fetchTimelineData = async () => {
            try {
                const data: TimelineItem[] = await client.fetch(
                    `*[_type == "timeline"] | order(year desc)`
                );
                setTimelineData(data);
            } catch (error) {
                console.error('Error fetching timeline data:', error);
            }
        };

        fetchTimelineData();
    }, []);

    useEffect(() => {

        const groupedData = timelineData.reduce<Record<string, TimelineItem[]>>((acc, item) => {
            if (!acc[item.year]) {
                acc[item.year] = [];
            }
            acc[item.year].push(item);
            return acc;
        }, {});


        const groupedDataArray: GroupedTimelineData[] = Object.keys(groupedData)
            .map((year) => ({
                year,
                items: groupedData[year]
            }))
            .sort((a, b) => parseInt(b.year) - parseInt(a.year));


        setVisibleItems(showAll ? groupedDataArray : groupedDataArray.slice(0, 3));
    }, [timelineData, showAll]);

    const handleSeeMore = () => {
        setShowAll(true);
    };

    const handleSeeLess = () => {
        setShowAll(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-peachi font-medium mb-1">
                Timeline
            </h2>
            <div className="relative mb-1 border-l border-gray-200 dark:border-gray-700">
                {visibleItems.map(({ year, items }) => (
                    <div key={year}>
                        <div className="mb-2 ml-4 relative">
                            <div className="absolute -left-1.5 mt-1.5 -ml-4 h-3 w-3 rounded-full border border-white bg-gray-300 dark:border-gray-900 dark:bg-gray-700"></div>
                            <time className="ml-2 text-sm font-normal leading-none text-gray-500 dark:text-[#c2c2c2]">
                                {year}
                            </time>
                            {items.map((item) => (
                                <div key={item._id} className="mb-2">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {item.title}
                                    </h2>
                                    <p className="mb-2 text-base font-normal text-gray-500 dark:text-[#c2c2c2]">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                            <Divider />
                        </div>
                    </div>
                ))}
            </div>
            {timelineData.length > 3 && !showAll && (
                <button
                    type="button"
                    className="flex items-center text-sm my-4 mx-auto px-4 py-2 rounded-md font-medium text-gray-900 dark:text-gray-100"
                    onClick={handleSeeMore}
                >
                    See More
                    <FiArrowRight className="h-4 w-4 ml-1" />
                </button>
            )}
            {showAll && timelineData.length > 3 && (
                <button
                    type="button"
                    className="flex items-center text-sm my-4 mx-auto px-4 py-2 rounded-md font-medium text-gray-900 dark:text-gray-100"
                    onClick={handleSeeLess}
                >
                    See Less
                    <FiArrowRight className="h-4 w-4 ml-1 rotate-180" />
                </button>
            )}
        </div>
    );
};

export default Timeline;