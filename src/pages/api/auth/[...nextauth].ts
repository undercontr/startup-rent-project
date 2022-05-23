import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import signIn from "../../../lib/auth/signIn"

const client = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "credentials",
      type: "credentials",
      name: "Kullanıcı adı ve şifre",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "E-posta", type: "text", placeholder: "jsmith" },
        password: {  label: "Şifre", type: "password" }
      },
      async authorize(creds, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signIn(creds.email, creds.password)
        
        if (user.success) {
          // Any object returned will be saved in `user` property of the JWT
          return user.user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    })
  ],
  session: {
    maxAge: 24 * 60 * 60,
    updateAge: 6 * 60 * 60,
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  }
})