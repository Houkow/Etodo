"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'


export default function TestPage() {
  const [data, setData] = useState({ role: ""})
  const router = useRouter()

  const getData = async () => {
    const token = localStorage.getItem("Token")
    
    const res = await fetch('http://localhost:8000/test', {
      
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      
    })
    const json = await res.json()
    setData(json)
  }

  useEffect(() => {
    getData();
  }, [])
  
  

  console.log("Got the data: ", data);

  return (
    <div>
      <h1>You don't have access to this page because you are an {data.role} ! </h1>
    </div>
  )
}
