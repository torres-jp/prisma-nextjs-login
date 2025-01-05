import { NextResponse } from 'next/server'
import db from '@/libs/prisma'
import bcrypt from 'bcrypt'

export async function POST(req) {
  const data = await req.json()

  const emailFound = await db.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (emailFound) {
    return NextResponse.json(
      { message: 'Email already exists' },
      { status: 400 }
    )
  }

  const userFound = await db.user.findUnique({
    where: {
      username: data.username,
    },
  })

  if (userFound) {
    return NextResponse.json(
      { message: 'Username already exists' },
      { status: 400 }
    )
  }

  const newUser = await db.user.create({
    data,
  })

  return NextResponse.json(newUser)
}
