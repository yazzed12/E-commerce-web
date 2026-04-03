'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { ShieldCheck, Mail, Key, Lock, ArrowLeft, ArrowRight, Loader } from 'lucide-react';
import Link from 'next/link';
import api from '../../../services/api';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

const emailSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required')
});

const codeSchema = yup.object({
  resetCode: yup.string().required('Reset code is required')
});

const passwordSchema = yup.object({
  email: yup.string().required(),
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required')
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [storedEmail, setStoredEmail] = useState('');

  // Step 1: Send Email
  const { register: regEmail, handleSubmit: handleEmailSubmit, formState: { errors: emailErrors } } = useForm({
    resolver: yupResolver(emailSchema)
  });

  // Step 2: Verify Code
  const { register: regCode, handleSubmit: handleCodeSubmit, formState: { errors: codeErrors } } = useForm({
    resolver: yupResolver(codeSchema)
  });

  // Step 3: New Password
  const { register: regPass, handleSubmit: handlePassSubmit, formState: { errors: passErrors } } = useForm({
    resolver: yupResolver(passwordSchema)
  });

  const onEmailSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      await api.post('/auth/forgotPasswords', data);
      toast.success('Reset code sent to your email');
      setStoredEmail(data.email);
      setStep(2);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send reset code');
    } finally {
      setIsLoading(false);
    }
  };

  const onCodeSubmit = async (data: { resetCode: string }) => {
    setIsLoading(true);
    try {
      await api.post('/auth/verifyResetCode', data);
      toast.success('Code verified successfully');
      setStep(3);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid or expired reset code');
    } finally {
      setIsLoading(false);
    }
  };

  const onPassSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await api.put('/auth/resetPassword', { email: storedEmail, newPassword: data.newPassword });
      toast.success('Password reset successfully! Please login.');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 md:py-24">
      <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-2xl border border-gray-50 relative overflow-hidden">
        {/* Step Indicator */}
        <div className="flex gap-2 mb-12">
           {[1, 2, 3].map(s => (
             <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-black' : 'bg-gray-100'}`}></div>
           ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white mb-8">
              <Mail className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black mb-4 uppercase italic">Forget <span className="text-gray-300">Password?</span></h1>
            <p className="text-gray-400 mb-10 font-bold leading-snug">No worries! Just enter your email and we'll send you a recovery code.</p>
            
            <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-6">
              <Input 
                label="Email Address" 
                placeholder="yazzedjsnvn@dndv.com" 
                {...regEmail('email')} 
                error={emailErrors.email?.message} 
              />
              <Button type="submit" className="w-full py-5 rounded-[20px] font-black italic shadow-xl" isLoading={isLoading}>
                Send Code <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-100">
              <Key className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-black mb-4 uppercase italic">Check <span className="text-gray-300">Inbox</span></h1>
            <p className="text-gray-400 mb-10 font-bold leading-snug">We've sent a 6-digit code to <span className="text-black">{storedEmail}</span></p>
            
            <form onSubmit={handleCodeSubmit(onCodeSubmit)} className="space-y-6">
              <Input 
                label="Verification Code" 
                placeholder="Enter Code" 
                className="text-center tracking-[1em] font-black text-2xl"
                {...regCode('resetCode')} 
                error={codeErrors.resetCode?.message} 
              />
              <Button type="submit" className="w-full py-5 rounded-[20px] font-black italic shadow-xl" isLoading={isLoading}>
                Verify Code <ShieldCheck className="w-5 h-5 ml-2" />
              </Button>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                disabled={isLoading}
              >
                Wrong Email? Go Back
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-8 border border-green-100">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black mb-4 uppercase italic">New <span className="text-gray-300">Start</span></h1>
            <p className="text-gray-400 mb-10 font-bold leading-snug">Verification success! Now set your new premium password.</p>
            
            <form onSubmit={handlePassSubmit(onPassSubmit)} className="space-y-6">
              <input type="hidden" {...regPass('email')} value={storedEmail} />
              <Input 
                label="New Password" 
                type="password"
                placeholder="••••••••" 
                {...regPass('newPassword')} 
                error={passErrors.newPassword?.message} 
              />
              <Button type="submit" className="w-full py-5 rounded-[20px] font-black italic shadow-xl" isLoading={isLoading}>
                Reset Password <Loader className={`w-5 h-5 ml-2 ${isLoading ? 'animate-spin' : 'hidden'}`} />
              </Button>
            </form>
          </div>
        )}

        <div className="mt-12 text-center">
           <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
           </Link>
        </div>
      </div>
    </div>
  );
}
