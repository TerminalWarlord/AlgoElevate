import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@repo/db/client";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
        username: { label: "Username", type: "text", placeholder: "johndoe" },
        name: { label: "Name", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log(req.body);
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        // const user = await prisma.user.findFirst({
        //   where: {
            
        //     email: req.
        //   },
          
        // })

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: '/login'
  // }

})

export { handler as GET, handler as POST }