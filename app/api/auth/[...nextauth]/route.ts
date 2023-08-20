import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import LineProvider from "next-auth/providers/line";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/app/lib/mongodb";

export const authOptions: any = {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: async (session: any) => {
            return Promise.resolve(session);
        }
    },
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        LineProvider({
            clientId: process.env.LINE_CLIENT_ID!,
            clientSecret: process.env.LINE_CLIENT_SECRET!
        }),
    ],
    pages: {
        signIn: `/en/signin`,
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }