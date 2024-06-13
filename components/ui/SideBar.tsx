// components/ui/SideBar.tsx
"use client"
import * as React from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useKeyContext } from "../../context/KeyContext"; // Correctly import useKeyContext

interface SidebarProps {
  className?: string;
  role?: string;
}

interface SidebarItemProps {
  className?: string;
  children: React.ReactNode;
  href: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, role }) => {
  const { role: userRole } = useKeyContext(); // Get the role from context

  return (
    <div className={cn("w-64 bg-black text-white shadow-md h-screen overflow-hidden fixed top-0 left-0", className)}>
      <div className="p-4">
        <Link href="/Dashboard/home" className="text-4xl font-bold">
          Bank Dashboard
        </Link>
      </div>
      <div className="p-4">
        <SidebarItem href="/Dashboard/user-topup">User Topup</SidebarItem>
        <SidebarItem href="/Dashboard/vendor-to-customers">Vendor to Customers</SidebarItem>
        <SidebarItem href="/Dashboard/customer-to-customer">Customer to Customer</SidebarItem>
        <SidebarItem href="/Dashboard/payment-customer-to-merchant">Customer to Merchant</SidebarItem>
        <SidebarItem href="/Dashboard/payment-merchant-to-merchant">Merchant to Merchant</SidebarItem>
        <SidebarItem href="/Dashboard/pending-invoices">Pending Invoices</SidebarItem>
        <SidebarItem href="/Dashboard/total-transactions">Total Transactions</SidebarItem>
        <SidebarItem href="/Dashboard/physical-card-status">Card Issuing Status</SidebarItem>
        {userRole === "Admin" && ( // Conditionally render the tab based on the role
          <SidebarItem href="/Dashboard/signup">New Dashboard Employee</SidebarItem>
        )}
      </div>
    </div>
  );
};

export const SidebarItem: React.FC<SidebarItemProps> = ({ className, children, href }) => {
  return (
    <Link href={href}>
      <Button className={cn("text-l w-full text-left", className)} variant="ghost">
        <span className="text-left w-full">{children}</span>
      </Button>
    </Link>
  );
};
