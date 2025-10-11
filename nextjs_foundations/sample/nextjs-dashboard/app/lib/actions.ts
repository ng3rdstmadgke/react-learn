'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),  // https://zod.dev/api?id=strings
  amount: z.coerce.number(),  // 入力データを適切な型に強制変換 (https://zod.dev/api?id=coercion)
  status: z.enum(['pending', 'paid']),  // https://zod.dev/api?id=enums
  date: z.string(),
})

// idとdateはサーバー側で生成するため、フォームからは受け取らない (https://zod.dev/api?id=omit)
const CreateInvoice = FormSchema.omit({id: true, date: true})
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // フォームから送信されたデータを検証
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

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${data})
  `;

  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
  redirect('/dashboard/invoices');  // 請求書一覧ページにリダイレクト
}

export async function updateInvoice(id: string, formData: FormData) {
  // フォームから送信されたデータを検証
  // FormData: https://developer.mozilla.org/ja/docs/Web/API/FormData
  const {customerId, amount, status } = UpdateInvoice.parse({
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

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
}