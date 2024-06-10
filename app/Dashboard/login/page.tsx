"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Link from "next/link"

const LoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-6">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Input id="email" type="email" required className="mt-1 block w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Input id="password" type="password" required className="mt-1 block w-full" />
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don`&apos;t have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage
