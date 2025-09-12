"use client";

import React from 'react';
import UsesGrid from '@/components/UsesGrid';
import bookmarks from '@/data/bookmark';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UsesPage = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-6 py-12"
        >
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold mb-2 font-peachi"
            >
                My Gear & Uses
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-700 dark:text-gray-300 mb-6"
            >
                A peek into the tools and technologies I use daily.
            </motion.p>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <UsesGrid />
            </motion.div>
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-semibold mt-12 mb-4"
            >
                Bookmarks
            </motion.h2>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {bookmarks.map((bookmark, index) => (
                    <motion.a 
                        key={index} 
                        href={bookmark.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block p-5 border rounded-[4px] shadow-sm hover:shadow-md transition bg-white dark:bg-neutral-900"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + (index * 0.1) }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center mb-2 text-gray-500 dark:text-gray-400">
                            <span className="text-sm font-medium">{bookmark.url.replace(/https?:\/\//, '')}</span>
                            <FaExternalLinkAlt className="ml-2 text-xs" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{bookmark.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{bookmark.description}</p>
                    </motion.a>
                ))}
            </motion.div>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs text-gray-500 dark:text-gray-400 mt-8"
            >
                This page is inspired by <a href="https://sayandey.dev/utilities" className="underline">Sayan Dey</a>.
            </motion.p>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-xl text-gray-500 dark:text-gray-400 mt-8"
            >
        Last Update: <span className="font-bold">12 September 2025</span>
            </motion.p>
        </motion.div>
    );
};

export default UsesPage;
