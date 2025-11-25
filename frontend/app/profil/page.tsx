"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

interface Todo {
  id: number
  title: string
  status: string
  created_at: string
  description: string
  due_time: string
  user_id: number
}



export default function accueil() {
  const [data, setData] = useState({ name: "", role: "", firstname: "" })
  const [displaytask, setdisplaytask] = useState<Todo[]>([])
  const router = useRouter()

  const getData = async () => {
    const token = localStorage.getItem("Token")
    if (!token) {
      router.push('/login')
      return
    }
    const res = await fetch('http://localhost:8000/user/me', {

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

  //////////////////

  const disptask = async () => {
    const token = localStorage.getItem("Token")
    if (!token) {
      router.push('/login')
      return
    }
    const res = await fetch('http://localhost:8000/user/todos', {

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
    if (jsontask.todos) {
      console.log(jsontask)
      setdisplaytask(jsontask.todos)
      console.log(displaytask)
    }
  }



  /////////////////////////



  const setstatus = async (id: number, newStatus: string): Promise<void> => {
    const token = localStorage.getItem("Token")
    if (!token) {
      router.push('/login')
      return
    }
    const res = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "put",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus }),
      
    });
     if (res.ok) {
      setdisplaytask(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
    
};


};


  useEffect(() => {
    getData()
    setstatus
    disptask()
  }, [])



  console.log("Got the data: ", data);



  return (

    <div>
      <link rel="stylesheet" href="style.css" />
      <header>
        <h2> Here, {data.name} you can see your profil  !</h2>
        <nav className="navbar">
          <ul className="nav-links">
            <li><a href="/accueil">Home</a></li>
            {data.role === "manager" && (
              <li><a href="/taskmanager">Task manager </a></li>)}
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
        <h2>Task of the day { }</h2>


        <ul>
          {displaytask.length === 0 && <p>No task assigned yet !</p>}
          {
            displaytask.map((item) => (
              <p key={item.id}> <br /><strong>- Title :</strong> {item.title} <strong><br />Description of the task:</strong> {item.description} <br /><strong>Creation date:</strong> {item.created_at} <br /><strong>due_time:</strong> {item.due_time} <br /> <strong>status:</strong> {item.status} <br /> <label htmlFor="pet-select"><strong>choose the status : </strong></label>
                <select
                  value={item.status}
                  onChange={(event) => setstatus(item.id, event.target.value)}
                >
                  <option value="">--Please choose the status of your task--</option>
                  <option value="not started">not started</option>
                  <option value="todo">todo</option>
                  <option value="in progress">in progress </option>
                  <option value="done">done</option>
                </select> </p>





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

