import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import LineProvider from "next-auth/providers/line";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/app/lib/mongodb";
export const authOptions = {
    callbacks: {
        session: async (session, token, user) => {
            return Promise.resolve(session);
        }
    },
    adapter: MongoDBAdapter(clientPromise),
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
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }