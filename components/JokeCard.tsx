"use client";
import React, { useEffect, useState } from 'react';

const JokeCard = () => {
    const [joke, setJoke] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const truncateJoke = (text: string) => {
        const limit = 150;
        if (text.length > limit) {
            return text.slice(0, limit) + "...";
        }
        return text
    }


    useEffect(() => {
        const fetchJoke = async () => {
            try {
                const response = await fetch(
                    'https://v2.jokeapi.dev/joke/Programming?format=json'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch joke');
                }
                const data = await response.json();

                if (data.type === 'single') {
                    setJoke(truncateJoke(data.joke))
                } else if (data.type === 'twopart') {
                    if (data.setup.length > 100 || data.delivery.length > 100) {
                        setJoke(truncateJoke(`${data.setup} - ${data.delivery}`))
                    } else {
                        setJoke(`${data.setup} - ${data.delivery}`);
                    }
                }

                setError(null);
            } catch (error) {
                console.error('Error fetching joke:', error);
                setJoke(null);
                setError('Oops! Something went wrong. Please try again.');
            }
        };

        fetchJoke();
    }, []);

    return (
        <article className="mb-1 mt-1 w-full  border-t-2 border-b-2 border-gray-100 bg-white dark:border-gray-800 dark:bg-[#09090B]">
            <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                <div>
                    <h3 className="font-medium sm:text-lg text-gray-900 dark:text-gray-100">
                        <a href="https://jokeapi.dev/" className="hover:underline">
                            Random Programming Joke
                        </a>
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        {error ? error : joke || 'Loading joke...'}
                    </p>
                    <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                        <p className="hidden sm:block sm:text-xs text-gray-500 dark:text-gray-400">
                            Joke API
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default JokeCard;