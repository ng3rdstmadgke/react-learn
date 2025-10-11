import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";

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
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}