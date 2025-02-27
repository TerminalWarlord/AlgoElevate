import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
      email: string
      name: string
      image: string | null
      username: string
    }
  }
}