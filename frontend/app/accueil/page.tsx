"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'


export default function accueil() {
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
        <link rel="stylesheet" href="style.css" />
        <header>
          <h2> 👋 Welcome to your work environment, {data.name}  !</h2>
          <nav className="navbar">
            <ul className="nav-links">
              <li><a href="/index.php">Home</a></li>
              <li><a href="">Start / End the day</a></li>
                <li><a className="right">test</a></li>
              
            </ul>
          </nav>
        </header>
        <section id="About">
          <h2>Task of the day</h2>
          <div className="section-content collapsed">
            <div className="section-header">
           </div>
          </div>
        </section>
        <footer>
          <p>Web page created with ❤️ by Théo Mayer, Théo Garde and Hanniel</p>
        </footer>
      </div>
    );
  }

