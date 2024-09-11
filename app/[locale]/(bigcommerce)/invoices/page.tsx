'use client'

import { Api } from "@/app/_api/apiCall"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { useTranslations } from "next-intl"

export default function Home() {
  const [invoice, setInvoice] = useState<Object[]>([])

  const translate = useTranslations('common');

  const getInvoiceList = () => {
    Api('payment/getInvoiceList').then((data: any) => {
      setInvoice(data.list.data)
    })
  }



  useEffect(() => {
    getInvoiceList()
  }, [])
  return (<>
    <div className="content-frame-main">
      <div className="content-frame-head flex justify-content-between align-item-center">
        <div className="content-frameHead-left">
          <h1 className="Text--headingLg flex align-item-center gap-2">
            {translate('invoices')}
          </h1>
        </div>
      </div>
      <div className="add-keywordMain">
        <div className="card">
          <div className="custom-table mt-22">
            <table className="table">
              <thead>
                <tr>
                  <th>{translate('SNo')}</th>
                  <th>{translate('date')}</th>
                  <th>{translate('transactionId')}</th>
                  <th>{translate('amount')}</th>
                  <th>{translate('download')}</th>
                </tr>
              </thead>
              <tbody>
                {invoice.map((item: any, key: any) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{format(item.created_at, 'd LLLL yyyy')}</td>
                    <td>{item.transaction_id}</td>
                    <td>USD {item.total_amount}</td>
                    <td>
                      <a href={`https://app.seokart.com/bigc_app/api/payment/downloadInvoice?invoice_id=${item.id}&shop=${localStorage.getItem('shop')}`}>
                        <button className="btn btn-primary">{translate('download')}</button>
                      </a>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </>)
}