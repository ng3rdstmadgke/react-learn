'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { signIn } from '@/auth'
import { AuthError } from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),  // https://zod.dev/api?id=strings
  amount: z.coerce
    .number()  // 入力データを適切な型に強制変換 (https://zod.dev/api?id=coercion)
    // error パラメータ: https://zod.dev/error-customization?id=the-error-param
    .gt(0, {message: 'Please enter an amount greater than $0.'}),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Plese select an invoice status.',
  }),  // https://zod.dev/api?id=enums
  date: z.string(),
})

// idとdateはサーバー側で生成するため、フォームからは受け取らない (https://zod.dev/api?id=omit)
const CreateInvoice = FormSchema.omit({id: true, date: true})
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  // フォームの各フィールドに関連するエラーメッセージを格納する
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  // フォームの全体的な状態や操作の結果に関するメッセージを格納する
  message?: string | null;  
}

export async function createInvoice(
  prevState: State | undefined,
  formData: FormData, // FormData: https://developer.mozilla.org/ja/docs/Web/API/FormData
): Promise<State|undefined> {

  // 各フィールドが正しく入力されているかを検証
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  // 検証に失敗した場合、エラーメッセージを含むオブジェクトを返す
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    }
  }

  const {customerId, amount, status} = validatedFields.data;
  const amountInCents = amount * 100; // 浮動小数点エラーを排除し精度を高めるためにデータベースに通貨値をセント単位で保存
  const data = new Date().toISOString().split("T")[0]; // 請求書の作成日として「YYYY-MM-DD」の形式で新しい日付を作成します

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${data})
    `;
  } catch (error) {
    console.error(error);
    // データベースエラーが発生した場合、エラーメッセージを含むオブジェクトを返す
    return {
      message: 'Database Error: Failed to Create Invoice.'
    }
  }

  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
  redirect('/dashboard/invoices');  // 請求書一覧ページにリダイレクト
}


export async function updateInvoice(
  id: string,
  prevState: State | undefined,
  formData: FormData // FormData: https://developer.mozilla.org/ja/docs/Web/API/FormData
): Promise<State|undefined> {

  // 各フィールドが正しく入力されているかを検証
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  // 検証に失敗した場合、エラーメッセージを含むオブジェクトを返す
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    }
  }

  const {customerId, amount, status} = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Update Invoice.'
    }
  }

  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
  redirect('/dashboard/invoices');  // 請求書一覧ページにリダイレクト
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');  // キャッシュをクリアして、請求書一覧ページを再検証・データを再取得
}


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
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }

}