'use client'
import { useForm } from 'react-hook-form'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='h-[calc(100vh-7rem)] flex items-center justify-center'>
      <form onSubmit={onSubmit} className='w-1/4'>
        <h1 className='text-slate-200 font-bold text-4xl mb-4'>Register</h1>

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
