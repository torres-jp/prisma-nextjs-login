'use client'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [error, setError] = useState(null)
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    console.log(res)

    if (res.error) {
      setError(res.error)
    } else {
      router.push('/dashboard')
    }
  })

  return (
    <div className='h-[calc(100vh-7rem)] flex items-center justify-center'>
      <form onSubmit={onSubmit} className='w-1/4'>
        {error && (
          <p className='bg-red-500 text-lg text-white p-3 rounded'>{error}</p>
        )}

        <h1 className='text-slate-200 font-bold text-4xl mb-4'>Login</h1>

        <label htmlFor='email' className='text-slate-500 block text-sm mb-2'>
          Email
        </label>
        <input
          type='email'
          placeholder='example@email.com'
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required',
            },
          })}
          className='p-3 rounded block mb-2 bg-slate-700 textslate w-full'
        />
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}

        <label htmlFor='password' className='text-slate-500 block text-sm mb-2'>
          Password
        </label>
        <input
          type='password'
          placeholder='********'
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required',
            },
          })}
          className='p-3 rounded block mb-2 bg-slate-700 textslate w-full'
        />
        {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )}

        <button className='w-full bg-blue-500 text-white rounded-lg p-3 mt-2 hover:bg-blue-400'>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
