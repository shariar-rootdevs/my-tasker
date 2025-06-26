'use client'
import { verifyUserLogin } from '@/app/actions'
import { loginSchema } from '@/app/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

type LoginFormData = z.infer<typeof loginSchema>
export default function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await verifyUserLogin(data)
      if (result.success) {
        toast.success('Login Successful')
        router.push('/tasker')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50'>
      <div className='w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl p-8'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email <span className='text-red-500 text-[14px]'>*</span>
            </label>
            <input
              type='email'
              {...register('email')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password <span className='text-red-500 text-[14px]'>*</span>
            </label>
            <input
              type='password'
              {...register('password')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {errors.password && (
              <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>
            )}
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
