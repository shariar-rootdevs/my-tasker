'use client'
import { registerUser } from '@/app/actions'
import { registrationSchema } from '@/app/schemas/registrationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Eye, EyeOff, Lock, Mail, MapPin, Phone, User, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: RegistrationFormData) => {
    const { confirmPassword, ...rest } = data
    console.log(confirmPassword)

    const result = await registerUser(rest)
    console.log(result)

    reset()
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl'></div>
        <div className='absolute top-3/4 left-1/2 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl'></div>
      </div>

      <div className='relative w-full max-w-2xl mx-auto'>
        <div className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16'></div>
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12'></div>

            <div className='relative z-10 text-center'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm'>
                <UserPlus className='w-8 h-8 text-white' />
              </div>
              <h2 className='text-3xl font-bold mb-2'>Create Account</h2>
              <p className='text-blue-100 text-sm'>
                Join us and start managing your tasks efficiently
              </p>
            </div>
          </div>

          <div className='p-8'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    First Name <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                      <User
                        className={`w-5 h-5 ${errors.firstName ? 'text-red-400' : 'text-gray-400'}`}
                      />
                    </div>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      placeholder='Enter your first name'
                      className={`
                        w-full pl-12 pr-4 py-3.5 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 placeholder-gray-500
                        ${
                          errors.firstName
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    />
                  </div>
                  {errors.firstName && (
                    <div className='flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-4 bg-red-500 rounded-full'></div>
                      {errors.firstName.message}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Last Name <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                      <User
                        className={`w-5 h-5 ${errors.lastName ? 'text-red-400' : 'text-gray-400'}`}
                      />
                    </div>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      placeholder='Enter your last name'
                      className={`
                        w-full pl-12 pr-4 py-3.5 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 placeholder-gray-500
                        ${
                          errors.lastName
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    />
                  </div>
                  {errors.lastName && (
                    <div className='flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-4 bg-red-500 rounded-full'></div>
                      {errors.lastName.message}
                    </div>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Email */}
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Email Address <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                      <Mail
                        className={`w-5 h-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`}
                      />
                    </div>
                    <input
                      type='email'
                      {...register('email', { required: 'Email is required' })}
                      placeholder='Enter your email'
                      className={`
                        w-full pl-12 pr-4 py-3.5 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 placeholder-gray-500
                        ${
                          errors.email
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    />
                  </div>
                  {errors.email && (
                    <div className='flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-4 bg-red-500 rounded-full'></div>
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Phone Number <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                      <Phone
                        className={`w-5 h-5 ${errors.phone ? 'text-red-400' : 'text-gray-400'}`}
                      />
                    </div>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      placeholder='Enter your phone number'
                      className={`
                        w-full pl-12 pr-4 py-3.5 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 placeholder-gray-500
                        ${
                          errors.phone
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    />
                  </div>
                  {errors.phone && (
                    <div className='flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-4 bg-red-500 rounded-full'></div>
                      {errors.phone.message}
                    </div>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Password <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                      <Lock
                        className={`w-5 h-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`}
                      />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { required: 'Password is required' })}
                      placeholder='Create a password'
                      className={`
                        w-full pl-12 pr-12 py-3.5 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 placeholder-gray-500
                        ${
                          errors.password
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
                    >
                      {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className='flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-4 bg-red-500 rounded-full'></div>
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Confirm Password <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                      <Lock
                        className={`w-5 h-5 ${
                          errors.confirmPassword ? 'text-red-400' : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword', { required: 'Confirm password is required' })}
                      placeholder='Confirm your password'
                      className={`
                        w-full pl-12 pr-12 py-3.5 
                        border-2 rounded-xl 
                        bg-gray-50/50 backdrop-blur-sm
                        focus:outline-none focus:ring-4 focus:bg-white
                        transition-all duration-200
                        text-gray-900 placeholder-gray-500
                        ${
                          errors.confirmPassword
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                        }
                      `}
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='w-5 h-5' />
                      ) : (
                        <Eye className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className='flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-200'>
                      <div className='w-1 h-4 bg-red-500 rounded-full'></div>
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-semibold text-gray-700'>
                  Address <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <div className='absolute top-4 left-0 pl-4 flex items-start pointer-events-none'>
                    <MapPin
                      className={`w-5 h-5 ${errors.address ? 'text-red-400' : 'text-gray-400'}`}
                    />
                  </div>
                  <textarea
                    {...register('address', { required: 'Address is required' })}
                    rows={3}
                    placeholder='Enter your full address'
                    className={`
                      w-full pl-12 pr-4 py-3.5 
                      border-2 rounded-xl 
                      bg-gray-50/50 backdrop-blur-sm
                      focus:outline-none focus:ring-4 focus:bg-white
                      transition-all duration-200
                      text-gray-900 placeholder-gray-500
                      resize-none
                      ${
                        errors.address
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300'
                      }
                    `}
                  />
                </div>
                {errors.address && (
                  <div className='flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-200'>
                    <div className='w-1 h-4 bg-red-500 rounded-full'></div>
                    {errors.address.message}
                  </div>
                )}
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className={`
                  w-full py-4 px-6 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-blue-600 to-purple-600
                  hover:from-blue-700 hover:to-purple-700
                  focus:outline-none focus:ring-4 focus:ring-blue-500/20
                  transform transition-all duration-200
                  hover:scale-[1.02] hover:shadow-xl
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  flex items-center justify-center gap-2
                  relative overflow-hidden
                  ${isSubmitting ? 'animate-pulse' : ''}
                `}
              >
                <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>

                <span className='relative z-10'>
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </span>
                {!isSubmitting && <ArrowRight className='w-5 h-5 relative z-10' />}
              </button>
            </form>

            <div className='mt-8 pt-6 border-t border-gray-200'>
              <div className='text-center'>
                <p className='text-sm text-gray-600'>
                  Already have an account?{' '}
                  <Link
                    href='/login'
                    className='text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors'
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20 rotate-12'></div>
        <div className='absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl opacity-30 -rotate-12'></div>
      </div>
    </div>
  )
}
