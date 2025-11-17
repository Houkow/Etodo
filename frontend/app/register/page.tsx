'use client'
import { LoaderCircle, Lock, Mail, UserPen, UserRoundPen } from 'lucide-react'
import { ChangeEvent, FormEvent, use, useState } from 'react'
import Link from 'next/link'

function Register() {
  const [user, setUser] = useState({ name: '', firstname:'', email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' , firstname: '', name:''})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit =  async (e: FormEvent) => {
    e.preventDefault()
    let newErrors = { email: '', password: '', firstname: '', name: ''}

    if (!user.email.trim()) newErrors.email = 'Please enter a valid email.'
    if (!user.password.trim()) newErrors.password = 'Password cannot be empty.'
    if (!user.firstname.trim()) newErrors.firstname = 'Please enter your firstname.'
    if (!user.name.trim()) newErrors.name = 'Please enter your name.'

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }
   setLoading(true)

    try {
      const res = await fetch('http://localhost:8000/user/register', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(user), 
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

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        {/* Dummy Logo */}
        <div className="mb-4 flex justify-center">
          <span className="text-3xl font-bold text-yellow-500">⚡</span>
        </div>
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">Create Your  EPI TODO account for Company</h2>
        <form onSubmit={handleSubmit}>

           <div className="mb-6">
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">
                <UserPen size={20} />
              </span>
              <input
                id="name"
                type="name"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-200 text-gray-500`}
              />
            </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div className="mb-6">
            <label htmlFor="firstname" className="mb-1.5 block text-sm font-medium text-gray-700">
              Firstname
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">
                <UserRoundPen size={20} />
              </span>
              <input
                id="firstname"
                type="firstname"
                name="firstname"
                placeholder="Enter your firstname"
                value={user.firstname}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-200 text-gray-500`}
                
              />
            </div>
             {errors.email && <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>}
            
          </div>
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">
                <Mail size={20} />
              </span>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-200 text-gray-500 ${
                  errors.email ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-500">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500 ">
                <Lock size={20} />
              </span>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 pl-10 focus:ring-2 focus:ring-blue-200 text-gray-500 ${
                  errors.password ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
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

        {/* Sign up */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Do you have an account ? </span>
          <Link href="/login" className="text-sm font-medium text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register;