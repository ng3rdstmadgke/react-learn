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
