import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import LineProvider from "next-auth/providers/line";
import connectDB from "../../../lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
const handler = NextAuth({
    adapter: MongoDBAdapter(connectDB),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        }),

        LineProvider({
            clientId: process.env.LINE_CLIENT_ID,
            clientSecret: process.env.LINE_CLIENT_SECRET
        }),
    ],
})

export { handler as GET, handler as POST }