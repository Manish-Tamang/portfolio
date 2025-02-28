import React from "react";

interface EducationItemProps {
    logo: React.ReactNode;
    institution: string;
    degree: string;
    dateRange: string;
    description: string;
}

const EducationItem = ({ logo, institution, degree, dateRange, description }: EducationItemProps) => (
    <div className="flex gap-4 mb-8">
        <div className="flex-shrink-0">
            {logo}
        </div>
        <div className="flex flex-col">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{institution}</h3>
            <p className="text-gray-800 dark:text-gray-300">{degree}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span className="bg-[#7AC594] dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-4 py-1 rounded-full">{dateRange}</span>
            </p>
            <p className="text-gray-800 dark:text-gray-300 mt-2">{description}</p>
        </div>
    </div>
);

const Education = () => {
    const educationItems = [
        {
            logo: (
                <img
                    src="/img/sushma.jpg"
                    alt="Sushma Godawari College Logo"
                    className="w-12 h-12 rounded-full overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
            ),
            institution: "Sushma Godawari College",
            degree: "+2 Science",
            dateRange: "JUL 2024 - APR 2026",
            description: "Currently studying +2 Computer Science at Sushma Godawari College."
        },
        {
            logo: (
                <img
                    src="/img/prashanti.jpg"
                    alt="Prashanti Academy Logo"
                    className="w-12 h-12 rounded-full overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
            ),
            institution: "Prashanti Academy",
            degree: "Full-Stack Web Development",
            dateRange: "JUN 2020 - MAR 2024",
            description: "Completed my lower and upper secondary school at Prashanti Academy."
        },
        {
            logo: (
                <img
                    src="/img/ypointing.jpg"
                    alt="Y-pointing Sec. Boarding School Logo"
                    className="w-13 h-12 rounded-full overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
            ),
            institution: "Y-pointing Sec. Boarding School",
            degree: "Secondary Education",
            dateRange: "JUN 2012 - MAR 2020",
            description: "Completed my primary education at Y-pointing Sec. Boarding School."
        }
    ];

    return (
        <div className="w-full max-w-2xl p-6 rounded-lg">
            {educationItems.map((education, index) => (
                <EducationItem key={index} {...education} />
            ))}
        </div>
    );
};

export default Education;
