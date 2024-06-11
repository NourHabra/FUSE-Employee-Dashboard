"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport, useToast } from "../components/ui/toast"
import Image from "next/image"
import { genPublic, genShared, encryption, decryption } from "../lib/crypto-utils" // Import the TypeScript functions
import { useKeyContext } from "../context/KeyContext" // Adjust path if needed

const LoginPage = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [step, setStep] = React.useState(1)
  const router = useRouter()
  const { open, message, setOpen, showToast } = useToast()
  const { publicKey, privateKey, serverPublicKey, sharedKey, setPublicKey, setPrivateKey, setServerPublicKey, setSharedKey } = useKeyContext()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const clientPublicKey = await genPublic(); // Generate public key

      // Print the generated public key
      console.log("Client public key:", clientPublicKey);

      // Send public key and email to server for key exchange
      const response = await fetch("https://fuse-backend-x7mr.onrender.com/key/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, clientPublicKey }),
      });

      // Print the sent email and public key
      console.log("Sent email:", email);

      // Check if the server response is valid
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      // Print the server public key
      console.log("Server public key:", data.serverPublicKey);

      // Check if the server response contains the expected properties
      if (!data.serverPublicKey) {
        throw new Error("Invalid server response");
      }

      const { serverPublicKey } = data;

      // Save server public key in context
      setServerPublicKey(serverPublicKey);

      // Derive shared key using server public key
      const derivedSharedKey = await genShared(serverPublicKey);
      setSharedKey(derivedSharedKey);

      // Print the shared key
      console.log("Shared key:", derivedSharedKey);

      setStep(2); // Move to the next step
    } catch (error) {
      console.error('Error during key exchange:', error);
      showToast("Error", "Failed to exchange keys. Please try again.", "destructive");
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Shared key before encryption:", sharedKey); // Debug: Print shared key before using it
      if (sharedKey) {
        const encryptedPayload = await encryption({ data: { email, password } }, sharedKey); // Encrypt the email and password
        const response = await fetch("https://fuse-backend-x7mr.onrender.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email,payload: encryptedPayload }),
        });

        if (response.ok) {
          const decryptedData = await decryption(await response.json(), sharedKey); // Decrypt the server response
          // Handle the decrypted data as needed
          router.push("/Dashboard/home");
        } else {
          showToast("Invalid credentials", "Please check your email and password and try again.", "destructive");
        }
      } else {
        showToast("Error", "Encryption key not established. Please try again.", "destructive");
      }
    } catch (error) {
      console.error('Error during login:', error);
      showToast("Error", "Failed to login. Please try again.", "destructive");
    }
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md p-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Access your account
                </CardDescription>
              </div>
              <Image
              priority={true} // {false} | {true}
                src="/FuseLogo.png"
                alt="Fuse Logo"
                width={50}
                height={50}
                className="ml-2"
              />
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Next
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            )}
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
