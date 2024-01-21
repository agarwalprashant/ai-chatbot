import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [GitHub],
  callbacks: {
    // jwt: JWT token ko customize karta hai. Agar profile object available hai, to user ki id aur image ko token mein add karta hai.
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id
        token.image = profile.avatar_url || profile.picture
      }
      return token
    },
    // session: Session object ko customize karta hai. Yadi token mein user id hai, to session ke user object mein ye id set ki jati hai.
    session: ({ session, token }) => {
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }
      return session
    },
    // authorized: Har request ke liye check karta hai ki user logged in hai ki nahi.
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  // Ye default sign-in page ko override karke custom sign-in page ka path set karta hai.
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})
