import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { createGuest, getGuest } from "./data-service";


const authConfig = {
    providers: [
        Google({
            clientId: process.env.NEXTAUTH_GOOGLE_ID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET
        }),
        Github({
            clientId: process.env.NEXTAUTH_GITHUB_ID,
            clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
        })
    ],
    callbacks: {
        authorized({ auth, request }) {
            if (auth?.user) {
                return true
            }
            return false
        },
        async signIn({ user }) {
            try {

                const existingUser = await getGuest(user.email)
                if (!existingUser.data.success) {
                    await createGuest({ email: user.email, fullName: user.name })
                    return true
                }
                return true
            } catch (error) {
                return false
            }

        },
        async session({ session, user }) {
            const guest = await getGuest(session.user.email)

            session.user.guestId = guest.data.user._id;
            return session
        }
    },
    pages: {
        signIn: '/login'
    }
}
export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig)