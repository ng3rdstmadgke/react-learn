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

# 開発サーバーの起動
pnpm dev


# 本番環境の起動
phpm build
phpm start
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

```mermaid
erDiagram
    CUSTOMERS {
      uuid id PK
      varchar name
      varchar email
      varchar image_url
    }

    INVOICES {
      uuid id PK
      uuid customer_id FK
      int amount
      varchar status
      date date
    }

    REVENUE {
      varchar(4) month UK
      int revenue
    }

    USERS {
      uuid id PK
      varchar name
      text email UK
      text password
    }

    %% Relationships
    CUSTOMERS ||--o{ INVOICES : "has many"

    %% (No declared FKs in schema for REVENUE or USERS)

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


# 11. 検索とページネーションの追加

- https://nextjs.org/learn/dashboard-app/adding-search-and-pagination

この章では `useSearchParams` `usePathname` `useRouter` の使いを学びます。

請求書一覧ページの雛形を作成します。

`/dashboard/invoices/page.tsx`
```tsx
import Search from '@/app/ui/search';  // 特定の請求書を検索するためのコンポーネント
import Pagination from '@/app/ui/invoices/pagination';  // 請求書のページネーション用コンポーネント
import Table from '@/app/ui/invoices/table';  // 請求書テーブルの表示用コンポーネント
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';


export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  )
}
```

## 検索にGETパラメータを使う理由

- ブックマーク可能
- 初回アクセス時にサーバーサイドレンダリングが容易
- GAなどでユーザーの行動を追跡しやすくなる


## 検索機能の追加

以下は検索機能を実装するために利用する Next.js クライアントフックです。

### 1. ユーザーの入力をキャプチャする


`handleSearch()` 関数を作成し、検索フォームの `onChange` にイベントリスナーとして追加します。

`/app/ui/search.tsx`
```tsx
'use client';  // クライアントコンポーネントなのでイベントリスナーとクライアントフックを使用できます。

export default function Search({ placeholder }: { placeholder: string }) {
  function handleChange(term: string) { // handleChangeの追加
    console.log(term);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {  // onChangeイベントのリスナーにhandleChangeを設定
          handleChange(e.currentTarget.value)
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
```


### 2. 検索パラメータでURLを更新する

検索ボックスに入力された値でURLを書き換えます。 (ページをリロードせずにURLを更新します)

- [`useSearchParams`](https://nextjs.org/docs/app/api-reference/functions/use-search-params)  
現在のURLのGETパラメータを取得します。例えば `/dashboard/invoices?page=1&query=pending` であれば `{page: '1', query: 'pending'}` となります。
  - 戻り値は [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) になります
- [`usePathname`](https://nextjs.org/docs/app/api-reference/functions/use-params)  
現在のURLのパス名を取得します。例えば、ルートが `/dashboard/invoices` なら `'/dashboard/invoices'` となります。
- [`useRouter`](https://nextjs.org/docs/app/api-reference/functions/use-router)  
クライアントコンポーネント内でルート間のナビゲーションをプログラムで実現します。複数の方法が利用可能です。


`/app/ui/search.tsx`
```tsx
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams: URLSearchParams = useSearchParams(); // アクセス時のURL
  const pathname = usePathname(); // アクセス時のパス
  const { replace } = useRouter();

  // 検索ボックスに入力された値でURLを更新するイベントハンドラ
  function handleChange(term: string) {
    const params = new URLSearchParams(searchParams);
    // console.log('params:', [...params.entries()]);
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    // useRouterのルーターフックを利用することでページをリロードせずにURLを更新できます。
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {handleChange(e.currentTarget.value)}}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

```


### 3. URLと入力内容を同期させる

`?query=hogehoge` というGETパラメータ付きのURLにアクセスしたときに検索ボックスにパラメータが入力されるようにします。


`/app/ui/search.tsx`
```tsx
<input
  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
  placeholder={placeholder}
  onChange={(e) => {
    handleSearch(e.target.value);
  }}
  defaultValue={searchParams.get('query')?.toString()}
/>
```


### 4. テーブルの更新

検索クエリを反映するようにテーブルコンポーネントを更新します。

`/app/dashboard/invoices/page.tsx`
```tsx
// ...

export default async function Page(props: {searchParams?: Promise<{query?: string; page?: string;}>; }) {
  // URLから検索クエリ(query)と現在ページ(page)を取得
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
  return (
    <div className="w-full">
      {/* ... */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      {/* ... */}
    </div>
  );
}
```

#### 補足1: Page関数の引数について

`page.tsx` の `Page()` 関数は `params` と `searchParams` という要素を持つオブジェクトを引数に取ります。  
[page.js - File Conventions - API Reference | NEXT.js](https://nextjs.org/docs/app/api-reference/file-conventions/page)


```tsx
export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <h1>My Page</h1>
}
```

#### 補足2: 繰り返しの描画

繰り返しの描画は `map` を利用する

```tsx
<div>
  {invoices?.map((invoice) => (
    <div key={invoice.id}>
      <div>{invoice.email}</div>
    </div>
  )}
</div>
```

`/app/ui/invoices/table.tsx`
```tsx
// ...
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({query, currentPage}: {query: string; currentPage: number;}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* ... */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {/* ... */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr key={invoice.id} className="..." >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

### 5. デバウンス

現在の実装だと、入力の都度イベントハンドラが発火してしまうため、`use-debounce` を利用してユーザーが入力を一定時間移譲止めたときにのみ発火するようにします。


```bash
pnpm i use-debounce
```

`useDebouncedCallback` をインポートし、 `handleSearch` の内容をラップします。  
今回は300ミリ秒経過後にコードを実行します。

`/app/ui/search.tsx`
```tsx
// ...
import { useDebouncedCallback } from 'use-debounce';  // インポート
 
// イベントハンドラの処理をuseDebouncedCallbackでラップ
const handleSearch = useDebouncedCallback((term) => {
  console.log(`Searching... ${term}`);
 
  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set('query', term);
  } else {
    params.delete('query');
  }
  replace(`${pathname}?${params.toString()}`);
}, 300);
```


## ページネーションの追加


`/app/dashboard/invoices/page.tsx`
```tsx
// ...
import { fetchInvoicesPages } from '@/app/lib/data';


export default async function Page(props: { searchParams: { query?: string, page?: string } }) {
  // ...
  const totalPages: number = await fetchInvoicesPages(query); // 検索結果に基づく総ページ数を取得

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="w-full">
      {/* ... */}

      {/* Paginationコンポーネントの読み込み */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
```

ページネーションを描画するコンポーネントを実装します。  

`/app/ui/invoices/pagination.tsx`
```tsx
'use client';

// ...
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation'; // 追加

export default function Pagination({ totalPages }: { totalPages: number }) {
  // 現在のURL情報
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // 指定されたページのURLを生成する関数
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  // 表示するページネーションボタンを表す配列
  // [1, "...", 5, 6, 7, "...", 10] みたいな
  const allPages = generatePagination(currentPage, totalPages);

  return (
    {/* ページネーションの描画 */}
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

// ...

```

検索クエリが更新されたときに、、ページを `1` にリセットします。

`/app/ui/search.tsx`
```tsx
// ...

export default function Search({ placeholder }: { placeholder: string }) {
  // ...

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');      // 追加: 検索時にページ番号をリセット
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    {/* ... */}
  );
}

```

![img](img/11_search_and_pagination.png)

# 12. データの変更


## React Server Actions

- [サーバーアクションでのフォームの作り方 | NEXT.js](https://nextjs.org/docs/app/guides/forms)
- [サーバーアクションのセキュリティについて | NEXT.js](https://nextjs.org/blog/security-nextjs-server-components-actions)
  - https://notebooklm.google.com/notebook/9d283703-41c4-423e-aedb-beb9fe685f85

React Server Actionsを使用すると、サーバー上で直接非同期コードを実行できます。  
データの変更のためにAPIエンドポイントを作成する必要がなくなります。代わりに、サーバー上で実行され、クライアントまたはサーバーコンポーネントから呼び出せる非同期関数を記述します。

ウェブアプリケーションは様々な脅威に対して脆弱であるため、セキュリティは最優先事項です。  
Server Actionsには、暗号化されたクロージャ、厳格な入力チェック、エラーメッセージのハッシュ化、ホスト制限などの機能が含まれており、これらが連携してアプリケーションのセキュリティを大幅に強化します。


## Server Actions でフォームを利用する

Reactでは、`<form>` 要素の `action` 属性を使用してアクションを呼び出すことができます。このaction属性には、キャプチャされたデータを含むネイティブの [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) オブジェクトが自動的に渡されます。



```ts
// Server Component
export default function Page() {
  // Action
  async function create(formData: FormData) {
    'use server';
 
    // Logic to mutate data...
  }
 
  // Invoke the action using the "action" attribute
  return <form action={create}>...</form>;
}
```

サーバーコンポーネント内で Server Actions を呼び出す利点は、クライアント側でJavaScriptの読み込みが完了していなくてもフォームが機能するということです。


## Server Actions と Next.js

Server Actions は [Next.js のキャッシュ機能](https://nextjs.org/docs/app/guides/caching)とも深く連携しています。Server Actions 経由でフォームが送信された場合、アクションでデータを変更できるだけでなく、`revalidatePath` や `revalidateTag` といったAPIを使用して関連するキャッシュを再検証することも可能です。

## Invoiceの作成

### 1. 新しいルートとフォームの作成


`/dashboard/invoices` に新しいルート `/create` を追加します。


```bash
mkdir -p app/dashboard/invoices/create
touch app/dashboard/invoices/create/page.tsx
```


`/app/dashboard/invoices/create/page.tsx`
```tsx
import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
```

ページはサーバーコンポーネントであり、`customers` データを取得して `<Form>` コンポーネントに渡します。


フォームの実態は `/app/ui/invoices/breadcrumbs` 


![img](img/12_form.png)

### 2. Server Actions を作成する

フォームが送信されたときに呼び出されるサーバーアクションを定義します。

`/app/lib/actions.ts` を作成し、 `'use server';` を指定します。  
※ [`'use server'`](https://react.dev/reference/rsc/use-server) はクライアント側から呼び出せるサーバー側の関数をマークするために利用します。

`'use server'` を追加することで、ファイル内のエクスポートされた関数をすべてサーバーアクションとしてマークします。  
れらのサーバー関数は、クライアントコンポーネントやサーバーコンポーネントでインポートして使用できます。  
このファイルに含まれる未使用の関数は、最終的なアプリケーションバンドルから自動的に削除されます。

※ 関数内に `'use server'` を追加することで、サーバーコンポーネント内に直接サーバーアクションを記述することも可能です。


`/app/lib/actions.ts`
```ts
'use server';
 
export async function createInvoice(formData: FormData) {

}
```


次に、 `<Form>` コンポーネント内で、 `createInvoice` をインポートします。`<form>` 要素に `action` 属性を追加し、 `createInvoice` アクションを呼び出します。

`/app/ui/invoices/create-form.tsx`
```tsx
// ...
import { createInvoice } from '@/app/lib/actions';  // 追加

export default function Form({ customers }: { customers: CustomerField[] }) {
  return (
    <form action={createInvoice}> {/* action属性を追加 */}
```

### 補足: action属性に関して

HTMLではaction属性にはフォームの送信先URLを指定しますが、Reactでは `action` 属性は特別なプロパティとみなされており、アクション(関数)を指定することができます。  
サーバーアクションはバックグラウンドで `POST` APIエンドポイントを作成するため、サーバーアクションを使用する際にAPIエンドポイントを手動で作成する必要はありません。  

### 3. `formData` からデータを抽出する

`FormData` の [`get` メソッド](https://developer.mozilla.org/en-US/docs/Web/API/FormData/get) でフォームのデータを取得します。  
※ まとめて取得したい場合は [`entries` メソッド](https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries) も利用できます。


`/app/lib/actions.ts`
```ts
'use server';
 
export async function createInvoice(formData: FormData) {
  // FormData: https://developer.mozilla.org/ja/docs/Web/API/FormData
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  }
  console.log('Raw Form Data:', rawFormData);  // サーバー側で実行されるのでターミナル側にログが出力されます
}
```


### 4. データのバリデーション

フォームをデータベースに送信する前にバリデーションを行います。  
請求書テーブルのデータ型は `/app/lib/definitions.ts` の `Invoice` として定義されています。

`/app/lib/definitions.ts`
```ts
export type Invoice = {
  id: string; // Will be created on the database
  customer_id: string;
  amount: number; // Stored in cents
  status: 'pending' | 'paid';
  date: string;
};
```

#### 型のバリデーションと強制

DBの `amount` は `number` 型ですが、フォームの `amount` は `string` 型になっていることがわかります。

`/app/lib/actions.ts`
```ts
console.log('Type of amount:', typeof rawFormData.amount);  // Type of amount: string
```

TypeScriptでは型の検証と強制には [Zod](https://zod.dev/) を利用します。  

`/app/lib/actions.ts`
```ts
'use server';

import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),  // https://zod.dev/api?id=strings
  amount: z.coerce.number(),  // 入力データを適切な型に強制変換 (https://zod.dev/api?id=coercion)
  status: z.enum(['pending', 'paid']),  // https://zod.dev/api?id=enums
  date: z.string(),
})

// idとdateはサーバー側で生成するため、フォームからは受け取らない (https://zod.dev/api?id=omit)
const CreateInvoice = FormSchema.omit({id: true, date: true})

export async function createInvoice(formData: FormData) {
  // FormData: https://developer.mozilla.org/ja/docs/Web/API/FormData
  const {customerId, amount, status} = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })
  // 浮動小数点エラーを排除し精度を高めるためにデータベースに通貨値をセント単位で保存
  const amountInCents = amount * 100;
  // 請求書の作成日として「YYYY-MM-DD」の形式で新しい日付を作成します
  const data = new Date().toISOString().split("T")[0];
   console.log({customerId, amountInCents, status, data});  // {customerId: '3958dc9e-712f-4377-85e9-fec4b6a6442a', amountInCents: 2222200, status: 'pending', data: '2025-10-09'}
}
```

### 5. データベースにデータを挿入する

データベースに必要な値がすべて揃ったので、新しい請求書をデータベースに挿入し、変数を渡す SQL クエリを作成できます。

`/app/lib/actions.ts`
```ts
'use server';

import { z } from 'zod';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });

// ...

export async function createInvoice(formData: FormData) {
  // ...

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${data})
  `;
}
```


### 6. 再検証してリダイレクト

Next.js には、ルートセグメントをユーザーのブラウザに一定期間保存するクライアント側ルーターキャッシュがあります。このキャッシュは、プリフェッチと併用することで、ユーザーがルート間を素早く移動できるようにし、サーバーへのリクエスト数を削減します。

請求書ルートに表示されるデータを更新するため、このキャッシュをクリアしてサーバーへの新しいリクエストをトリガーする必要があります。これは、revalidatePathNext.jsの関数を使用して実行できます。

`/app/lib/actions.ts`
```ts
// ...

import { revalidatePath } from 'next/cache';

// ...

export async function createInvoice(formData: FormData) {
  // ...

  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
}
```


データベースが更新されると、/dashboard/invoicesパスが再検証され、サーバーから最新のデータが取得されます。

この時点で、ユーザーを元のページに戻すリダイレクトも行います


`/app/lib/actions.ts`
```ts
// ...

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ...

export async function createInvoice(formData: FormData) {
  // ...

  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
  redirect('/dashboard/invoices');  // 請求書一覧ページにリダイレクト
}
```


## Invoiceの更新

### 1. `invoices/` 配下に動的ルートセグメント(`[id]`)を作成する

Next.js では、正確なセグメント名がわからず、データに基づいてルートを作成したい場合に、 動的ルートセグメントを作成できます。  
フォルダ名を角括弧で囲むことで、動的ルートセグメントを作成できます。例えば`[id]` や `[post]` などです。


- [Dynamic Route Segments | NEXT.js](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)



```bash
mkdir -p "app/dashboard/invoices/[id]/edit"
touch "app/dashboard/invoices/[id]/edit/page.tsx"
```

`<Table>` コンポーネントには、テーブル レコードから請求書を受け取るボタン `<UpdateInvoice />` があることに注目してください

`/app/ui/invoices/table.tsx`
```tsx
export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  return (
    // ...
    <td className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm">
      <UpdateInvoice id={invoice.id} />  {/* <- これ */}
      <DeleteInvoice id={invoice.id} />
    </td>
    // ...
  );
}

```

`<UpdateInvoice />` コンポーネントに移動し、`id` プロパティを受け入れるよう `href` にを更新します。
`<UpdateInvoice />` コンポーネントに移動し、`Link` の `href` を `id` プロパティを受け入れるように更新します。動的なルートセグメントへのリンクにはテンプレートリテラルを使用できます:

`/app/ui/invoices/buttons.tsx`
```tsx
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
 
// ...
 
export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}  // idを含めたパスに修正
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
```

### 2. 指定された `id` の請求書を読み込む

URLのパスから `id` を取得し、その `id` で対象の `invoice` を取得します。  
取得した `invoice` の情報をデフォルト値として編集フォームを描画します。

`/app/dashboard/invoices/[id]/edit/page.tsx`
```tsx
import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";

export default async function Page(props: {params: Promise<{id: string}>}) {
  const params = await props.params;
  const id = params.id;
  // フォームの初期値として請求書データと顧客データを取得
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers()
  ])
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: '/dashboard/invoices/${id}/edit',
            active: true,
          },

        ]}
      />
      {}
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}
```

![img](img/12_edit_form.png)


### 3. サーバーアクションに渡す

データベースを更新するためのサーバーアクションを定義します。

`/app/lib/actions.ts`
```tsx
// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  // フォームから送信されたデータを検証
  // FormData: https://developer.mozilla.org/ja/docs/Web/API/FormData
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
  redirect('/dashboard/invoices');  // 請求書一覧ページにリダイレクト
}
```

最後に、サーバーアクションをコンポーネントの `<form>` の `action` に指定しますが、
サーバーアクションの `id` 引数は以下のような形式で渡すことはできません。

```tsx
// Passing an id as argument won't work
<form action={updateInvoice(id)}>
```

代わりに、JavaScriptの `Function.prototype.bind()` 関数を使用して `id` がすでに設定された `updateInvoice()` を生成することができます。


`/app/ui/invoices/edit-form.tsx`
```tsx
'use client';
// ...
import { updateInvoice } from '@/app/lib/actions';  // 追加

export default function EditInvoiceForm({ invoice, customers, }: { invoice: InvoiceForm; customers: CustomerField[]; }) {

  // updateInvoice()の第一引数(id)に invoice.id を指定した関数を生成
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  return (
    <form action={updateInvoiceWithId}>  {/* form の action に請求書を更新する関数を指定 */}
    {/* ... */}
    </form>
  )
}
```


#### `Function.prototype.bind()` とは

- [Function.prototype.bind() | MDN](https://nextjs.org/learn/dashboard-app/mutating-data)

`bind()` 関数は元の関数の「 `this` キーワード」と「引数」を設定した新しい関数を生成します。  
いわゆる **カリー化** みたいなことができる


- シグネチャ
`bind(thisArg, arg1, arg2, ... argN)`
- 引数
  - `thisArg`
  関数内で `this` を利用したときに参照されるオブジェクトを指定します。  
  `null` `undefined` を指定するとグローバルオブジェクトとなります。
  - `arg1, ..., argN`
  元の関数の引数を一部または全部指定できます
- 戻り値
  `this` の値と初期の引数が設定された関数のコピー


例1: 引数の一部を指定する

```js
function product (a, b) {
    return a * b;
}

console.log(product(5, 4)) // 20

var double = product.bind(null, 2)  // productの第一引数に2を指定した新しい関数を生成

console.log(double(5))  // 10
```

例2: 任意の this を指定する

```js

const module = {
  x: 42,
  getX() {
    return this.x;
  }
}

var unboundGetX = module.getX;
console.log(unboundGetX()); // undefined (関数内の this がグローバルオブジェクトなので)

var boundGetX = module.getX.bind(module)
console.log(boundGetX())  // 42 (関数内の this が module オブジェクトなので)
```


## Invoiceの削除

invoiceを削除するサーバーアクションを定義します。


`/app/lib/actions.ts`
```ts
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
}
```

サーバーアクションを使用して請求書を削除するには、削除ボタンを `<form>` 要素で囲み、 `bind` を使用して `id` をサーバーアクションに渡します：

`/app/ui/invoices/buttons.tsx`
```tsx
import { deleteInvoice } from '@/app/lib/actions';
 
// ...
 
export function DeleteInvoice({ id }: { id: string }) {
  // deleteInvoice()の第一引数(id)に invoice.id を指定した関数を生成
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
```


# 13. エラー処理


## try/catchサーバーアクションへの追加

まずはアクション内でキャッチされていない例外が発生した場合にどうなるかを見てみましょう。

`/app/lib/actions.ts`
```ts
export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');  // わざと例外を発生させる

  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}
```

請求書を削除しようとすると、ローカルホストで以下のようなエラーが表示されページ自体が全く表示されなくなります。

```
 ⨯ Error: Failed to Delete Invoice
    at deleteInvoice (app/lib/actions.ts:81:9)
  79 |
  80 | export async function deleteInvoice(id: string) {
> 81 |   throw new Error('Failed to Delete Invoice');  // わざと例外を発生させる
     |         ^
  82 |
  83 |   await sql`DELETE FROM invoices WHERE id = ${id}`;
  84 |   revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得 {
  digest: '770613014'
}
 POST /dashboard/invoices 500 in 173ms
```

![img](img/13_error.png)


エラーを適切に処理できるように、 `try/catch` をサーバーアクションに追加してメッセージエラーメッセージを返したくなるところですが、 `<form action={...}>` に設定される関数の戻り値の型は `Promise<void>` が期待されているため、ビルドで失敗します。  
※ ちなみに、、、 `try/catch` を利用する場合は `redirect` を `try` 節に入れないように注意してください。`redirect` はエラーをスローすることで動作するため、エラーがキャッチされると動作しなくなります。


`/app/lib/actions.ts`
```ts
export async function createInvoice(formData: FormData) {
  // ...

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${data})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    }
  }

  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
  redirect('/dashboard/invoices');  // 請求書一覧ページにリダイレクト
}
```


## `error.tsx` ですべてのエラーを処理する

- [error.js | NEXT.js](https://nextjs.org/docs/app/api-reference/file-conventions/error)

error.tsxファイルは、ルートセグメントのUI境界を定義するために使用できます。予期しないエラーの受け皿として機能し、ユーザーにフォールバックUIを表示することを可能にします。

エラーハンドリング関数( `Error` )は2つのプロパティを受け入れます。

- `error` : JavaScriptのネイティブインスタンス [`Error`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Error) です。
- `reset` : エラー境界をリセットする関数です。実行されると、ルートセグメントの再レンダリングを試みます。

`/app/dashboard/invoices/error.tsx`
```tsx
'use client';  // error.tsx はクライアントコンポーネントである必要があります。

import { useEffect } from "react";

export default function Error({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // オプションでエラーをエラー報告サービスに記録する
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // 請求書ルートを再レンダリングして回復を試みる
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  )
}
```

![img](img/13_handling_all_errors.png)


### `Error & { digest?: string }` 型について


`Error & { digest?: string }` は TypeScript の交差型（intersection type）です。  
Error 型が持つプロパティ（name, message, stack など）に加えて、digest という省略可能(`?`がついている)な文字列プロパティを持つオブジェクトであることを表します。  
Next.js のエラーバウンダリでは内部的にエラーに digest（内部で使う識別用ハッシュ）を付与することがあるため、その情報が渡ってくる可能性を考慮してこの型になっています。


### 請求書の作成・編集画面のSQLのエラーハンドリング

捕捉されていない例外を表示できる画面ができたので、請求書の作成・編集処理のSQLを `try/catch` で囲んでエラーハンドリングを行います。


`/app/lib/actions.ts`
```ts
export async function createInvoice(formData: FormData) {
  // ...
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${data})
    `;
  } catch (error) {
    console.error(error);
    throw new Error('Database Error: Failed to Create Invoice.');
  }

  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
  redirect('/dashboard/invoices');  // 請求書一覧ページにリダイレクト
}


export async function updateInvoice(id: string, formData: FormData) {
  // ...
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    throw new Error('Database Error: Failed to Update Invoice.');
  }

  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
  redirect('/dashboard/invoices');  // 請求書一覧ページにリダイレクト
}
```

## `notFound` 関数で404エラーを処理する

- [not-found.js | NEXT.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [notFound - API Reference | NEXT.js](https://nextjs.org/docs/app/api-reference/functions/not-found)


エラーを適切に処理するもう一つの方法は、 `notFound` 関数を使用することです。  
 `error.tsx` はキャッチされていない例外をキャッチするのに便利ですが、`notFound` は存在しないリソースを取得しようとする場合にも使用できます。

指定された `id` で請求書を取得できなかった場合に `notFound` 関数を呼び出す呼び出す条件を追加します。

`/app/dashboard/invoices/[id]/edit/page.tsx`
```tsx
// ...
import { notFound } from "next/navigation";  // 追加

export default async function Page(props: {params: Promise<{id: string}>}) {
  const params = await props.params;
  const id = params.id;
  // フォームの初期値として請求書データと顧客データを取得
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers()
  ])

  if (!invoice) {
    notFound();  // 存在しない請求書IDが指定された場合は404エラーページを表示
  }
  // ...
}

```


次に、ユーザーにエラー UI を表示するために、`/app/dashboard/invoices/[id]/edit` 内に `not-found.tsx` ファイルを作成します。

`/app/dashboard/invoices/[id]/edit/not-found.tsx`
```tsx
import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
```

存在しないURLにアクセスしてみます

http://localhost:3000/dashboard/invoices/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/edit


![img](img/13_handling_not_found.png)

ちなみに、**notFoundはerror.tsxよりも優先される**ため、より具体的なエラーを処理したい場合に利用できます！

# 14. アクセシビリティの向上

- アクセシビリティについて更に詳しく知りたい場合はこちら -> [Learn Accesibility | web.dev](https://web.dev/learn/accessibility/)

## Next.js で ESLint アクセシビリティ プラグインを使用する

Next.jsは、アクセシビリティの問題を早期に検出するために、ESLint設定に [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) プラグインを含んでいます。例えば、このプラグインは、altテキストのない画像がある場合、`aria-*` 属性や `role` 属性を誤って使用している場合などに警告を発します。

これを試して見る場合は `package.json` に `next lint` をスクリプトとして追加します。

`/package.json`
```js
{
  // ...
  "scripts": {
    "build": "next build",
    "dev": "next dev --turbopack",
    "start": "next start",
    "lint": "next lint"  // 追加
  },
  // ...
}
```

実行


```bash
pnpm lint

# > @ lint /workspaces/react-learn/nextjs_tutorial/
# > next lint
# 
# `next lint` is deprecated and will be removed in Next.js 16.
# For new projects, use create-next-app to choose your preferred linter.
# For existing projects, migrate to the ESLint CLI:
# npx @next/codemod@canary next-lint-to-eslint-cli .
# 
# (node:1306592) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///workspaces/react-learn/nextjs_tutorial/next.config.ts is not specified and it doesn't parse as CommonJS.
# Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
# To eliminate this warning, add "type": "module" to /workspaces/react-learn/nextjs_tutorial/package.json.
# (Use `node --trace-warnings ...` to show where the warning was created)
# 
# ./app/dashboard/(overview)/page.tsx
# 5:23  Warning: 'Card' is defined but never used.  @typescript-eslint/no-unused-vars
# 
# ./app/seed/route.ts
# 115:11  Warning: 'result' is assigned a value but never used.  @typescript-eslint/no-unused-vars
# 115:37  Warning: 'sql' is defined but never used.  @typescript-eslint/no-unused-vars
# 
# ./app/ui/customers/table.tsx
# 5:3  Warning: 'CustomersTableType' is defined but never used.  @typescript-eslint/no-unused-vars
# 
# ./app/ui/dashboard/latest-invoices.tsx
# 5:10  Warning: 'LatestInvoice' is defined but never used.  @typescript-eslint/no-unused-vars
# 
# ./app/ui/dashboard/nav-links.tsx
# 28:26  Error: React Hook "usePathname" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.  react-hooks/rules-of-hooks
# 
# ./app/ui/dashboard/revenue-chart.tsx
# 4:10  Warning: 'Revenue' is defined but never used.  @typescript-eslint/no-unused-vars
# 
# ./app/ui/login-form.tsx
# 5:3  Warning: 'ExclamationCircleIcon' is defined but never used.  @typescript-eslint/no-unused-vars
# 
# info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
#  ELIFECYCLE  Command failed with exit code 1.
```

## フォーム検証


### クライアント側の検証

`<input>` 要素や `<select>` 要素に `required` 属性を追加することで、ブラウザが提供するフォーム検証機能を利用して必須入力とすることができます。

`/app/ui/invoices/create-form.tsx`
```tsx
<input
  id="amount"
  name="amount"
  type="number"
  placeholder="Enter USD amount"
  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
  required
/>
```


### サーバー側検証

サーバー上でフォームを検証することで、次のことが可能になります。

- データベース送信前に、データが期待どおりの形式であることを確認
- 悪意のあるユーザーがクライアント側の検証をバイパスするリスクを軽減
- 有効なデータとみなされるものについては、信頼できる唯一の情報源を確保


`useActionState` はフォームのサーバーアクションの結果に基づいて `state` を更新するためのフックです。  
`useActionState` を利用して、バリデーション結果を `state` に保持し画面にメッセージを描画します。

- [useActionState - API Reference - Hook| React](https://ja.react.dev/reference/react/useActionState)


`react` から `useActionState` フックをインポートします。  
`useActionState` はフックなので、 `'use client'` でクライアントコンポーネントに変更する必要があります。  

`/app/ui/invoices/create-form.tsx`
```tsx
'use client';  // useActionState フックはクライアントコンポーネントでのみ使用可能

// ...
import { useActionState } from 'react'
```

`useActionState` フックは 2つの引数と2つの戻り値を持ちます
- `const [state, formAction] = useActionState(createInvoice, initialState);`
- 引数 `(action, initState)`
  1. アクション関数  
  シグネチャ `function createInvoice(prevState: State|undefined, formData: FormData): Promise<State|undefined>`
  2. ステートの初期状態  
- 戻り値 `[state, formAction]`
  1. 状態管理オブジェクト
  1. フォームアクション関数

`useActionState` を実行して状態管理オブジェクトとフォームアクション関数を生成し、 `<form>` の `action` 属性に生成したフォームアクション関数を設定します。

`/app/ui/invoices/create-form.tsx`
```tsx
// ...
import { useActionState } from 'react'

export default function Form({ customers }: { customers: CustomerField[] }) {
  // useActionState フックを使用して、フォームの状態とフォームアクション関数を生成
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      ...
    </form>
  )
}
```

`initialState` は任意に定義できます。  
この例では、`message` と `errors` というキーを持つ`State` オブジェクトを作成し、`actions.ts` ファイルからインポートします。  
※ `State` 型はこの後作成します。


`/app/ui/invoices/create-form.tsx`
```tsx
// ...
import { createInvoice, State } from '@/app/lib/actions';  // 追加
import { useActionState } from 'react'

export default function Form({ customers }: { customers: CustomerField[] }) {
  // 初期ステートを定義
  const initialState: State = {message: null, errors: {}};
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      ...
    </form>
  )
}
```

`action.ts` ファイルで、Zodを使用してフォームデータを検証できます。FormSchemaを以下のように更新してください：

`/app/lib/actions.ts`
```ts
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    // 顧客フィールドが空の場合にエラーを発生させます。エラーメッセージもカスタマイズします。
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    // 文字列から数値への型変換を行うため、文字列が空の場合0になります。.gt()で金額が0より大きくなるようにします
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    // ステータスフィールドが空の場合にエラーを発生させます。エラーメッセージもカスタマイズします。
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
```

次に、`createInvoice` アクションを更新し、2つのパラメータ（`prevState` と `formData` ）を受け取るようにします：

`prevState` は useActionStateフックから渡される状態オブジェクトで、必須のプロパティです。

`/app/lib/actions.ts`
```ts
export type State = {
  // フォームの各フィールドに関連するエラーメッセージを格納する
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  // フォームの全体的な状態や操作の結果に関するメッセージを格納する
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
  // ...
}
```

次に、Zodの `parse()` 関数を `safeParse()` に変更します

`safeParse()` は、成功またはエラーのフィールドを含むオブジェクトを返します。(つまりバリデーションを `try/catch` ブロックでエラーハンドリングする必要がなくなります)

データベースに情報を送信する前に、条件分岐を用いてフォームフィールドが正しく検証されたか確認してください：

`/app/lib/actions.ts`
```ts
export async function createInvoice(prevState: State, formData: FormData) {
  // 各フィールドが正しく入力されているかを検証
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // 検証に失敗した場合、エラーメッセージを含むStateオブジェクトを返す
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors, // {customerId: [...], amount: [...], status: [...]}
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // ...
}
```


データベースのエラーに対しても特定のメッセージを返すことができます。

`/app/lib/actions.ts`
```ts
export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // 変更: データベースエラーが発生した場合、メッセージを含むStateオブジェクトを返す
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
```

最後に、フォームコンポーネントでエラーを表示します。  
`create-form.tsx` コンポーネントに戻り、フォームの状態を使ってエラーにアクセスします。

上記のコードでは、以下のariaラベルも追加しています：

- `aria-describedby="customer-error"`  
これはselect要素とエラーメッセージコンテナの関係を確立します。 `id="customer-error"` のコンテナが `select` 要素を記述していることを示します。  
スクリーンリーダーは、ユーザーがselectボックスを操作した際にこの説明を読み上げ、エラーを通知します。
- `id="customer-error"`  
この `id` 属性は、`select` 入力のエラーメッセージを保持するHTML要素を一意に識別します。 `aria-describedby` が関係を確立するために必要です。
- `aria-live="polite"`  
`div` 内のエラーが更新された際、スクリーンリーダーはユーザーに丁寧に通知します。  
コンテンツが変更された場合（例：ユーザーがエラーを修正した時）、スクリーンリーダーはこれらの変更をアナウンスしますが、ユーザーの操作を妨げないよう、ユーザーが操作していない時のみ行います。

``
```tsx
<form action={formAction}>
  <div className="rounded-md bg-gray-50 p-4 md:p-6">
    {/* Customer Name */}
    <div className="mb-4">
      <label htmlFor="customer" className="mb-2 block text-sm font-medium">
        Choose customer
      </label>
      <div className="relative">
        <select
          id="customer"
          name="customerId"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
          aria-describedby="customer-error"  // 追加
        >
          <option value="" disabled>
            Select a customer
          </option>
          {customers.map((name) => (
            <option key={name.id} value={name.id}>
              {name.name}
            </option>
          ))}
        </select>
        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      {/* 追加: state.errors.customerId に格納されているエラーメッセージを表示 */}
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.customerId &&
          state.errors.customerId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      {/* 追加: ここまで*/}
    </div>
    // ...
  </div>
</form>
```

`amount` `status` のフォームにも同様の変更を行います。

![img](img/14_accessibility_server_validation.png)


`edit-form.tsx` コンポーネントのフォームにも同様の修正を行います。


#### `useActionState` を使ったフォオームの検証の最小サンプル

シグネチャ

```ts
useActionState(action, initialState, permalink?)
```

**サンプルコード**

ページコンポーネント

`/app/sample/page.tsx`
```tsx
import Form from '@/app/sample/(ui)/form'

export default async function Page() {
  return (
    <div className="m-4">
      <Form />
    </div>
  )
}

```

フォームコンポーネント

`/app/sample/(ui)/form.tsx`
```tsx
'use client';  // フック(useActionStateなど) はクライアントサイドでのみ利用可能

import { SampleState, sampleAction } from '@/app/sample/(ui)/action';
import { useActionState } from 'react';

export default function Form() {
  // フォームの初期状態
  const initialState: SampleState = {errors: {}};

  // useActionState フックでフォームの状態とアクション関数を取得
  const [state, sampleFormAction] = useActionState(sampleAction, initialState);

  return (
    <form action={sampleFormAction}> {/* useActionStateフックで取得したフォームアクションを指定 */}
      {/* name フィールド */}
      <div className="mb-4">
        <label htmlFor="name" className="mr-4">Name</label>
        <input id="name" name="name" type="text" required/>
        {/* stateからエラーメッセージを表示 */}
        <div>
          {state?.errors?.name && state.errors.name.map((e: string) => {
              return <p className="text-red-600" key={e}>{e}</p>
          })}
        </div>
      </div>

      {/* age フィールド */}
      <div className="mb-4">
        <label htmlFor="age" className="mr-4">Age</label>
        <input id="age" name="age" type="number" required/>
        {/* stateからエラーメッセージを表示 */}
        <div>
          {state?.errors?.age && state.errors.age.map((e: string) => {
            return <p className="text-red-600" key={e}>{e}</p>
          })}
        </div>
      </div>

      {/* 送信ボタン */}
      <div>
        <button 
          className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="submit"
        >Submit</button>
      </div>
    </form>
  )
}
```

フォームアクション


`/app/sample/(ui)/action.tsx`
```ts
import { z } from 'zod';

/**
 * フォームの検証スキーマ
 */
const FormSchema = z.object({
  name: z.string()
    .trim()
    .regex(/^[A-Za-z\s]+$/, {message: "アルファベットとスペースのみ使用できます"})
    .min(2, {message: "2文字以上で入力してください"})
    .max(50, {message: "50文字以下で入力してください"}),
  age: z.coerce  // zodのnumberはNaNを許容しないため、z.coerceを使用して文字列を数値に変換 (https://zod.dev/api?id=coercion)
    .number()
    .min(0, {message: "0歳以上で入力してください"})
    .max(100, {message: "100歳以下で入力してください"}),
})

/**
 * フォームのstateの型定義
 */
export type SampleState = {
  errors?: {
    name?: string[];
    age?: string[];
  };
}

/**
 * フォームのアクション関数
 *
 * useActionState フックの第1引数に渡される関数は、stateとFormDataオブジェクトの2つの引数を受け取る必要があります
 */
export async function sampleAction(
  prevState: SampleState | undefined,
  formData: FormData
) {
  // フォームデータの検証
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    age: formData.get("age")
  })

  // 検証エラーがある場合は、エラーメッセージを返す
  // エラーメッセージは state に格納され、フォームに表示される
  if (!validatedFields.success) {
    const state: SampleState = {
      // { name: [...], age: [...] }
      errors: validatedFields.error.flatten().fieldErrors
    }
    return state;
  }

  // 検証が成功した場合は、フォームデータを処理する (ここではコンソールに出力)
  console.log("Form submitted successfully:", validatedFields.data);
}

```

# 15. 認証の追加

## ログインルートの作成

新たにログインページのルートを作成します。  

`<LoginForm />` コンポーネントはリクエストの情報(URLクエリパラメータ)にアクセスするため `<Suspense>` でラップされています。

`/app/login/page.tsx`
```tsx
import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
```

## NextAuth.js

- [NextAuth.js](https://authjs.dev/reference/nextjs)


NextAuth.jsを利用してアプリケーションに認証機能を追加します。  
NextAuth.js は、セッション管理、サインインとサインアウト、その他の認証に関わる複雑な要素の多くを抽象化します。


## NextAuth.js の設定

ターミナルで次のコマンドを実行して NextAuth.js をインストールします。


```bash
#  Next.js 14 以降と互換性のある beta バージョンの NextAuth.js をインストール
pnpm i next-auth@beta
```

次に、Cookieを暗号化するためのアプリケーションの秘密鍵を生成します

```bash
openssl rand -base64 32
```

`.env` ファイルに生成されたキーを `AUTH_SECRET` として追加します

`.env`
```ini
AUTH_SECRET=your-secret-key
```

### ページオプションの追加

プロジェクトのルートディレクトリに `auth.config.ts` ファイルを作成し、`authConfig` オブジェクトをエクスポートします。  
このオブジェクトには NextAuth.js の設定オプションが含まれます。現時点では pages オプションのみを含みます：

[NextAuthConfig - API Reference| Auth.js](https://authjs.dev/reference/nextjs#nextauthconfig)


※ `satisfies` はオブジェクトが型要件を満たしているかを検査するキーワードです。 `as` のように型を強制的に変換しません。

`/auth.config.ts`
```ts
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
```

#### `pages` オプション

- [pages - NextAuthConfig | Auth.js](https://authjs.dev/reference/nextjs#pages)

`pages` オプションではカスタムのサインイン、サインアウト、エラーページへのルートを指定できます (指定がない場合はNextAuth.jsのデフォルトページとなる)

### ミドルウェアでルートを保護する

まずはルートを保護するロジックを実装します。

`/auth.config.ts`
```ts
import type { NextAuthConfig, Session } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth , request: { nextUrl } }) {
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
  providers: [],
} satisfies NextAuthConfig;
```

#### `callbacks` オプション

- [callbacks - NextAuthConfig | Auth.js](https://authjs.dev/reference/nextjs#callbacks)

認証関連のアクションが実行された際の動作を制御する非同期関数を定義します。

- `authorized` コールバック  
ミドルウェアを使用してリクエストがページへのアクセスを許可されているかを確認するために使用されます。  
  - 引数
    - `auth` にはユーザーの [`Session`](https://authjs.dev/reference/nextjs#session-3) が含まれます
    - `request` には [`NuxtRequest`](https://nextjs.org/docs/app/api-reference/functions/next-request) が含まれます


#### `providers` オプション

- [providers - NextAuthConfig | Auth.js](https://authjs.dev/reference/nextjs#providers)

サインイン用の認証プロバイダー一覧 (Google、Facebook、Twitter、GitHub、メールなど)を指定します(順不同)。  
組み込みプロバイダーのいずれか、またはカスタムプロバイダーを含むオブジェクトを指定できます。

#### ミドルウェアの定義

- [middleware.js | NEXT.js](https://nextjs.org/docs/app/api-reference/file-conventions/middleware)

ミドルウェアを作成します。 `middleware.ts` というファイルを作成し、`authConfig` オブジェクトをインポートします。


`/middleware.ts`
```ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// NextAuth(): https://authjs.dev/reference/nextjs#default-13
//   - auth: https://authjs.dev/reference/nextjs#auth-1
export default NextAuth(authConfig).auth;

export const config = {
  // matcher: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcherにマッチするパスに対してミドルウェアが実行されます
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  runtime: 'nodejs',
}
```

ここでは、`authConfig` オブジェクトで [`NextAuth`](https://authjs.dev/reference/nextjs#default-13) を初期化し、 [`auth`](https://authjs.dev/reference/nextjs#auth-1) プロパティをエクスポートしています。  

`auth` プロパティはそのままミドルウェアとして使用できます。

また、Middleware の matcher オプションを使用して、特定のパスで実行されるように指定しています。

ミドルウェアは検証が完了するまではレンダリングを開始しないので、認証においてアプリのセキュリティとパフォーマンスの向上が期待できます。


### パスワードハッシュ


データベースの初期化時には、 `bcrypt` というパッケージを使用してユーザーのパスワードをハッシュ化し、データベースに保存しました。
この章の後半では、ユーザーが入力したパスワードがデータベース内のものと一致するか比較するために、再びこのパッケージを使用します。  
ただし、bcryptパッケージ用に別途ファイルを作成する必要があります。これは、`bcrypt` がNext.jsのミドルウェアでは利用できないNode.js APIに依存しているためです。


`auth.config.ts` ファイルに定義した `authConfig` を拡張するために、新しく `auth.ts` ファイルを作成します。

`/auth.ts`
```ts
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
```

### `Credentials` プロバイダの追加

次に、 `NextAuth.js`  の `providers` オプションを追加します。
`providers` は Google や GitHub といったログインオプションを配列で定義できますが、今回は、 `Credentials` プロバイダーのみに焦点を当てます。

※ `Credentials` プロバイダーは、ユーザー名とパスワードでログインすることを可能にします。

`providers` オプションには以下の選択肢があります

- [Credentials](https://authjs.dev/getting-started/authentication/credentials)
- [OAuth](https://authjs.dev/getting-started/authentication/oauth)
- [email](https://authjs.dev/getting-started/authentication/email)


`/auth.ts`
```ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';  // 追加
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({})],  // 追加
});
```


### サインイン機能の追加

認証ロジックの実装は `authorize` 関数に行います。


`/auth.ts`
```ts
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

```


### ログインフォームの更新

認証ロジックをログインフォームに接続します。  
`actions.ts` ファイルに `authenticate` という新しいアクションを作成します。このアクションは `auth.ts` で生成した `signIn` 関数を利用してログイン処理を行います。

- [signIn - NextAuthResult | Auth.js](https://authjs.dev/reference/nextjs#signin-2)
  - 引数
    - `provider` : [`ProviderId`](https://authjs.dev/reference/core/providers#providerid) 
    - `options` : `FormData`
- [errors | Auth.js](https://authjs.dev/reference/core/errors)

`/app/lib/actions.ts`
```ts
'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    // error | Auth.js: https://authjs.dev/reference/core/errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
```

最後に、 `login-form.tsx` コンポーネントで `useActionState` を使用して、 `authenticate` サーバーアクションからフォームアクションを生成し、フォームに設定します。  
同時にフォームの状態管理も行います。

`/app/ui/login-form.tsx`
```tsx
'use client';  // useActionStateフックを利用するのでクライアントコンポーネントにする
 
// ...
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
 
export default function LoginForm() {
  // URLクエリパラメータからリダイレクト先のURLを取得
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  // ステートオブジェクトとフォームアクションを生成
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
 
  return (
    <form action={formAction} className="space-y-3"> {/* フォームアクションを設定 */}
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          {/* ... */}
        </div>
        {/* type=hidden で redirectTo パラメータを追加 */}
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        {/* aria-disabled={isPending} で処理中はボタンを押せなくする */}
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* ステートのエラーメッセージを表示 */}
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
```

## ログアウト機能の追加



`<SideNav />` にログアウト機能を追加するには、`<form>` 要素内で `auth.ts` の `signOut` 関数を呼び出します

- [signOut - NextAuthResult | Auth.js](https://authjs.dev/reference/nextjs#signout-1)
  - 引数
    - `options` : `{ redirect: R; redirectTo: string; }`

`/ui/dashboard/sidenav.tsx`
```tsx
// ...
import { signOut } from '@/auth';
 
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      // ...
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {/* action で signOut関数を実行 */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
```


## 動作確認

- http://localhost:3000/login
- メールアドレス: `user@nextmail.com`
- パスワード: `123456`

![img](img/15_login.png)

ログイン失敗

![img](img/15_invalid_credentials.png)