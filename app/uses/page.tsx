import React from 'react';
import UsesGrid from '@/components/UsesGrid';

const UsesPage = () => {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-4xl font-bold mb-2 font-peachi">My Gear & Setup</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                A peek into the tools and technologies I use daily.
            </p>
            <UsesGrid />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
                This page is inspired by <a href="https://sayandey.dev/utilities" className="underline">Sayan Dey</a>.
            </p>
        </div>
    );
};

export default UsesPage;