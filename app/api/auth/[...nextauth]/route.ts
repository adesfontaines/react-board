import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LineProvider from "next-auth/providers/line";
import TwitterProvider from "next-auth/providers/twitter";
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
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
            version: "2.0",
        }),
        LineProvider({
            clientId: process.env.LINE_CLIENT_ID!,
            clientSecret: process.env.LINE_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.GH_CLIENT_ID!,
            clientSecret: process.env.GH_CLIENT_SECRET!
        }),
    ],
    pages: {
        signIn: `/en/signin`,
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }