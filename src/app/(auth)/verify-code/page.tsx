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
import { useRouter, useSearchParams } from "next/navigation";
import { verifyResetCode } from "@/lib/services/verifypassword.services";


const VerifyCodeSchema = z.object({
  resetCode: z.string().min(6, "Code must be 6 digits"),
});

type VerifyCodePayload = z.infer<typeof VerifyCodeSchema>;

export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<VerifyCodePayload>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function onSubmit(values: VerifyCodePayload) {
    const res = await verifyResetCode(values.resetCode);
    console.log("verify code response", res);

    if (res.ok && (res.status === "Success" || res.statusMsg === "success")) {
      toast.success("Code verified successfully!", {
        position: "top-center",
      });

      router.push(`/reset-password?email=${email}`);
    } else {
      toast.error(res.message || "Invalid code", {
        position: "top-center",
      });
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-lg mx-auto">
        <h1 className="font-bold text-2xl mb-8">Verify Reset Code</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Reset Code</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
