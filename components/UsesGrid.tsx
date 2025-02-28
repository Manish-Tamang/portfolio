import React from 'react';
import UsesCard from '@/components/UsesCard';
import {
    gearItems,
    systemItems,
    codingItems,
    softwareItems,
} from '@/data/uses';


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

const UsesGrid = () => {
    return (
        <>
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Gear</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {gearItems.map((item, index) => (
                        <UsesCard key={index} item={item} displayStyle="imageWithTags" />
                    ))}
                </div>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">System</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {systemItems.map((item, index) => (
                        <UsesCard key={index} item={item} displayStyle="iconOnly" />
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Coding Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {codingItems.map((item, index) => (
                        <UsesCard key={index} item={item} displayStyle="iconOnly" />
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Software/Applications</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {softwareItems.map((item, index) => (
                        <UsesCard key={index} item={item} displayStyle="iconOnly" />
                    ))}
                </div>
            </section>
        </>
    );
};

export default UsesGrid;