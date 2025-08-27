import Link from 'next/link'
import React from 'react'
import logo  from "../../assets/images/freshcart-logo.svg"
import Image  from "next/image"

export default function Footer() {
  return (
    <>
    
    

<footer className="bg-light  rounded-lg shadow-sm dark:bg-gray-900 m-4">
  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
        <Image src={  logo } className="h-8 w-auto" alt=" Logo" />
      <ul className="flex flex-wrap items-center  fw-bold mb-6 text-sm font-medium text-blue-700  fs-1 sm:mb-0 dark:text-gray-400">
        <li>
          <Link href="#" className="hover:underline me-4 md:me-6">About</Link>
        </li>
        <li>
          <Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
        </li>
        <li>
          <Link href="#" className="hover:underline me-4 md:me-6">Licensing</Link>
        </li>
        <li>
          <Link href="#" className="hover:underline">Contact</Link>
        </li>
      </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-pink-600 sm:text-center fw-bold dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
  </div>
</footer>


    
    </>
  )
}
