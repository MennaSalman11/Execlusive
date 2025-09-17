"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { changePassword } from "@/lib/services/changepassword.services";
import { getUserToken } from "@/lib/server-utils";
import { useRouter } from "next/navigation";
import { ChangePasswordPayload, ChangePasswordSchema } from "@/schema/changepassword.schema";




export default function ChangePasswordForm() {
  const router = useRouter();
  const form = useForm<ChangePasswordPayload>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",

    },
  });


  async function onSubmit(values: ChangePasswordPayload) {
    try {
      const data = await changePassword(
        values.currentPassword,
        values.password,
        values.rePassword
      );

      console.log("change password response:", data);

      if (data.ok && (data.status === 200 || data.statusMsg === "success")) {
        toast.success("Password updated successfully!", {
          position: "top-center",
        });

        form.reset();


        router.push("/login");
      } else {
        toast.error(data.message || "Failed to change password", {
          position: "top-center",
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", {
        position: "top-center",
      });
    }
  }

  return (
    <section className="mt-10">
      <h2 className="font-semibold text-xl mb-4 text-center pb-6">Change Password</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-md  shadow-2xl p-9"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter current password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Update Password
          </Button>
        </form>
      </Form>
    </section>
  );
}
