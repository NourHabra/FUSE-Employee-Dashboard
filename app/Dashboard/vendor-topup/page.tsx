"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import Link from "next/link"; // Import Link from next/link
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../../../components/ui/dropdown-menu";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../../../components/ui/tooltip";
import { FaFilter, FaSort } from "react-icons/fa"; // Importing icons from react-icons
import { Sidebar } from "../../../components/ui/SideBar"; // Import Sidebar

interface TopupData {
  vendor: string;
  accountNumber: string;
  date: string;
  amount: number;
}

const VendorTopup = () => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof TopupData, direction: string } | null>(null);
  const [filter, setFilter] = useState<{ accountNumber: string, date: string, minAmount: string, maxAmount: string }>({
    accountNumber: "",
    date: "",
    minAmount: "",
    maxAmount: ""
  });

  const topupData: TopupData[] = useMemo(() => [
    { vendor: "Vendor 1", accountNumber: "12345", date: "2023-01-01", amount: 500.00 },
    { vendor: "Vendor 2", accountNumber: "67890", date: "2023-02-01", amount: 300.00 },
    { vendor: "Vendor 3", accountNumber: "54321", date: "2023-03-01", amount: 700.00 },
    { vendor: "Vendor 4", accountNumber: "98765", date: "2023-04-01", amount: 400.00 },
    { vendor: "Vendor 5", accountNumber: "65432", date: "2023-05-01", amount: 600.00 },
    { vendor: "Vendor 6", accountNumber: "32109", date: "2023-06-01", amount: 800.00 },
    // Add more data as needed
  ], []);

  const sortedData = useMemo(() => {
    let sortableData = [...topupData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [topupData, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(item => {
      const matchesAccountNumber = item.accountNumber.includes(filter.accountNumber);
      const matchesDate = item.date.includes(filter.date);
      const matchesMinAmount = filter.minAmount === "" || item.amount >= parseFloat(filter.minAmount);
      const matchesMaxAmount = filter.maxAmount === "" || item.amount <= parseFloat(filter.maxAmount);
      return matchesAccountNumber && matchesDate && matchesMinAmount && matchesMaxAmount;
    });
  }, [sortedData, filter]);

  const requestSort = (key: keyof TopupData) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value }));
  };

  const handleSortChange = (value: string) => {
    switch (value) {
      case 'vendor':
        requestSort('vendor');
        break;
      case 'accountNumber':
        requestSort('accountNumber');
        break;
      case 'date':
        requestSort('date');
        break;
      case 'amount':
        requestSort('amount');
        break;
      default:
        break;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar className="w-64 bg-black text-white shadow-md" />
        <div className="flex-1 p-6 ml-64">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle>Vendor Topup</CardTitle>
              <CardDescription>Details of vendor top-ups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-end space-x-4">
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <FaFilter />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Filter</span>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent>
                    <div className="p-4 grid grid-cols-1 gap-4">
                      <Input 
                        type="text" 
                        placeholder="Filter by account number..." 
                        name="accountNumber"
                        value={filter.accountNumber} 
                        onChange={handleFilterChange} 
                      />
                      <Input 
                        type="date" 
                        placeholder="Filter by date..." 
                        name="date"
                        value={filter.date} 
                        onChange={handleFilterChange} 
                      />
                      <Input 
                        type="number" 
                        placeholder="Min amount..." 
                        name="minAmount"
                        value={filter.minAmount} 
                        onChange={handleFilterChange} 
                      />
                      <Input 
                        type="number" 
                        placeholder="Max amount..." 
                        name="maxAmount"
                        value={filter.maxAmount} 
                        onChange={handleFilterChange} 
                      />
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <FaSort />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Sort</span>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => handleSortChange('vendor')}>Vendor</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleSortChange('accountNumber')}>Account Number</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleSortChange('date')}>Date</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleSortChange('amount')}>Amount</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('vendor')}>
                      Vendor {sortConfig?.key === 'vendor' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('accountNumber')}>
                      Account Number {sortConfig?.key === 'accountNumber' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('date')}>
                      Date {sortConfig?.key === 'date' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('amount')}>
                      Amount {sortConfig?.key === 'amount' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.vendor}</TableCell>
                      <TableCell>{item.accountNumber}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>${item.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export const LatestVendorTopup: React.FC = () => {
  const topupData: TopupData[] = [
    { vendor: "Vendor 1", accountNumber: "12345", date: "2023-01-01", amount: 500.00 },
    { vendor: "Vendor 2", accountNumber: "67890", date: "2023-02-01", amount: 300.00 },
    { vendor: "Vendor 3", accountNumber: "54321", date: "2023-03-01", amount: 700.00 },
    { vendor: "Vendor 4", accountNumber: "98765", date: "2024-04-01", amount: 400.00 },
    { vendor: "Vendor 5", accountNumber: "65432", date: "2024-05-01", amount: 600.00 },
    { vendor: "Vendor 6", accountNumber: "32109", date: "2024-06-01", amount: 800.00 },
    // Add more data as needed
  ];

  // Sort the data by date in descending order and take the top 3 entries
  const latestTopupData = topupData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <Link href="/Dashboard/vendor-topup">
      <Card className="bg-white shadow-md cursor-pointer">
        <CardHeader>
          <CardTitle>Vendor Topup</CardTitle>
          <CardDescription>Newest 3 transactions from vendors topup</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestTopupData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>{item.accountNumber}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>${item.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VendorTopup;
