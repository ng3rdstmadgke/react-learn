import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: false})

// 指定されたメールアドレスに合致するユーザーをデータベースから取得するヘルパー関数
async function getUser(email: string): Promise<User | undefined> {
  try {
    const users = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`;
    return users[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // 認証ロジックの実装は authorize メソッド内で行う
      // 引数のcredentialsはユーザーがサインインフォームに入力した値
      async authorize(credentials) {
        // zodを使ってユーザーの入力値のバリデーション
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (!parsedCredentials.success) {
          return null;
        }

        // emailとマッチするユーザーが存在するか確認
        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) {
          return null
        }

        // パスワードが一致するか確認
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) {
          console.log("Invalid credentials");
          return null
        }

        // 認証に成功した場合、ユーザーオブジェクトを返す
        return user;
      }

    })
  ],
})