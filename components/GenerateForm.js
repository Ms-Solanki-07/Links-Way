'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const GenerateForm = () => {
  const searchParams = useSearchParams();
  const initialHandle = searchParams.get('handle');
  const handleGenerated = searchParams.get('handlegenerated');
  const router = useRouter();

  const [links, setLinks] = useState([{ link: '', linktext: '' }])
  const [handle, setHandle] = useState(initialHandle || '')
  const [profilePicture, setProfilePicture] = useState('')
  const [yourLinkWay, setYourLinkWay] = useState('')

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i === index) {
          return { link, linktext };
        } else {
          return item;
        }
      });
    });
  };

  const addLink = () => {
    setLinks(links.concat([{ link: '', linktext: '' }]));
  };

  const submitLinks = async () => {
    const res = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        links,
        handle,
        profilePicture,
      }),
    });

    const data = await res.json();

    setProfilePicture('');
    if (data.success) {
        setYourLinkWay(`${process.env.NEXT_PUBLIC_HOST}/${handle}`);
        setLinks([{ link: '', linktext: '' }]);
        router.push(`/generate?handlegenerated=true`);
        toast.success(data.message);
      setHandle('');
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='grid grid-cols-1 md:grid-cols-2 p-[10vw] pt-16 md:p-[10vw] bg-[#225ac0] min-h-screen'>
        <div className="form flex flex-col justify-start items-start text-black py-6">
          <h1 className='font-bold text-3xl'>Create Your Link-Way</h1>

          <h2 className='text-gray-800 mt-3'>Step 1: Claim your Handle</h2>
          <div className="ml-4">
            <input value={handle} onChange={e => setHandle(e.target.value)} className='bg-white text-gray-600 p-1.5 px-3 rounded-full focus:outline-purple-900' type="text" placeholder='Choose your Handle' />
          </div>

          <h2 className='text-gray-800 mt-3'>Step 2: Add Links</h2>
          {links.map((item, index) => (
            <div key={index} className="ml-4 mt-2 flex gap-2 flex-col lg:flex-row">
              <input value={item.linktext || ''} onChange={e => handleChange(index, item.link, e.target.value)} className='bg-white text-gray-600 p-1.5 px-3 rounded-full focus:outline-purple-900' type="text" placeholder='Enter link text' />
              <input value={item.link || ''} onChange={e => handleChange(index, e.target.value, item.linktext)} className='bg-white text-gray-600 p-1.5 px-3 rounded-full lg:w-40 focus:outline-purple-900' type="text" placeholder='Enter link' />
            </div>
          ))}
          <button onClick={addLink} className='mt-2 ml-4 bg-green-800 text-white p-1.5 px-3 rounded-full'>+ Add Link</button>

          <h2 className='text-gray-800 mt-3'>Step 3: Add Picture and Finalize</h2>
          <div className="ml-4 flex flex-col gap-2 mt-2 min-w-[70vw] md:min-w-[30vw]">
            <input value={profilePicture} onChange={e => setProfilePicture(e.target.value)} className='bg-white text-gray-600 p-1.5 px-3 rounded-full focus:outline-purple-900' type="text" placeholder='Enter link your profile picture' />
            <button disabled={handle === '' || links[0].linktext === '' || links[0].link === ''} onClick={submitLinks} className='disabled:bg-slate-600 bg-green-800 text-white px-4 py-2 rounded-full'>Create Link-Way</button>
          </div>

          {handleGenerated && (
            <div className="yourLinkWay flex items-center gap-2 mt-3">
              <h2 className='text-gray-800 font-bold'>Your Link-Way:</h2>
              <Link href={yourLinkWay}><code className='text-white'>{yourLinkWay}</code></Link>
            </div>
          )}
        </div>
        <div className="image md:block hidden">
          <img src="/banner-login.jpg" alt="" className=" w-full h-auto object-cover" />
        </div>
      </div>
    </>
  );
};

export default GenerateForm;
