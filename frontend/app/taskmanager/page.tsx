"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


interface Todo {
  id: number
  title: string
  status: string
  created_at: string
  description: string
  due_time: string
  user_id: number
}

interface User {
  name: string
  role: string
  firstname: string
}

export default function accueil() {
  const [data, setData] = useState<User>({ name: "", role: "", firstname: "" })
  const [task, settask] = useState<Todo[]>([])
  const router = useRouter()

  const getData = async () => {
    const token = localStorage.getItem("Token")
    if (!token) {
      router.push('/login')
      return
    }
    const res = await fetch('http://localhost:8000/user', {

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

  //////////////////

  const gettask = async () => {
    const token = localStorage.getItem("Token")
    if (!token) {
      router.push('/login')
      return
    }
    const res = await fetch('http://localhost:8000/todos', {

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
    const jsontask = await res.json()
    if (jsontask.todos)
    {
      console.log(jsontask)
      settask(jsontask.todos)
      console.log(task)
    }
  }
  
    if (data.role === 'employee'){
      router.push('/unaccess')
    }
    

  useEffect(() => {
    getData(),
    gettask();
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

        <h2>Task of the day : </h2>

        <ul>
           {task.length===0 && <p>No task assigned yet !</p>}
          { task.map((item) => (
            <p key={item.id}> <br/><strong>- Title :</strong> {item.title} <br/><strong>Description of the task:</strong> {item.description} <br/><strong>Creation date:</strong> {item.created_at} <br/><strong>due_time:</strong> {item.due_time} <br/> <strong>status:</strong> {item.status} <br/> <strong>employee :</strong>{item.user_id}  </p>
          ))}
        </ul>

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

