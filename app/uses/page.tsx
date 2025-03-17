import React from 'react';
import UsesGrid from '@/components/UsesGrid';
import bookmarks from '@/data/bookmark';
import { FaExternalLinkAlt } from 'react-icons/fa';

const UsesPage = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-2 font-peachi">My Gear & Uses</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                A peek into the tools and technologies I use daily.
            </p>
            
            <UsesGrid />
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Bookmarks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookmarks.map((bookmark, index) => (
                    <a key={index} href={bookmark.url} target="_blank" rel="noopener noreferrer" className="block p-5 border rounded-[4px] shadow-sm hover:shadow-md transition bg-white dark:bg-gray-900">
                        <div className="flex items-center mb-2 text-gray-500 dark:text-gray-400">
                            <span className="text-sm font-medium">{bookmark.url.replace(/https?:\/\//, '')}</span>
                            <FaExternalLinkAlt className="ml-2 text-xs" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{bookmark.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{bookmark.description}</p>
                    </a>
                ))}
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
                This page is inspired by <a href="https://sayandey.dev/utilities" className="underline">Sayan Dey</a>.
            </p>
        </div>
    );
};

export default UsesPage;
