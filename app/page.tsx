"use client"

import * as React from "react"
import { useRouter } from "next/navigation" // Import useRouter from next/navigation
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import Link from "next/link"
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport, useToast } from "../components/ui/toast" // Import Toast components

const LoginPage = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const router = useRouter()
  const { open, message, setOpen, showToast } = useToast() // Initialize toast

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "admin" && password === "admin") {
      router.push("/Dashboard/home")
    } else {
      showToast("Invalid credentials", "Please check your email and password and try again.", "destructive")
    }
  }

  return (
    <ToastProvider> {/* Wrap your component with ToastProvider */}
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md p-6">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
        <ToastViewport />
        <Toast open={open} onOpenChange={setOpen} variant={message.variant}>
          <ToastTitle>{message.title}</ToastTitle>
          <ToastDescription>{message.description}</ToastDescription>
        </Toast>
      </div>
    </ToastProvider>
  )
}

export default LoginPage
