
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { AddressResponseType, ProfileFormSchema, ProfileFormType } from "@/schema/profile.schema";
import { deleteAddress, getAddress, saveUserAddress } from "@/lib/services/address.services";
import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import ChangePasswordForm from "@/components/changePassword/ChangePassword";

export default function ProfilePage() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: { details: "", city: "", phone: "" },
  });

  const [addresses, setAddresses] = useState<AddressResponseType[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchAddress() {
    setLoading(true);
    const res = await getAddress();
    console.log("Fetched addresses:", res);

    if (res.success) {
      if (Array.isArray((res as any)?.data?.data)) {
        setAddresses((res as any)?.data?.data);
      } else {
        setAddresses([]);
      }
    } else {
      toast.error(res.error || "Failed to fetch addresses", { position: "top-center" });
      setAddresses([]);
    }
    setLoading(false);
  }




  const handleDelete = async (addressId: string) => {
    const res = await deleteAddress(addressId);

    if (res?.success) {
      toast.success("Address deleted successfully", { position: "top-center" });
      fetchAddress();
    } else {
      toast.error("Failed to delete address", { position: "top-center" });
    }
  };

  useEffect(() => { fetchAddress(); }, []);
  async function onSubmit(data: ProfileFormType) {
    startTransition(async () => {
      const res = await saveUserAddress(data);
      if (res.success) {
        toast.success("Address added successfully", { position: "top-center" });
        form.reset();
        fetchAddress();
      } else {
        toast.error(res.error || "Failed to add address", { position: "top-center" });
      }
    })
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-6">

        <div className="col-span-1 p-4 rounded shadow-md shadow-gray-200">
          <ul>
            <li className="font-sm m-7">My Orders:</li>
            <li><Link href='/myorders' className="font-bold m-7">My Orders</Link></li>
          </ul>
        </div>

        {/* Form */}
        <div className="col-span-2 shadow-md shadow-gray-200 p-4 rounded">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-md mx-auto p-6 border rounded-lg shadow"
            >
              <FormField control={form.control} name="details" render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl><Input placeholder="Enter your address details" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl><Input placeholder="Enter your city" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input placeholder="Enter your phone number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" disabled={isPending} className="w-full">

                {isPending ? <LoaderCircle className='animate-spin' /> : ' save'}
              </Button>
            </form>
          </Form>

          {/* Addresses Cards */}
          <div className="mt-6 space-y-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              addresses.map((addr, idx) => (
                <div
                  key={addr._id}
                  className="container mx-auto bg-gray-100 border rounded-lg p-4 shadow flex justify-between items-center w-full"
                >
                  <div>
                    <p><strong>Details:</strong> {addr.details}</p>
                    <p><strong>City:</strong> {addr.city}</p>
                    <p><strong>Phone:</strong> {addr.phone}</p>
                  </div>
                  <Button variant={'destructive'} className="cursor-pointer"
                    onClick={() => { handleDelete(addr._id) }}>
                    Delete</Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <section className="my-20 flex justify-center items-center">
        <div className="w-full p-6 max-w-md">
          <ChangePasswordForm />
        </div>


      </section>
    </>
  );
}

