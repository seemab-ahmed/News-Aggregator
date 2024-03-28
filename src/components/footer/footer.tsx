import React from 'react'

export const Footer = () => {
  return (
    <div>
      <div className="bg-gray-100 pt-5 mt-10">
   <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
     <div className="p-5">
       <h3 className="font-bold text-xl text-indigo-600">Componentity</h3>
     </div>
      <div className="p-5">
         <div className="text-sm uppercase text-indigo-600 font-bold">Resources</div>
         <a className="my-3 block" href="/#">Documentation <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Tutorials <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Support <span className="text-teal-600 text-xs p-1">New</span></a> 
      </div>
      <div className="p-5">
         <div className="text-sm uppercase text-indigo-600 font-bold">Support</div>
         <a className="my-3 block" href="/#">Help Center <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Privacy Policy <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">Conditions <span className="text-teal-600 text-xs p-1"></span></a> 
      </div>
      <div className="p-5">
         <div className="text-sm uppercase text-indigo-600 font-bold">Contact us</div>
         <a className="my-3 block" href="/#">XXX XXXX, Floor 4 San Francisco, CA <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">contact@company.com <span className="text-teal-600 text-xs p-1"></span></a> 
      </div>
   </div>
</div>
<div className="bg-gray-100 pt-2">
   <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center">

      <div className="my-5">© Copyright 2020. All Rights Reserved.</div>
   </div>
</div>
    </div>
  )
}
