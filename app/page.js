"use client"
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [handle, setHandle] = useState("");
  const router = useRouter();

  const createLinkWay = async () => {
    router.push(`/generate?handle=${handle}`);
  }

  return (
    <div>
      <section className="bg-[#254f1a] min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-0 pt-[10vh] p-10 md:p-[10vw] ">
        <div className=" flex flex-col justify-center items-start">
          <p className="text-yellow-300 font-bold text-3xl md:text-6xl">Everything you are. In one, simple link in bio.</p>
          <p className="mb-4">Join people using LinkWay for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex flex-col sm:flex-row gap-2">
            <input type="text" value={handle} onChange={e=>setHandle(e.target.value)} placeholder="Enter your Handle" className="bg-white text-black p-2 rounded-lg" />
            <button onClick={()=>createLinkWay()} className="bg-green-800 text-white px-4 py-2 rounded-full">Claim Your LinkWay</button>
          </div>
        </div>
        <div className="ml-8">
          <Image
            src="/hero-image.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>
    </div>
  );
}
