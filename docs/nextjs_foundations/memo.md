# 1. Getting Started

- https://nextjs.org/learn/dashboard-app/getting-started

```bash
npm install -g pnpm
```

```bash
# create-next-app@latest next.jsのプロジェクト作成用CLI
# nextjs-dashboard プロジェクトのディレクトリ名
# --example サンプルプロジェクトをテンプレートにする指定
# --use-pnpm パッケージマネージャーとしてpnpmを使う指定
npx create-next-app@latest nextjs-dashboard \
  --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" \
  --use-pnpm

cd nextjs-dashboard
```

ディレクトリ構成

- `app/`  
アプリケーションのすべてのルート、コンポーネント、ロジックが含まれており、殆どの作業はここで行う
    - `lib/`  
    再利用可能なユーティリティ関数やデータ取得関数など。
    - `ui/`  
    カード、テーブル、フォームなど、アプリケーションのUIコンポーネント。
- `/public`  
  画像など、静的アセット
- `next.confit.tf`  
  設定ファイル


```
├── app
│   ├── layout.tsx
│   ├── lib
│   │   ├── data.ts
│   │   ├── definitions.ts  // データベースから返される型の定義
│   │   ├── placeholder-data.ts  // プレースホルダデータ
│   │   └── utils.ts
│   ├── page.tsx
│   ├── query
│   │   └── route.ts
│   ├── seed
│   │   └── route.ts
│   └── ui
│       ├── acme-logo.tsx
│       ├── button.tsx
│       ├── customers
│       │   └── table.tsx
│       ├── dashboard
│       │   ├── cards.tsx
│       │   ├── latest-invoices.tsx
│       │   ├── nav-links.tsx
│       │   ├── revenue-chart.tsx
│       │   └── sidenav.tsx
│       ├── global.css
│       ├── invoices
│       │   ├── breadcrumbs.tsx
│       │   ├── buttons.tsx
│       │   ├── create-form.tsx
│       │   ├── edit-form.tsx
│       │   ├── pagination.tsx
│       │   ├── status.tsx
│       │   └── table.tsx
│       ├── login-form.tsx
│       ├── search.tsx
│       └── skeletons.tsx
├── next.config.ts
├── next-env.d.ts
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── customers
│   │   ├── amy-burns.png
│   │   ├── balazs-orban.png
│   │   ├── delba-de-oliveira.png
│   │   ├── evil-rabbit.png
│   │   ├── lee-robinson.png
│   │   └── michael-novotny.png
│   ├── favicon.ico
│   ├── hero-desktop.png
│   ├── hero-mobile.png
│   └── opengraph-image.png
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

サーバーの起動

```bash
pnpm i
pnpm dev
```

## ファイルシステム規約

https://nextjs.org/docs/app/api-reference/file-conventions

| ファイル名／ディレクトリ                                       | 用途 / 意味                                                                                                  |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `page.js`                                          | そのフォルダが対応する **ページコンポーネント**（URL にマッピングされる）を定義。ルート URL （例： `/about`）なら `app/about/page.js`。 |
| `layout.js`                                        | 子ルートを包む **レイアウト** コンポーネント。共通の UI（ヘッダー、サイドバーなど）を定義。ネストも可能。 |
| `loading.js`                                       | ページ読み込み中に出すローディング UI を定義。遷移中などに表示される。 |
| `error.js`                                         | そのセグメント配下で発生した例外をキャッチして表示するエラーページ。 |
| `not-found.js`                                     | そのセグメント（パス）にマッチするリソースがない場合の “404 相当” を表示。 |
| `route.js`                                         | API ルートハンドラー（HTTP リクエストを処理するエンドポイントとして使える）を定義。 |
| `template.js`                                      | レイアウトとは異なるテンプレート構造で、レイアウトとページを分けて定義したい場合に使うファイル。 |
| `default.js`                                       | レイアウトやページで特定ファイルがない場合にデフォルト振る舞いを定義できる。 |
| `forbidden.js` / `unauthorized.js`                 | アクセス権限がないときのレスポンス用ページを定義できる。 |
| `instrumentation.js` / `instrumentation-client.js` | アプリのパフォーマンス／モニタリングに関する処理を追加したいとき用。 |
| `public/`                                          | 静的ファイル（画像、favicon、robots.txt など）を置く場所。これらは URL でそのまま参照される（例： /favicon.ico）。 |
| `[hoge]`                                           | 角括弧 `[...]` を使って動的セグメントを定義できる（`[id]/page.js` -> `/123` にマッチ）。`[...slug]` のような形で多階層を一括キャッチ可能。 |



# 2. CSSスタイル

- https://nextjs.org/learn/dashboard-app/css-styling



`/app/ui/global.css` でアプリケーション内のすべてのルートにCSSルールを適用します。

`/app/layout.tsx` ファイルで `/app/ui/global.css` をインポートすることでアプリケーションにグローバルスタイルを追加できます。


`/app/layout.tsx`

```tsx
import '@/app/ui/global.css'; // 追加
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

> NOTE: import の `@` はプロジェクトのルートを指します。  
> この設定は `tsconfig.json` に記述されています。
>
> ```js
> {
>   "compilerOptions": {
>     "baseUrl": ".",  // モジュール解決の基準ディレクトリを指定
>     "paths": {
>       // keyがインポート側の書き方、valueが実際のファイルパス
>       "@/*": ["./*"]  // @/xxx と書いたら ./xxx を見に行け
>     }
>   }
> }
> ```


`/app/ui/global.css` にはほとんど記述がないにも関わらず、結構リッチなスタイルがつくのは、以下の定義のおかげです。


`/app/ui/global.css` 
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Tailwindcss

[Tailwindユーティリティクラス](https://tailwindcss.com/docs/styling-with-utility-classes)

Tailwindcssを使うと、以下のようにクラス名ベースでスタイルをつけられます。

```tsx
<h1 className="text-blue-500">I'm blue!</h1>
```

`/app/page.tsx` を確認すると要素の `className` にtailwindのクラスが使用されていることがわかります。


## CSSモジュール

- [CSS Modules | NEXT.js](https://nextjs.org/docs/13/app/building-your-application/styling/css-modules)


CSSモジュールを使用すると一意のクラス名を自動生成してCSSをコンポーネントにスコープできるため、衝突の心配がありません。

`/app/ui/home.module.css`

```css
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```



`/app/page.tsx`

```tsx
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';  // CSSモジュールのインポート
 
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={styles.shape} />  {/* CSSモジュールで定義したshapeクラスを使用 */}
    // ...
  )
}
```

## `clsx` ライブラリでクラス名を切り替える

- [clsx | GitHub](https://github.com/lukeed/clsx)


要素の状態やその他の条件に基づいて、スタイルを適用したり除外したりする場合に利用します。


`clsx` はクラス名を簡単に切り替えられるライブラリです。

```tsx
function sample({ status }: {status: boolean}) {
  return (
    <div className={clsx(
      'px-2 py-1',  // 共通クラス

      { // 条件付きクラス「クラス名:条件」の形式になっており、条件がtrueのクラスが適用される
        'block': status === true,
        'hidden': status === false,
      }
      )} />
  )

}
```


# 3. フォントと画像の最適化

- https://nextjs.org/learn/dashboard-app/optimizing-fonts-images


## フォントの最適化

ブラウザが最初にシステムフォントでテキストレンダリングし、その後カスタムフォントに置き換えることでレイアウトシフトが発生しますが、 Next.jsではビルド時にフォントファイルをダウンロードし静的アセットとともにホストすることでパフォーマンスに影響を与えるようなフォントの追加ネットワークリクエストは発生しません。


### プライマリフォントの追加

カスタムGoogleフォントをアプリケーションに追加してみます。

アプリケーション全体で使用するフォントを定義する `/app/ui/fonts.ts` を作成します。


`next/font/google` モジュールから `Inter` フォントをインポートします。
サブセット には 'latin' を指定します。

`/app/ui/fonts.ts`
```ts
// next/font/google は Google Fonts を直接使うための Next.js 組み込みモジュール。
// Inter は Google Fonts に登録されている、UI 向けに設計されたモダンなサンセリフ体（ゴシック体）フォント
import { Inter } from 'next/font/google';
// どの文字セット(subsets)を使うかを指定
// latin（英語・西欧言語）
// latin-ext（中央ヨーロッパ言語）
// japanese（Noto Sans JP など）
export const inter = Inter({ subsets: ['latin'] });
```

`/app/layout.tsx`
```tsx
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts'; // 追加

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* antialiased Tailwindのフォントを滑らかにするクラス */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

### セカンダリフォントの追加


`/app/ui/fonts.ts`
```ts
// ... 略 ...
export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });
```


`/app/page.tsx`
```tsx
// ... 略 ...
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />  {/* コメントイン */}
      </div>
      {/* ... 略 ... */}
          {/* lusitanaフォントのクラス名を追加 */}
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
      {/* ... 略 ... */}
          </p>
      {/* ... 略 ... */}
    </main>
  );
}
```

# 画像の最適化

Next.jsは、画像などの静的アセットを `/public` から提供します。`/public` 内のファイルはアプリケーション内で参照可能です。


## `<Image>` コンポーネント

[Image Component | NEXT.js](https://nextjs.org/docs/app/api-reference/components/image)

`<Image>` コンポーネントはHTMLの `<img>` の拡張であり次のような最適化機能が備わっています。

- 画像読み込み時にレイアウトシフトが発生しないようにする
- viewportの小さいデバイスに大きな画像が送信されないように、画像サイズを変更する
- デフォルトで画像を遅延読込する (viewportに入ると読み込まれます)
- ブラウザが対応している場合、WebPやAVIFなどの最新形式で画像を提供する


`/app/page.tsx`
```tsx
// ...
import Image from 'next/image';  // 追加


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        {/* ... */}
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* デスクトップ用 */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          {/* モバイル用 */}
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
```
`width` `height` を設定しておくことで、レイアウト連れを防ぐことができます。これらの指定はソース画像と同じアスペクト比に合わせます。

モバイル画面では画像がDOMから削除されるように `hidden` クラスが、デスクトップ画面では画像が表示されるように `md:block` クラスが設定されています。

# 4. レイアウトとページの作成

- https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages

**レイアウト** と **ページ** を使ってより多くのルートを作成する方法を学びましょう

Next.jsはファイルシステムルーティングを採用しており、フォルダを用いてネストされたルートを作成します。

![img](./img/04_nested_routing.png)


各ルートごとに、`layout.tsx` と `page.tsx` ファイルを使用して個別の UI を作成できます。  
`page.tsx` は React コンポーネントをエクスポートする特別な Next.js ファイルであり、ルートにアクセス可能にするために必須です。

※ つまり `page.txt` が配置してあるディレクトリが公開可能なルートとなります


![img](./img/04_nested_routing_02.png)


## ダッシュボードページの作成

`/app/dashboard/page.tsx`
```tsx
export default function Page() {
  return <p>Dashboard Page</p>;
}
```

`/app/dashboard/customers/page.tsx`
```tsx
export default function Page() {
  return <p>Customers Page</p>;
}
```

`/app/dashboard/invoices/page.tsx`
```tsx
export default function Page() {
  return <p>Invoices Page</p>;
}
```

- http://localhost:3000/dashboard
    - http://localhost:3000/dashboard/customers
    - http://localhost:3000/dashboard/invoices

## ダッシュボードレイアウトの作成

ダッシュボードには、複数のページで共有されるナビゲーション機能があります。Next.jsでは、特別なlayout.tsxファイルを使って複数のページで共有されるUIを作成できます。

`/app/dashboard/layout.tsx`
```tsx
import SideNav from '@/app/ui/dashboard/sidenav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
```

このレイアウトはそれ以下のページ(`dashboard/customers/page.tsx` `dashboard/invoices/page.tsx`)に自動的に適用されます。

Next.jsでレイアウトを使用する利点の一つは、ナビゲーション時にページコンポーネントのみが更新され、レイアウトは再レンダリングされないことです。(部分レンダリング)

## ルートレイアウト

`/app/layout.tsx` は[ルートレイアウト](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layout)と呼ばれ、すべてのNext.jsアプリケーションに必須です。ルートレイアウトに追加したUIは、すべてのページで共有されます。

`/app/layout.tsx`
```tsx
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* antialiased Tailwindのフォントを滑らかにするクラス */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

# 5. ページ間の移動

## `<Link>` コンポーネント

- [Link and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating#how-navigation-works)


Next.js では、<Link />コンポーネントを使用してアプリケーション内のページ間をリンクできます。

`/app/ui/dashboard/nav-links.tsx`
```tsx
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link'; // 追加

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          {/* Linkコンポーネントでページ遷移する */}
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

```


### 自動コード分割とプリフェッチ

[React SPA](https://nextjs.org/docs/app/guides/single-page-applications) では初回アクセス時にアプリケーションのすべてのコードをブラウザがロードしていましたが、Next.jsは自動的にルートセグメントごとにアプリケーションコードを分割してロードします。

コード分割により、ブラウザが解析するコードが減るのでアプリケーションが高速化するとともに、特定のページでエラーが発生していてもアプリケーション全体が動作しなくなる事がなくなります。

本番環境では `<Link>` コンポーネントがブラウザの表示領域に表示されるたびに、Next.jsはバックグラウンドでリンク先ルートのコードを自動的に[プリフェッチ](https://nextjs.org/docs/app/getting-started/linking-and-navigating#prefetching)します。


## アクティブなリンクを表示する


現在どのページにいるかを示すために、自分が開いているページのナビゲーションリンクの色を変えます。

これを行うにはユーザーの現在のパスを取得する必要があります。これには `usePathname()` が利用できます。  
※ [usePathname](https://nextjs.org/docs/app/api-reference/functions/use-pathname) はReactフックなので、クライアントコンポーネントで呼び出す必要があります。




`/app/ui/dashboard/nav-links.tsx`
```tsx
'use client';
// ...
import { usePathname } from 'next/navigation';  // 追加

// ...

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const pathname = usePathname();  // 現在のパスを取得
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            // 現在のパスと同じ場合はカラーを変更
            className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}


```



# 6. データベースの設定

- https://nextjs.org/learn/dashboard-app/setting-up-your-database


## Postgresqlの起動

```bash
./bin/postgresql.sh -h
```

ログイン

```bash
PGPASSWORD=root1234 psql -U app -h sample-postgresql -d sample -p 5432
```

基本操作

```
# DB一覧
\l

# use database
\c <DB_NAME>

# テーブル一覧
\dt

# テーブル一覧(viewやsequenceも含む)
\d

# テーブルのスキーマ確認
\d <TABLE_NAME>

# テーブルのアクセス権限確認
\z <TABLE_NAME>

# ユーザー一覧を表示
\du
```


## 環境変数ファイルの作成

```bash
cp .env.example .env
```

`.env`
```bash
# Copy from .env.local on the Vercel dashboard
# https://nextjs.org/learn/dashboard-app/setting-up-your-database#create-a-postgres-database
POSTGRES_URL=postgresql://app:root1234@sample-postgresql:5432/sample
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=app
POSTGRES_HOST=sample-postgresql
POSTGRES_PASSWORD=root1234
POSTGRES_DATABASE=sample

# `openssl rand -base64 32`
AUTH_SECRET=
AUTH_URL=http://localhost:3000/api/auth
```

## DBのシーディング

シーディング用のルートを少し修正

`app/seed/route.ts`
```ts
// ...

// ローカルのDBに接続するので ssl=false に
// connection設定: https://github.com/porsager/postgres?tab=readme-ov-file#connection-details
//const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const sql = postgres(process.env.POSTGRES_URL!, {ssl: false});

async function seedUsers() {
  // 複数回実行するとエラーになるのでコメントアウト
  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // ...
  return insertedUsers;
}

async function seedInvoices() {
  // 複数回実行するとエラーになるのでコメントアウト
  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // ...
  return insertedInvoices;
}

async function seedCustomers() {
  // 複数回実行するとエラーになるのでコメントアウト
  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // ...
  return insertedCustomers;
}

async function seedRevenue() {
  // ...
}

export async function GET() {

  try {
    // CREATE EXTENSIONはここに一回だけ定義
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const result = await sql.begin((sql) => [
      seedUsers(),
      seedCustomers(),
      seedInvoices(),
      seedRevenue(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

```


シーディングURLにアクセス

- http://localhost:3000/seed


確認

```bash
PGPASSWORD=root1234 psql -U app -h sample-postgresql -d sample -p 5432
# psql (16.10 (Ubuntu 16.10-0ubuntu0.24.04.1))
# Type "help" for help.

sample=#\d
#         List of relations
# Schema |   Name    | Type  | Owner 
#--------+-----------+-------+-------
# public | customers | table | app
# public | invoices  | table | app
# public | revenue   | table | app
# public | users     | table | app
#(4 rows)

sample=# \d customers;
#                            Table "public.customers"
#  Column   |          Type          | Collation | Nullable |      Default       
#-----------+------------------------+-----------+----------+--------------------
# id        | uuid                   |           | not null | uuid_generate_v4()
# name      | character varying(255) |           | not null | 
# email     | character varying(255) |           | not null | 
# image_url | character varying(255) |           | not null | 
#Indexes:
#    "customers_pkey" PRIMARY KEY, btree (id)

sample=# \d invoices;
#                             Table "public.invoices"
#   Column    |          Type          | Collation | Nullable |      Default       
#-------------+------------------------+-----------+----------+--------------------
# id          | uuid                   |           | not null | uuid_generate_v4()
# customer_id | uuid                   |           | not null | 
# amount      | integer                |           | not null | 
# status      | character varying(255) |           | not null | 
# date        | date                   |           | not null | 
#Indexes:
#    "invoices_pkey" PRIMARY KEY, btree (id)

sample=# \d revenue;
#                     Table "public.revenue"
# Column  |         Type         | Collation | Nullable | Default 
#---------+----------------------+-----------+----------+---------
# month   | character varying(4) |           | not null | 
# revenue | integer              |           | not null | 
#Indexes:
#    "revenue_month_key" UNIQUE CONSTRAINT, btree (month)

sample=# \d users;
#                             Table "public.users"
#  Column  |          Type          | Collation | Nullable |      Default       
#----------+------------------------+-----------+----------+--------------------
# id       | uuid                   |           | not null | uuid_generate_v4()
# name     | character varying(255) |           | not null | 
# email    | text                   |           | not null | 
# password | text                   |           | not null | 
#Indexes:
#    "users_pkey" PRIMARY KEY, btree (id)
#    "users_email_key" UNIQUE CONSTRAINT, btree (email)

sample=# SELECT invoices.amount, customers.name
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.amount = 666;
#  amount |    name     
# --------+-------------
#     666 | Evil Rabbit
#     666 | Evil Rabbit
# (2 rows)
```


# 7. データの取得

- https://nextjs.org/learn/dashboard-app/fetching-data

React サーバー コンポーネントを使用している場合は、API レイヤーをスキップして、データベース認証情報をクライアントに公開するリスクなしに、データベースを直接クエリできます。

## サーバーコンポーネントを使用してデータを取得する

Next.jsアプリケーションはデフォルトでReact Server Componentsを使用します。Server Componentsを使ったデータ取得は比較的新しいアプローチであり、いくつかの利点があります。

- サーバーコンポーネントはJavaScriptのPromiseをサポートしており、データ取得を非同期で実行できます。`useEffect` や `useState` といったデータ取得ライブラリなしに、async/await構文を使用できます。
- サーバーコンポーネントはサーバー上で実行されるため、負荷の高いデータ取得やロジックをサーバー側に保持し、結果のみをクライアントに送信できます。
- サーバーコンポーネントはサーバー上で実行されるため、追加のAPIレイヤーを介さずにデータベースを直接クエリできます。

## SQLの使用

SQLは以下に用意してあります。

- `/app/lib/data.ts` SQLを実行する関数群が定義されています
- `/app/lib/definitions.ts` SQLの実行結果のデータ型が定義されています

postgresはローカルに構築してあるので `ssl: false` に設定します。


`/app/lib/data.ts`
```ts
import postgres from 'postgres';
import { Revenue } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });

export async function fetchRevenue(): Promise<postgres.RowList<Revenue[]>> {
  try {
    const data = await sql<Revenue[]>`SELECT * FROM revenue`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

// ...
```


`/app/lib/definitions.ts`
```ts
export type Revenue = {
  month: string;
  revenue: number;
};
```

## ダッシュボードのデータ取得準備

データ取得用のページを作成します。

`/app/dashboard/page.tsx`
```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
 
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}
```

データを受信するコンポーネントが3つあります(`<Card>` `<RevenueChart>` `<LatestInvoices>` )。これらは現在コメントアウトされており、まだ実装されていません。

## `<RevenueChart>` のデータを取得

`<RevenueChart/>` コンポーネントのデータを取得するには、 `/app/lib/data.ts` の `fetchRevenue` 関数をインポートしてコンポーネント内で呼び出します。

`/app/dashboard/page.tsx`
```tsx
// ...
import { fetchRevenue } from '@/app/lib/data'; // fetchRevenueのインポート
 
export default async function Page() {  // fetchRevenueは非同期関数なので、呼び出し側のPageも非同期関数にする
  const revenue = await fetchRevenue();  // fetchRevenueの呼び出し
  return (
    <main>
      {/* ... */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} /> {/* RevenueChartをコメントイン */}
      </div>
    </main>
  );
}
```

次に `RevenueChart` コンポーネントのコメントアウトされている部分をコメントインします。

`/app/ui/dashboard/revenue-chart.tsx`

![img](img/07_revenue_chart.png)

## `<LatestInvoices />` のデータを取得

`<LatestInvoices />` は最新の請求書を5軒取得して表示するコンポーネントです。

SQLのクエリは次のようになっています。
`/app/lib/data.ts`
```ts
// Fetch the last 5 invoices, sorted by date
const data = await sql<LatestInvoiceRaw[]>`
  SELECT invoices.amount, customers.name, customers.image_url, customers.email
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
  ORDER BY invoices.date DESC
  LIMIT 5`;
```

`<LatestInvoices/>` コンポーネントのデータを取得するには、 `/app/lib/data.ts` の `fetchLatestInvoices` 関数をインポートしてコンポーネント内で呼び出します。

`/app/dashboard/page.tsx`
```tsx
// ...
import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data'; // fetchLatestInvoicesのインポート
 
export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();  // fetchLatestInvoicesの呼び出し
  return (
    <main>
      {/* ... */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />  {/* LatestInvoicesをコメントイン */}
      </div>
    </main>
  );
}
```

次に `LatestInvoices` コンポーネントのコメントアウトされている部分をコメントインします。

![img](img/07_latest_invoices.png)

## `<Card>` コンポーネントのデータを取得する

カードコンポーネントには以下のデータが表示されます。

- 回収した請求書の合計金額。
- 保留中の請求書の合計金額。
- 請求書の合計数。
- 顧客総数。

`<Card/>` コンポーネントのデータを取得するには、 `/app/lib/data.ts` の `fetchCardData` 関数をインポートしてコンポーネント内で呼び出します。
`fetchCardData` は4つの結果を返却します。



`/app/dashboard/page.tsx`
```tsx
// ...
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data'; // fetchCardData のインポート
 
export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers
  } = await fetchCardData();  // fetchCardData の呼び出し
  return (
    <main>
      {/* ... */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* ... */}
      </div>
    </main>
  );
}
```

![img](img/07_card.png)


## 注意すべき点

この構成はパフォーマンス上の2つの問題があります。

- データ要求が意図せず相互にブロックされ、要求ウォーターフォールが発生します。
- デフォルトでは、Next.jsはパフォーマンス向上のためにルートを事前レンダリングします。これは静的レンダリングと呼ばれます。そのため、データが変更されてもダッシュボードには反映されません。

## リクエストフォーターフォール

「ウォーターフォール」とは、前のリクエストの完了に依存する一連のネットワークリクエストを指します。データ取得の場合、各リクエストは前のリクエストがデータを返した後にのみ開始されます。

![img](img/07_request_warter_fall.png)


例えば、以下のコードだと、 `fetchLatestInvoices()` を実行するには `fetchRevenue()` の完了を待たなければなりません。

`/app/dashboard/page.tsx`
```tsx
const revenue = await fetchRevenue();
const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
const {
  numberOfInvoices,
  numberOfCustomers,
  totalPaidInvoices,
  totalPendingInvoices,
} = await fetchCardData(); // wait for fetchLatestInvoices() to finish
```

このパターンは必ずしも悪いわけではありません。次のリクエストを行う前に条件を満たしたい場合、ウォーターフォールが必要となる場合があります。例えば、まずユーザーのIDとプロフィール情報を取得したい場合です。IDを取得したら、次に友達リストの取得に進むことができます。この場合、各リクエストは前のリクエストで返されたデータに依存します。

ただし、この動作は意図しないものであり、パフォーマンスに影響を与える可能性もあります。


## 並列データ取得

ウォーターフォールを回避する一般的な方法は、すべてのデータ要求を同時に、つまり並行して開始することです。


JavaScriptでは、Promise.all()またはPromise.allSettled()関数を使って、すべてのPromiseを同時に開始します。  
例えば、 `/app/lib/data.ts` の `fetchCardData()` では関数内で `Promise.all()` を使用しています。

`/app/lib/data.ts` 
```ts
export async function fetchCardData() {
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;
 
    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);
    // ...
  }
}
```


このパターンを使用すると、次のことが可能になります。

- すべてのデータ取得を同時に実行し始めます。
- あらゆるライブラリやフレームワークに適用できるネイティブ JavaScript パターンを使用します。

しかし、このパターンには欠点が1つあります。時間のかかるデータ取得があると、すべてのデータ取得が遅くなってしまうということです。次の章で詳しく見ていきましょう。


# 8. 静的レンダリングと動的レンダリング

- https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering

## 静的レンダリング

静的レンダリングでは、データの取得とレンダリングはサーバー上でビルド時（デプロイ時）またはデータの再検証時に実行されます。  
ブログ投稿や製品ページなど、データがないUIやユーザー間で共有されるデータがある場合に有効です。

メリット

- **高速**  キャッシュが効くためレスポンスを高速にすることができる
- **負荷軽減** キャッシュが効くため、サーバーのコンピューティングリソースを削減できる
- **SEO** 事前レンダリングされたコンテンツは検索エンジンのクローラーによるインデックス作成が容易になる

## 動的レンダリング

動的レンダリングではコンテンツはリクエスト時にサーバー上でレンダリングされます。

メリット

- **リアルタイムデータ** 頻繁に更新されるデータをリアルタイムに確認することができる
- **ユーザー固有のコンテンツ** ダッシュボードやユーザープロファイルなどのパーソナライズされたコンテンツを提供することが容易
- **リクエスト時の情報** CookieやGETパラメータなど、リクエスト時にのみ知る事ができる情報にアクセスできる

## 時間のかかるデータ取得のシミュレーション

あるデータリクエストが他のすべてのリクエストよりも遅い場合をシミュレーションするために `data.ts` の `fetchRevenue()` を修正します。

`/app/lib/data.ts`
```ts
export async function fetchRevenue() {
  try {
    // We artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Fetching revenue data...');  // コメントイン
    await new Promise((resolve) => setTimeout(resolve, 3000));  // コメントイン
 
    const data = await sql<Revenue[]>`SELECT * FROM revenue`;
 
    console.log('Data fetch completed after 3 seconds.');  // コメントイン
 
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
```

http://localhost:3000/dashboard/ を開くと、`fetchRevenue()` が完了するまで、ページ全体がブロックされ、UIを表示できなくなります。

動的レンダリングでは、**アプリケーションの速度は、最も遅いデータ取得速度と同じになります。**

# 9. ストリーミング

前章で問題となったデータリクエストの遅延が発生した場合に、ユーザーエクスペリエンスを向上させる方法を見ていきましょう。

## ストリーミング

ストリーミングとは、ルートを小さな「チャンク」に分割し、準備が整い次第、サーバーからクライアントへ順次転送することができるデータを転送する技術です。

![img](img/09_streaming.png)

レスポンスの遅いリクエストを別のチャンクにすることで、遅いデータリクエストがページ全体をブロックするのを防げます。

![img](img/09_prevent_blocking.png)


ストリーミングはReactのコンポーネントモデルと相性が良く、各コンポーネントをチャンクと見なすことができます。

Next.jsでストリーミングを実装する方法は2つあります：

- **ページレベル** : loading.tsxファイルを使用（`<Suspense>` を自動生成）
- **コンポーネントレベル** : より細かい制御のための `<Suspense>` を使用


## ページレベルのストリーミング ( `loading.tsx` )

`loading.tsx` は React Suspense を基盤とした Next.js の特殊なファイルです。ページコンテンツの読み込み中に表示する代替用フォールバック UI を作成できます。

`/app/dashboard/loading.tsx`
```tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

![img](img/09_streaming_a_whole_page.png)


1. `<SideNav>` は静的要素のため即時表示されます。動的コンテンツの読み込み中もユーザーは `<SideNav>` とインタラクション可能です。
2. ユーザーはページ読み込み完了を待たずに移動できます（interruptable navigation)

### ローディングスケルトン

UXをさらに向上させるために、テキストではなくローディングスケルトンを表示してみましょう。

`loading.tsx` ファイルで `<DashboardSkeleton>` をインポートします。


`/app/dashboard/loading.tsx`
```tsx
import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}
```

![img](img/09_streaming_a_whole_page_with_skeleton.png)

### Route Groupでスケルトンの読み込みバグを修正

- [Route Group | NEXT.js](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)

現在、ローディング用スケルトンは `/app/dashboard/page.tsx` に適用されますが、 `/app/dashboard/loading.tsx` は下位の `/invoices/page.tsx` および `/customers/page.tsx` にも適用されてしまいます。

`/app/dashboard/page.tsx` のみのローディング画面としたい場合は [Route Group](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) を利用することでこれを解決できます。  
Route Group  `/app/dashboard/(hogehoge)/page.tsx` のようにフォルダ名を括弧でくくることで作成でき、**`()` で囲まれた名前はURLパスに含まれない**ので、URLパスに影響を与えずにファイルを論理的なグループに整理できます。  
※ 例 `(marketing)` `(shop)` など

ここでは、ルートグループを使用して `loading.tsx` がダッシュボードページにのみ適用されるようにします。

```bash
mkdir -p "app/dashboard/(overview)"

mv "app/dashboard/loading.tsx" "app/dashboard/(overview)/loading.tsx"
mv "app/dashboard/page.tsx" "app/dashboard/(overview)/page.tsx"
```


## コンポーネントレベルのストリーミング (React Suspense)

- [Fething Data with Suspense | NEXT.js](https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense)


ここまではページ全体をストリーミングしていましたが、React Suspense を使えば、特定のコンポーネントのみをストリーミングすることも可能です。


Suspense を使用すると、アプリケーションの一部のレンダリングを、特定の条件（データのロードなど）が満たされるまで延期できます。動的コンポーネントを Suspense でラップし、動的コンポーネントのロード中に表示されるフォールバックコンポーネントを渡すことができます。

そのためには、データ取得をコンポーネントに移動する必要があります。コードを更新して、それがどのようになるかを確認しましょう。

### `<RevenueChart>` をSuspenseでラップする

`<RevenueChart>` コンポーネント側でデータ取得(`fetchRevenue()`) の実行を行うように修正します。


`/app/ui/dashboard/revenue-chart.tsx`
```tsx
import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';  // 追加
 
// ...
 
export default async function RevenueChart() { // asyncを付与して、引数を削除します
  const revenue = await fetchRevenue(); // 追加 コンポーネント側でデータ取得を行う
 
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);
 
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
 
  return (
    // ...
  );
}
```

ページ側で `fetchRevenue()` の呼び出しを削除し、`<RevenueChart>` を `<Suspense>` でラップします

`/app/dashboard/(overview)/page.tsx`
```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data'; // fetchRevenue を削除
import { Suspense } from 'react';  // Suspenseのimportを追加
import { RevenueChartSkeleton } from '@/app/ui/skeletons';  // ローディングスケルトンのインポート

 
export default async function Page() {
  //const revenue = await fetchRevenue() // コンポーネント側で呼び出すので削除
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* ... */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* RevenueChartをSuspenseでラップし、フォールバックにスケルトンを指定 */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        {/* ... */}
      </div>
    </main>
  );
}
```

![img](img/09_suspence_revenue_chart.png)


### `<LatestInvoices>` をSuspenseでラップする

`<LatestInvoices>` コンポーネント側でデータ取得(`fetchLatestInvoices()`) の実行を行うように修正します。


`/app/ui/dashboard/latest-invoices.tsx`
```tsx
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';  // 追加
 
export default async function LatestInvoices() { // asyncを付与して、引数を削除します
  const latestInvoices = await fetchLatestInvoices();  // 追加 コンポーネント側でデータ取得を行う
 
  return (
    // ...
  );
}
```

ページ側で `fetchLatestInvoices()` の呼び出しを削除し、`<LatestInvoices>` を `<Suspense>` でラップします

`/app/dashboard/(overview)/page.tsx`
```tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
//import { fetchCardData } from '@/app/lib/data'; // 削除
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,  // LatestInvoices のローディングスケルトンをインポート
} from '@/app/ui/skeletons';
 
export default async function Page() {
  // const latestInvoices = await fetchLatestInvoices()  // 削除
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* ... */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* ... */}
        {/* LatestInvoices をSuspenseでラップし、フォールバックにスケルトンを指定 */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
```


### `<Card>` をSuspenseでラップする

素晴らしい！あと一歩です。次に、 `<Card>` コンポーネントをSuspenseでラップする必要があります。個々のカードごとにデータをフェッチすることも可能ですが、カードが読み込まれる際にポップアップ効果が発生する可能性があり、ユーザーにとって視覚的に不快に感じられる場合があります。

では、この問題をどう解決しますか？

`<Card>` コンポーネントは個々のカードごとにデータ取得を行うのではなく、ラッパーコンポーネント(`CardWrapper`)を作成し、 `<Card>`をグループ化します。これにより、静的な `<SideNav/>` が最初に表示され、その後カードが表示されるようになります。


まずは、 `<Card>` コンポーネントをグループ化した `<CardWrapper>` コンポーネントを実装します。  
今まで同様、データの取得は `<CardWrapper>` コンポーネント内で行います。

`/app/ui/dashboard/cards.tsx`
```tsx
// ...
import { fetchCardData } from "@/app/lib/data";  // 追加

//...

export default async function CardWrapper() {  // 追加
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers
  } = await fetchCardData(); 
  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </>
  )
}
```

ページ側で `fetchCardData()` の呼び出しを削除し、 `<CardWrapper>` を `<Suspense>` でラップします

`/app/dashboard/(overview)/page.tsx`
```tsx
// import { Card } from '@/app/ui/dashboard/cards'; // 削除
import { CardWrapper } from '@/app/ui/dashboard/cards'; // 追加
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,  // CardWrapper のローディングスケルトンをインポート
} from '@/app/ui/skeletons';
 
export default async function Page() {
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();  // 削除

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* CardWrapper をSuspenseでラップし、フォールバックにスケルトンを指定 */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* ... */}
      </div>
    </main>
  );
}
```

## Suspenseの境界線をどこに置くか


サスペンス境界の設定位置は、以下の要素によって決まります

- ページがストリーミングされる際のユーザー体験の意図
- 優先的に表示したいコンテンツ
- コンポーネントがデータ取得に依存しているかどうか

明確な答えはありません

- loading.tsxのようにページ全体をストリーミングすることも可能です  
ただし、コンポーネントの1つでデータ取得が遅い場合、読み込み時間が長くなる可能性があります。
- 各コンポーネントを個別にストリーミングすることも可能です  
ただし、コンポーネントの準備が整うたびにUIが画面に突然表示される可能性があります。
- ページセクションをストリーミングして段階的な表示効果を作ることもできます  
ただし、ラッパーコンポーネントを作成する必要があります。

サスペンス境界をどこに配置するかは、アプリケーションによって異なります。一般的に、データ取得は必要なコンポーネントに下位配置し、それらをサスペンスで囲むのが良い実践です。ただし、アプリケーションの要件に応じてセクション単位やページ全体のストリーミングを選択しても問題ありません。


# 10. Partial Prerendering (PPR)

- https://nextjs.org/docs/app/getting-started/partial-prerendering

PPRとは端的に言えば同じページ内で静的レンダリングの領域と動的レンダリングの領域を組み合わせることができるレンダリングモデルです。  
現在の殆どのWebアプリでは、ページ全体あるいは特定のルートに対して、静的レンダリングと動的レンダリングのどちらかを選択しています。

このアプリを動的コンポーネントと静的コンポーネントに分割すると次のようになります。

![img](img/10_ppr_site.png)

ユーザーがこのサイトに訪問すると

1. ナビゲーションバーを含む静的ルートシェルが概況され、初期読み込みが高速化されます
2. シェルはその他の動的コンテンツが非同期に読み込まれる場所に穴を残します
3. 非同期のホールは並列でストリーミングされるため、ページの全体的な読み込み時間が短縮されます


## PPRによる事前レンダリングの仕組み

PPRは、Reactの Suspense を使用して、アプリケーションの一部を特定の条件（データ読み込み完了など）が満たされるまでレンダリングを遅延させます。

Suspense のフォールバックは、静的コンテンツと共に初期HTMLファイルに埋め込まれます。ビルド時（または再検証時）に静的コンテンツがプリレンダリングされ、静的シェルが生成されます。  
動的コンテンツのレンダリングは、ユーザーがルートをリクエストするまで延期されます。

コンポーネントを Suspense でラップしても、コンポーネント自体が動的になるわけではありません。サスペンスは静的コードと動的コードの境界として機能します。

ダッシュボードルートでPPRを実装する方法を見てみましょう。


## PPRの実装

PPRを利用するにはNext.jsのカナリアリリースが必要です。

```bash
pnpm install next@canary
```

Next.jsでPPRを有効にするには `next.config.ts` にオプションを追加します。

- https://nextjs.org/docs/app/api-reference/config/next-config-js/ppr


`next.config.ts`
```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {  // 追加
    ppr: 'incremental'  // incremental を設定すると特定のルートにPPRを設定できるようになります。
  }
};

export default nextConfig;
```


次に、ダッシュボードレイアウトに `experimental_ppr` セグメント設定オプションを追加します：


`/app/dashboard/layout.tsx`
```tsx
import SideNav from '@/app/ui/dashboard/sidenav'

export const experimental_ppr = true;

// ...
```

これで完了です。開発中のアプリケーションでは違いが見られないかもしれませんが、本番環境ではパフォーマンスの向上が実感できるはずです。Next.js はルートの静的部分を事前にレンダリングし、動的な部分はユーザーが要求するまで遅延させます。

部分的事前レンダリングの素晴らしい点は、コードを変更することなく使用できることです。ルートの動的な部分をサスペンスでラップしている限り、Next.jsはルートのどの部分が静的でどの部分が動的であるかを認識します。