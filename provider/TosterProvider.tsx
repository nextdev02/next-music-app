"use client"

import { Toaster } from "react-hot-toast"

const TosterProvider = () => {
  return (
   <Toaster
    toastOptions={{
        style: {
            background: '#111',
            color: '#fff',
            boxShadow: 'box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;'
            
        }
    }}
   />
  )
}

export default TosterProvider
