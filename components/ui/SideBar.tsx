import * as React from "react"
import { cn } from "../../lib/utils"
import Link from "next/link"

interface SidebarProps {
  className?: string
  children: React.ReactNode
}

interface SidebarItemProps {
  className?: string
  children: React.ReactNode
  href: string
}

export const Sidebar: React.FC<SidebarProps> = ({ className, children }) => {
  return (
    <div className={cn("w-64 bg-black text-white shadow-md h-screen overflow-hidden fixed top-0 left-0", className)}>
      <div className="p-4">
        <Link href="/" className="text-2xl font-bold">
          Bank Dashboard
        </Link>
      </div>
      {children}
    </div>
  )
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ className, children, href }) => {
  return (
    <Link href={href} className={cn("block hover:bg-gray-800 p-3 rounded-md", className)}>
      {children}
    </Link>
  )
}
