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
