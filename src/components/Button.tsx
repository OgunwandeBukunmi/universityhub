"use client"
import React, { useState } from 'react'
import { FiShoppingCart } from "react-icons/fi";
export default function Button({click,item}) {

const [added,isAdded] = useState(false)
  return (
    <div>
          <button
                 onClick={() =>{ 
                    isAdded(true)
                    click(item)}}
                className={`w-full flex items-center justify-center gap-2 text-white py-2 rounded-xl font-medium transition ${added ?"bg-green-500 hover:bg-green-300" : " bg-secondary  hover:bg-secondary/90" } `}
                >
             <FiShoppingCart /> {added ? "Added to Cart" : "Add to Cart"}

             </button>
    </div>
   
  )
}
