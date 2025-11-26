"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"
import Google from './../../assets/google.png'
import Image from "next/image"
import {signIn} from 'next-auth/react'
import {useSession} from 'next-auth/react'

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const {data: userSession, status} = useSession();

    console.log(userSession, status, 'user data')
    

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        // Basic validation
        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        // Simulate login - store in localStorage
        const users = JSON.parse(localStorage.getItem("ShoppingMall_users") || "[]")
        const user = users.find((u) => u.email === email && u.password === password)

        if (!user) {
            setError("Invalid email or password")
            return
        }

        // Store logged-in user
        localStorage.setItem("ShoppingMall_current_user", JSON.stringify({ email: user.email, name: user.name }))
        router.push("/")
    }

    const handleGoogleLogin = async () => {
        const data = await signIn('google').then(response => {
            console.log(response, 'this is response')
        })
    }

    return (
        <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md shadow-lg">
                <div className="p-8">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-600">Sign in to your ShoppingMall account</p>
                    </div>

                    
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                                <span className="text-sm text-slate-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                Forgot password?
                            </a>
                        </div>

                        <button type="submit" className="w-full btn btn-info text-white py-2.5 font-semibold">
                            Sign In
                        </button>
                    </form>

                    <div className="my-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-600">or</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-info text-white w-full gap-2 mb-6"
                    >
                        <Image src={Google} alt="" width={20} height={20} />
                        Sign in with Google
                    </button>
                    <p className="text-center text-slate-600">
                        Dont have an account?{" "}
                        <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </Card>
        </main>
    )
}
