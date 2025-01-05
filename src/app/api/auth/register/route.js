import { NextResponse } from 'next/server'
import db from '@/libs/prisma'
import bcrypt from 'bcrypt'

export async function POST(req) {
  try {
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

    const passwordHash = await bcrypt.hash(data.password, 10)

    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: passwordHash,
      },
    })

    const { password: _, ...user } = newUser

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
