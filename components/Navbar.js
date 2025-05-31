"use client"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

const Navbar = () => {
  const pathname = usePathname();
  const isGeneratePage = ["/", "/generate"].includes(pathname);
  const [handle, setHandle] = useState('')
  const router = useRouter();

  const searchHandle = async () => {
    if (!handle) {
      toast.error('Please enter a handle to search');
      return;
    }
    else if (handle.includes(' ')) {
      toast.error('Handle cannot contain spaces');
      return;
    }
    else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "handle": handle
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      let r = await fetch("http://localhost:3000/api/search", requestOptions)
      let res = await r.json();
      if (res.success) {
        router.push(`/${res.result.handle}`);
        setHandle('');
      } else {
        toast.error(res.message);
      }
    }
  }

  return (<>{isGeneratePage && <nav className='bg-white text-black justify-between flex items-center rounded-full w-[80vw] mx-auto shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2'>
    <div className="logo flex gap-6 items-center p-4">
      <Link href={'/'}><h1 className="text-xl mx-3 font-bold">Links-Way</h1></Link>
    </div>
    <div>
      <ul className='flex gap-4 items-center justify-end mx-4'>
        {/* <li className='bg-slate-200 rounded-lg px-4 py-2'>Sign In</li> */}
        <input value={handle} onChange={e => { setHandle(e.target.value) }} className='bg-slate-300 text-black px-4 py-2 min-w-8 rounded-full' type="text" placeholder='Search Handle' />
        <button onClick={() => searchHandle()} className='bg-green-800 rounded-full text-white px-4 py-2'>Search</button>
      </ul>
    </div>
  </nav>}
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" />
  </>
  )
}

export default Navbar
