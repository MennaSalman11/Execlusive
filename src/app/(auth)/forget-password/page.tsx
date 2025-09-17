"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/lib/services/forgotpassword.services";

const ForgotPasswordSchema = z.object({
  email: z.email("Invalid email"),
});

type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: { email: string }) {
    const data = await forgotPassword(values.email);
    console.log("forgot password response:", data);

    if (data.ok && data.statusMsg === "success") {
      toast.success("Check your email for reset code", {
        position: "top-center",
      });
      router.push(`/verify-code?email=${values.email}`);
    } else {
      toast.error(data.message || "Something went wrong", {
        position: "top-center",
      });
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-lg mx-auto">
        <h1 className="font-bold text-2xl mb-8">Forgot Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Send Code</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
