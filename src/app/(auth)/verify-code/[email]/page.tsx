
'use client';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { verifyResetCode } from '@/lib/services/verifypassword.services';

interface Props { params: { email: string } }
interface FormValues { resetCode: string }

export default function VerifyCodePage({ params }: Props) {
  const router = useRouter();
  const email = decodeURIComponent(params.email);

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    const res = await verifyResetCode(values.resetCode);
    if (res.ok) {
      toast.success('Code verified!');
      router.push(`/reset-password/${encodeURIComponent(email)}`);
    } else {
      toast.error(res.message || 'Invalid code');
    }
  };

  return (
    <div className="max-w-lg mx-auto py-20">
      <h1 className="text-2xl font-bold mb-4">Verify Reset Code</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Enter code" {...register('resetCode')} />
        <Button type="submit">Verify</Button>
      </form>
    </div>
  );
}
