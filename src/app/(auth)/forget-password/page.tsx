
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { forgotPassword } from '@/lib/services/forgotpassword.services';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSendCode = async () => {
    if (!email) return toast.error('Enter your email');
    const res = await forgotPassword(email);
    if (res.ok) {
      toast.success('Check your email for the reset code');
      router.push(`/verify-code/${encodeURIComponent(email)}`);
    } else {
      toast.error(res.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-lg mx-auto py-20">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <Input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={handleSendCode} className="mt-4">Send Code</Button>
    </div>
  );
}
