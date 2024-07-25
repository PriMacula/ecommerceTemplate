"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { convertToCSV } from "../../../../lib/utils";
export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("orderId");
  const [sortDirection, setSortDirection] = useState("asc");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleExport = () => {
    const csvContent = convertToCSV(sortedOrders);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/Order/getOrders"); // Make sure this path matches your route
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const response = await fetch(`/api/Order/updateOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/Order/cancelOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: "Canceled" } : order
        )
      );
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Manage your orders here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full bg-background pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleExport}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("orderId")}
                >
                  Order Number
                  {sortColumn === "orderId" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("customerName")}
                >
                  Customer
                  {sortColumn === "customerName" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Order Date
                  {sortColumn === "createdAt" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("total")}
                >
                  Total
                  {sortColumn === "total" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status
                  {sortColumn === "status" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOrders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="text-xs"
                      variant={
                        order.status === "Pending"
                          ? "secondary"
                          : order.status === "Shipped"
                          ? "success"
                          : order.status === "Delivered"
                          ? "primary"
                          : "danger"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleViewDetails(order)}
                    >
                      <FaEye className="h-4 w-4" />
                      <span className="sr-only">View Order</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline">
                          <MoveVerticalIcon className="h-4 w-4" />
                          <span className="sr-only">More Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(order.orderId, "Shipped")
                          }
                        >
                          Update Status to Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateStatus(order.orderId, "Delivered")
                          }
                        >
                          Update Status to Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCancelOrder(order.orderId)}
                        >
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {selectedOrder && (
        <OrderDetails order={selectedOrder} onClose={handleCloseDetails} />
      )}
    </Card>
  );
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 12v7.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V12m15 0L12 3.75m0 0L4.5 12m7.5-8.25V15"
      />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
      />
    </svg>
  );
}

function MoveVerticalIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 15l3.75 3.75m0 0l3.75-3.75M12 18.75V5.25m0 0L8.25 9m3.75-3.75L15.75 9"
      />
    </svg>
  );
}
