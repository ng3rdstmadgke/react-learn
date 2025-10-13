import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// NextAuth(): https://authjs.dev/reference/nextjs#default-13
export default NextAuth(authConfig).auth;

export const config = {
  // matcher: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcherにマッチするパスに対してミドルウェアが実行されます
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  runtime: 'nodejs',
}