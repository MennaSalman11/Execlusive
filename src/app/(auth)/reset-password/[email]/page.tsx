
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/lib/services/resetpassword.services';

interface Props { params: { email: string } }

const ResetSchema = z.object({
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

type FormValues = z.infer<typeof ResetSchema>;

export default function ResetPasswordPage({ params }: Props) {
  const router = useRouter();
  const email = decodeURIComponent(params.email);

  const form = useForm<FormValues>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { newPassword: '', confirmPassword: '' }
  });

  const onSubmit = async (values: FormValues) => {
    const res = await resetPassword(email, values.newPassword);
    if (res.ok) {
      toast.success('Password reset successfully!');
      router.push('/login');
    } else {
      toast.error(res.message || 'Failed to reset password');
    }
  };

  return (
    <div className="max-w-lg mx-auto py-20">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Input type="password" placeholder="New Password" {...form.register('newPassword')} />
        <Input type="password" placeholder="Confirm Password" {...form.register('confirmPassword')} />
        <Button type="submit">Reset</Button>
      </form>
    </div>
  );
}
