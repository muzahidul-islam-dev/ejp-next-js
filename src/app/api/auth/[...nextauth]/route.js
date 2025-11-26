import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    // callbacks: {
    //     async session({ session, token }) {
    //         if (session.user && token.picture) {
    //             session.user.image = token.picture.replace("=s96-c", "=s400-c")
    //         }
    //         return session
    //     },
    //     async jwt({ token, user, account, profile }) {
    //         if (profile?.picture) {
    //             token.picture = profile.picture
    //         }
    //         return token
    //     },
    // }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }