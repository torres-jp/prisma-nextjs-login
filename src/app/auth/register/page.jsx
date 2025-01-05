'use client'
import { useForm } from 'react-hook-form'

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert('Passwords do not match')
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    })

    const resJson = await res.json()
    console.log(resJson)
  })

  return (
    <div className='h-[calc(100vh-7rem)] flex items-center justify-center'>
      <form onSubmit={onSubmit} className='w-1/4'>
        <h1 className='text-slate-200 font-bold text-4xl mb-4'>Register</h1>

        <label htmlFor='username' className='text-slate-500 block text-sm mb-2'>
          Username
        </label>
        <input
          autoFocus
          type='text'
          placeholder='JohnDoe'
          {...register('username', {
            required: {
              value: true,
              message: 'Username is required',
            },
          })}
          className='p-3 rounded block mb-2 bg-slate-700 textslate w-full'
        />
        {errors.username && (
          <span className='text-red-500'>{errors.username.message}</span>
        )}

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

        <label
          htmlFor='confirmPassword'
          className='text-slate-500 block text-sm mb-2'
        >
          confirmPassword
        </label>
        <input
          type='password'
          placeholder='********'
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Confirm Password is required',
            },
          })}
          className='p-3 rounded block mb-2 bg-slate-700 textslate w-full'
        />
        {errors.confirmPassword && (
          <span className='text-red-500'>{errors.confirmPassword.message}</span>
        )}

        <button className='w-full bg-blue-500 text-white rounded-lg p-3 mt-2 hover:bg-blue-400'>
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
