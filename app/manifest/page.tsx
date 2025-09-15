"use client";

import React, { useState } from 'react';
import BucketList from '@/components/BucketList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BucketListItem {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    images?: string[];
}

const WishListItems = [
    { id: 101, title: "Learn Rust", description: "Dive into systems programming." },
    { id: 102, title: "Contribute to Open Source", description: "Help build great software." },
    { id: 103, title: "Attend a Tech Conference", description: "Connect with industry peers." },
];

const ManifestPage = () => {
    const [bucketList, setBucketList] = useState<BucketListItem[]>([
        { id: 1, title: "Buy a Gaming PC", completed: false },
        { id: 2, title: "Buy a Insta360 GO 3", images: ["/img/bucketlist/insta-360-go-3.jpg"], completed: false },
        { id: 3, title: "Buy a DJI Osmo Pocket 3", images: ["/img/bucketlist/dji.png"], completed: false },
        { id: 4, title: "Earn NPR 100k", completed: false },
        { id: 5, title: "Buy a MacBook Air M4", images: ["/img/bucketlist/macbook.jpg",], completed: false },
        { id: 6, title: "Buy a Sony A6700", images: ["/img/bucketlist/A6700.jpg"], completed: false },
        { id: 7, title: "Buy a Jetson Orin Nano Super Developer Kit", images: ["/img/bucketlist/jetson-nano.jpg"], completed: false },
    ]);

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8 font-peachi">Manifest List</h1>

            { }
            <section className="mb-8">
                <Card className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-200">

                    <CardContent><BucketList bucketList={bucketList} setBucketList={setBucketList} />
                    </CardContent>
                </Card>
            </section>

            { }
            <section>
                <h2 className="text-2xl font-semibold mb-4">My Learning Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {WishListItems.map((item) => (
                        <Card key={item.id} className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-200">
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className='text-gray-900 dark:text-gray-200' >{item.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
                The Bucket List section is inspired by <a href="https://theodorusclarence.com/bucket-list" className="underline">Theodorus Clarence</a>.
            </p>
            <p className="text-xl text-gray-500 dark:text-gray-400 mt-8"
            >
                Last Update: <span className="font-bold">11 September 2025</span>
            </p>    
        </div>
    );
};

export default ManifestPage;