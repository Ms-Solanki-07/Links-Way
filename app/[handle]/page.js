import Link from 'next/link';
import React from 'react';
import clientPromise from '@/lib/mongoDB';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const { handle } = await params
    const client = await clientPromise;
    const db = client.db("linksway");   
    const collection = db.collection("links");
    const user = await collection.findOne({handle: handle});

    if (!user) {
        return notFound();
    }

    return <div className="min-h-screen bg-[#161d2c] p-[10vh] flex items-start justify-center">
        <div className="photo flex flex-col items-center justify-center gap-4">
            <img className="rounded-full w-20 h-20 bg-white" src={user.profilePicture ? user.profilePicture : "blankPic.jpg"} alt="profile" />
            <h1 className="text-white text-xl font-bold">@{user.handle}</h1>

            <div className="links flex flex-col items-center justify-center gap-4">
                {user.links.map((item, index) => {
                    return <Link key={index} href={`https://${item.link}`} target="_blank" className="link bg-white text-black hover:bg-blue-900 transition duration-300 px-4 py-2 rounded-full w-[30vw] text-center">
                            {item.linktext}
                            {' - '}
                            {item.link}
                    </Link>
                })}
            </div>
        </div>
    </div>
}