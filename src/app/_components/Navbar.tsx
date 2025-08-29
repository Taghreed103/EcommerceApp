/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import logo from "../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { CartRes} from '../cart/typescript/cart.interface'
import   {useQuery ,  useQueryClient} from "@tanstack/react-query"
export default function Navbar() {
 


      const {data } =  useQuery<CartRes>({queryKey: ["cart"]  , queryFn:async()=>{
   
       const  res =  await  fetch("/api/cart")  
       const  payload =  await res.json() ;

       
       return   payload

   
       }})
   




  const  [isOpen, setIsOpen] = useState(false);



  const { data: session , status} = useSession();

  const links = [
  
    { path: "/products", element: "products" },
  ];



  const   auths = [
    // { path: "/cart", element: "cart" },
    { path: "/auth/register", element: "register" },
    { path: "/auth/login", element: "login" },
  ];


 function  handleLogOut(){

  signOut({callbackUrl:"/"})
 }

  return (
    <>
      <nav className="bg-light  w-full border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap  md:flex-nowrap   gap-5   items-center justify-between mx-auto p-4">
          <Link
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={logo} className="h-8   w-auto" alt="Flowbite Logo" />

            {session ? (   <span  className="text-sm  text-main">  {session?.user?.name}</span> )
            
            : (<span className="text-xs text-truncate text-main">Not logged in</span> )}
          </Link>
          <button

             onClick={ ()=>  setIsOpen(!isOpen)    }
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className= {`  ${isOpen&& " hidden" }   w-full md:flex   justify-between `} id="navbar-default">
            <ul className="text-black  ml-10 font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row  gap-5 md:mt-0 md:border-0  dark:bg-gray-800  dark:border-gray-700">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="block py-2 px-3 text-black-500   md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    {link.element.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>

             

              <ul className="ml-10 font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row gap-5 md:mt-0 md:border-0  dark:bg-gray-800  dark:border-gray-700">
               <li><i className="fa-brands fa-facebook"></i></li>
               <li><i className="fa-brands fa-twitter"></i></li>
               <li><i className="fa-brands fa-instagram"></i></li>
               <li><i className="fa-brands fa-youtube"></i></li>


          { status === "unauthenticated" ?
          
          
             <>
             
                {auths.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="block py-2 px-3 text-gray-500   md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    {link.element.toUpperCase()}
                  </Link>
                </li>
              ))}
             
             </>:

              <>
                <li className="relative"><Link  href={"/cart"}>
                   <i  className="fa-solid fa-cart-shopping"></i> 
                   
                 <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-xs font-bold bg-red-500 text-white
                  rounded-full w-5 h-5 flex items-center justify-center">
                    {data?.numOfCartItems}

                  </span>
                
                
                
                </Link>
                
              
                
                </li>

               <li className="cursor-pointer"  onClick={handleLogOut} >Log Out </li>
               <li>Hi {session?.user?.name} </li>
               {session?.user?.image  && 
                <li><img  className="size-[25px] rounded" alt="" src= {session?.user?.image}></img> </li> }                  
                        

             </>

              }
            
          
           
            </ul>





          </div>
        </div>
      </nav>
    </>
  );
}
