import * as React from "react"
import { Sidebar, SidebarItem } from "../components/ui/SideBar"
import { Badge } from "../components/ui/badge"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table"
import { LatestVendorTopup } from "./Dashboard/vendor-topup/page" // Import the LatestVendorTopup component
import { LatestVendorToCustomers } from "./Dashboard/vendor-to-customers/page" // Import the LatestVendorToCustomers component
import { LatestCustomerToCustomer } from "./Dashboard/customer-to-customer/page" // Import the LatestCustomerToCustomer component
import { LatestPaymentCustomerToMerchant } from "./Dashboard/payment-customer-to-merchant/page" // Import the LatestPaymentCustomerToMerchant component
import { LatestPendingInvoices } from "./Dashboard/pending-invoices/page"
import { LatestPaymentMerchantToMerchant } from "./Dashboard/payment-merchant-to-merchant/page"
import { LatestTotalTransactions } from "./Dashboard/total-transactions/page"
import { LatestPhysicalCardStatus } from "./Dashboard/physical-card-status/page"
const Page = () => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar className="w-64 bg-black text-white shadow-md">
        <SidebarItem href="/Dashboard/vendor-topup" className="hover:bg-gray-800 p-3 rounded-md">Vendor Topup</SidebarItem>
        <SidebarItem href="/Dashboard/vendor-to-customers" className="hover:bg-gray-800 p-3 rounded-md">Vendor to Customers</SidebarItem>
        <SidebarItem href="/Dashboard/customer-to-customer" className="hover:bg-gray-800 p-3 rounded-md">Customer to Customer</SidebarItem>
        <SidebarItem href="/Dashboard/payment-customer-to-merchant" className="hover:bg-gray-800 p-3 rounded-md">Payment (Customer to Merchant)</SidebarItem>
        <SidebarItem href="/Dashboard/payment-merchant-to-merchant" className="hover:bg-gray-800 p-3 rounded-md">Payment (Merchant to Merchant)</SidebarItem>
        <SidebarItem href="/Dashboard/pending-invoices" className="hover:bg-gray-800 p-3 rounded-md">Pending Invoices (B2B)</SidebarItem>
        <SidebarItem href="/Dashboard/total-transactions" className="hover:bg-gray-800 p-3 rounded-md">Total Transactions</SidebarItem>
        <SidebarItem href="/Dashboard/physical-card-status" className="hover:bg-gray-800 p-3 rounded-md">Physical Card Issuing Status</SidebarItem>
      </Sidebar>
      <div className="flex-1 p-6 ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <LatestVendorTopup /> {/* Use the LatestVendorTopup component here */}
          <LatestVendorToCustomers /> {/* Use the LatestVendorToCustomers component here */}
          <LatestCustomerToCustomer /> {/* Use the LatestCustomerToCustomer component here */}
          <LatestPaymentCustomerToMerchant /> {/* Use the LatestPaymentCustomerToMerchant component here */}
          <LatestPaymentMerchantToMerchant /> {/* Use the LatestPaymentCustomerToMerchant component here */}
          <LatestPendingInvoices /> {/* Use the LatestPendingInvoices component here */}
          <LatestTotalTransactions /> {/* Use the LatestTotalTransactions component here */}
          <LatestPhysicalCardStatus /> {/* Use the LatestPhysicalCardStatus component here */}
        </div>
      </div>
    </div>
  )
}

export default Page
