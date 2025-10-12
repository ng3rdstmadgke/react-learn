import { z } from 'zod';

// フォームの検証スキーマ
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

// フォームの状態の型定義
export type SampleState = {
  errors?: {
    name?: string[];
    age?: string[];
  };
}

// フォームのアクション関数
// useActionState フックの第位置引数に渡される関数は、引数として前の状態と FormData オブジェクトを受け取る必要があります
export async function sampleAction(
  prevState: SampleState | undefined,
  formData: FormData
): Promise<SampleState | undefined> {
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
