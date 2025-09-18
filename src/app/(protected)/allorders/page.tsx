

"use server";

import { IOrderResponse } from "@/app/interfaces/order.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders } from "@/lib/services/order.service";
import React from "react";

export default async function AllOrdersPage() {
  const { data } = await getAllOrders();
  const orders = data?.data || []; 


  console.log("orders:", orders);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">All Orders</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order: IOrderResponse, index: number) => (
                <TableRow key={order._id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.paymentMethodType}</TableCell>
                  <TableCell>{order.totalOrderPrice} EGP</TableCell>
                  <TableCell>
                    {order.isPaid ? "Paid" : "Unpaid"} /{" "}
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </TableCell>
                  <TableCell>
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.details}`
                      : "-"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
