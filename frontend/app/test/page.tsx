"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'


export default function TestPage() {
  const [data, setData] = useState({ name: "", role: ""})
  const router = useRouter()

  const getData = async () => {
    const token = localStorage.getItem("Token")
     if (!token) {
      router.push('/login')
      return
    }
    const res = await fetch('http://localhost:8000/test', {
      
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      
    })
     if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("Token")
      router.push('/login')
      return
    }
    const json = await res.json()
    setData(json)
  }
  if (data.role === 'employee'){
    router.push('/unaccess')
  }

  useEffect(() => {
    getData();
  }, [])
  
  

  console.log("Got the data: ", data);

  return (
    <div>
      <h1>Hello {data.name} you are an {data.role} </h1>
    </div>
  )
}
