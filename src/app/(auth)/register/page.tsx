'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { authService } from '../../../services/auth.service';

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'At least 3 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number'),
  password: yup.string().required('Password is required').min(6, 'At least 6 characters'),
  rePassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      toast.success('Registration successful. Please login');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500 mt-2">Join us and start shopping</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Full Name" {...register('name')} error={errors.name?.message} placeholder="Yazzed" />
          <Input label="Email Address" type="email" {...register('email')} error={errors.email?.message} placeholder="yazzedjsnvn@dndv.com" />
          <Input label="Phone Number" {...register('phone')} error={errors.phone?.message} placeholder="01xxxxxxxxx" />
          <Input label="Password" type="password" {...register('password')} error={errors.password?.message} placeholder="••••••••" />
          <Input label="Confirm Password" type="password" {...register('rePassword')} error={errors.rePassword?.message} placeholder="••••••••" />

          <Button type="submit" className="w-full mt-6 py-3" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-black hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
