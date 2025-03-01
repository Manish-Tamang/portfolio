import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlurFadeImage } from './BlurFade';

interface UsesCardProps {
    item: {
        name: string;
        description: string;
        image?: string;
        icon?: React.ComponentType<any>;
        link?: string;
        tags?: string[];
    };
    displayStyle: 'imageWithTags' | 'iconOnly';
}

const UsesCard: React.FC<UsesCardProps> = ({ item, displayStyle }) => {
    return (
        <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-[4px] flex flex-col items-center transform transition-transform duration-300 hover:scale-105">

            <CardContent className="p-4 flex flex-col items-center">
                {displayStyle === 'imageWithTags' && item.image && (
                    <div className="relative w-30 h-25 mb-2">
                        <BlurFadeImage
                            src={item.image}
                            alt={item.name}
                            className="rounded-[4px] object-contain transition-transform duration-300 hover:scale-110"
                            delay={0.1}
                            width={100}
                            height={100}
                        />
                    </div>
                )}
                {displayStyle === 'iconOnly' && item.icon && (
                    <div className="transition-transform duration-300 hover:scale-110">
                        <item.icon className="h-8 w-8 mb-2 text-gray-800 dark:text-gray-100" />
                    </div>
                )}
                <CardTitle className="text-md font-semibold text-gray-800 dark:text-gray-100 text-center">{item.name}</CardTitle>
                {displayStyle === 'imageWithTags' && (
                    <>
                        <CardDescription className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                            {item.description}
                        </CardDescription>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {item.tags && item.tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    className="bg-[#38A662] hover:bg-[#2c8a4f] text-white border-0 transition-colors duration-200"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default UsesCard;