
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
import { getMyOrders } from "@/lib/services/order.service";
import React from "react";

export default async function MyOrdersPage() {
  const res = await getMyOrders();
  const orders: IOrderResponse[] = res?.data || [];


  console.log("my orders:", orders);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Products</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Delivered</TableHead>

            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <TableRow key={order._id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.totalOrderPrice} EGP</TableCell>
                  <TableCell>
                    {order.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-2 mb-1 justify-center"
                      >
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span>{item.product.title}</span>
                        <span className="text-gray-500 text-xs">
                          x{item.count}
                        </span>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{order.totalOrderPrice} EGP</TableCell>
                  <TableCell>{order.paymentMethodType}</TableCell>
                  <TableCell>{order.isPaid ? "✅" : "❌"}</TableCell>
                  <TableCell>{order.isDelivered ? "✅" : "❌"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
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
