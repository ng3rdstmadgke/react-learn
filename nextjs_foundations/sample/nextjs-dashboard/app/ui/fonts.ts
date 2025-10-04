// next/font/google は Google Fonts を直接使うための Next.js 組み込みモジュール。
// Inter は Google Fonts に登録されている、UI 向けに設計されたモダンなサンセリフ体（ゴシック体）フォント
import { Inter, Lusitana } from 'next/font/google';
// どの文字セット(subsets)を使うかを指定
// latin（英語・西欧言語）
// latin-ext（中央ヨーロッパ言語）
// japanese（Noto Sans JP など）
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });