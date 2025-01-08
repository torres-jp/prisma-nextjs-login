import NextAuth from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'
import db from '@/libs/prisma'
import bcrypt from 'bcrypt'

const authOptions = {
  providers: [
    CredentialsProviders({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '*******',
        },
      },
      async authorize(credentials, req) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!userFound) throw new Error('User not found')

        const matchPass = await bcrypt.compare(
          credentials.password,
          userFound.password
        )

        if (!matchPass) throw new Error('Wrong password')

        return {
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
