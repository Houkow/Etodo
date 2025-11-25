"use client"
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import { LoaderCircle, Lock, Mail, UserPen, UserRoundPen } from 'lucide-react'
import { describe } from "node:test";


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
  const [addtask, setaddtask] = useState({ id: '', title:'', description: '', due_time: '', user_id: '' })
  const [errors, setErrors] = useState({ id: '', title:'', description: '', due_time: '', user_id: '' })
  const [loading, setLoading] = useState(false)


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
    
    if (json.role === 'employee') {
      router.push('/unaccess')
    }
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
  
  

  
  const deletetask = async (id: number): Promise<void> => {
    const token = localStorage.getItem("Token")
    if (!token) {
      router.push('/login')
      return
    }
    const res = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "delete",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      
    });
    
    }
 
/////////////////////////////
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setaddtask({ ...addtask, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit =  async (e: FormEvent) => {
    e.preventDefault()
    let newErrors = { id: '', title:'', description: '', due_time: '', user_id: '' }

    if (!addtask.title.trim()) newErrors.title = 'Please enter a valid email.'
    if (!addtask.description.trim()) newErrors.description = 'Password cannot be empty.'
    if (!addtask.due_time.trim()) newErrors.due_time = 'Please enter your firstname.'
    if (!addtask.user_id.trim()) newErrors.user_id = 'Please enter your name.'

    if (newErrors.title || newErrors.description || newErrors.due_time|| newErrors.user_id ) {
      setErrors(newErrors)
      return
    }
   setLoading(true)

    try {
      const token = localStorage.getItem("Token")
      if (!token) {
        router.push('/login')
        return
      }
      const res = await fetch('http://localhost:8000/todos', {
        method: 'POST', 
        headers: {  
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
       }, 
        body: JSON.stringify(addtask), 
      })

      if (!res.ok) { 
        const text = await res.text()
        alert(`Registration failed: ${text}`)
      } else {
        alert('User registered successfully!')
      }
    } catch (err) {
      console.error('Error:', err) 
      alert('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
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
      
        <h2>Add task to a employee</h2>

        
  <form onSubmit={handleSubmit}>

           <div className="mb-6">
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-gray-700">
              title
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">
                <UserPen size={20} />
              </span>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter the title of the task"
                value={addtask.title}
                onChange={handleChange}
                 className={`w-full rounded-lg border px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-200 text-gray-500 ${
                  errors.title ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
                />
            </div>
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            <div className="mb-6">
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-gray-700">
              description
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">
                <UserRoundPen size={20} />
              </span>
              <input
                id="description"
                type="text"
                name="description"
                placeholder="Enter the title"
                value={addtask.description}
                onChange={handleChange}
               className={`w-full rounded-lg border px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-200 text-gray-500 ${
                  errors.title ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
                />
            </div>
             {errors.title && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            
          </div>
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="due_time" className="mb-1.5 block text-sm font-medium text-gray-700">
              due_time
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">
                <Mail size={20} />
              </span>
              <input
                id="due_time"
                type="date"
                name="due_time"
                placeholder="Enter your email"
                value={addtask.due_time}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-200 text-gray-500 ${
                  errors.title ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.due_time && <p className="mt-1 text-sm text-red-600">{errors.due_time}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="user_id" className="mb-1.5 block text-sm font-medium text-gray-500">
              user_id
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500 ">
                <Lock size={20} />
              </span>
              <input
                id="user_id"
                type="text"
                name="user_id"
                placeholder="Enter your password"
                value={addtask.user_id}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-200 text-gray-500 ${
                  errors.user_id ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-10 w-full items-center justify-center rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 disabled:bg-gray-300"
          >
            {loading ? <LoaderCircle className="animate-spin" size={20} /> : 'Sign in'}
          </button>
        </form>

        <h2>Task of the day : </h2>

        <ul>
           {task.length===0 && <p>No task assigned yet !</p>}
          { task.map((item) => (
            <p key={item.id}> <br/><strong>- Title :</strong> {item.title} <br/><strong>Description of the task:</strong> {item.description} <br/><strong>Creation date:</strong> {item.created_at} <br/><strong>due_time:</strong> {item.due_time} <br/> <strong>status:</strong> {item.status} <br/> <strong>employee :</strong>{item.user_id}  
            
             <br/><br/> <a className="buttondelete"  href="" onClick={() => deletetask(item.id)}
              >delete the task</a>
            
            </p>
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

