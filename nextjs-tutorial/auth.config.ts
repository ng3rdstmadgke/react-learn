import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  // pages: https://authjs.dev/reference/nextjs#pages
  // pagesオプションではカスタムのサインイン、サインアウト、エラーページへのルートを指定できます (指定がない場合はNextAuth.jsのデフォルトページとなる)
  pages: {
    signIn: '/login',
  },
  // callbacks: https://authjs.dev/reference/nextjs#callbacks
  // コールバックは、認証関連のアクションが実行された際の動作を制御するために使用できる非同期関数です。コールバックを使用することで、データベースなしでアクセス制御を実装したり、外部データベースやAPIと連携したりすることが可能です。
  callbacks: {
    // authorized: https://authjs.dev/reference/nextjs#authorized
    // authorizedコールバックは、リクエストがページへのアクセスを許可されているかを確認するためのNext.jsミドルウェアとして機能します
    // ユーザーが認証を必要とする際に呼び出され、ミドルウェアを使用します。
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        // ダッシュボードページにアクセスする場合、ログインしているかどうかを確認します
        return isLoggedIn;
      } else if (isLoggedIn) {
        // ログインしている場合、ダッシュボードにリダイレクトします
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      return true;
    }
  },
  // providers: https://authjs.dev/reference/nextjs#providers
  // サインイン用の認証プロバイダー一覧 (Google、Facebook、Twitter、GitHub、メールなど)を指定します(順不同)。  
  providers: [],
} satisfies NextAuthConfig;