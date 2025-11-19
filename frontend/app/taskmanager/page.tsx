"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';



export default function accueil() {
  const [data, setData] = useState({ name: "", role: "", firstname: "" })
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
        <h2> Here {data.name}, you can add a new task for manage your team  !</h2>
        <nav className="navbar">
          <ul className="nav-links">
            <li><a href="/accueil">Home</a></li>
            <li className="dropdown">
              <button className="dropbtn">
                {data.name} {data.firstname} | {data.role}
                <i className="fa fa-caret-down"></i>
              </button>

              <div className="dropdown-content">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("Token")
                    router.push('/login')
                  }}
                >
                  Déconnexion
                </button>
              </div>
            </li>


          </ul>
        </nav>
      </header>
     <section>
        <a className="buttonhome" href="">Add new task</a>

        <h2>Task of the day :  </h2>

        <div className="section-content collapsed"> 
          <div className="section-header">
          </div>
        </div>
      </section>
      <footer>
        <p>Web page created with ❤️ by Théo Garde and Hanniel</p>
      </footer>
    </div>
  );
}

