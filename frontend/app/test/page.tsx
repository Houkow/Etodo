"use client"
import { useEffect, useState } from "react"

export default function TestPage() {
  const [data, setData] = useState({ name: "" })

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
      <h1>Hello {data.name}</h1>
    </div>
  )
}
