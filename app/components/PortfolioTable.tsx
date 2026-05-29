'use client'

import type { PortfolioItem } from '@/types/database'

interface Props {
  items: PortfolioItem[]
  onEdit: (item: PortfolioItem) => void
  onDelete: (id: string) => void
}

function formatNumber(n: number) {
  return n.toLocaleString('ko-KR')
}

export default function PortfolioTable({ items, onEdit, onDelete }: Props) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">보유 종목이 없습니다.</p>
        <p className="text-sm mt-1">종목 추가 버튼을 눌러 포트폴리오를 시작하세요.</p>
      </div>
    )
  }

  const totalValue = items.reduce((sum, i) => sum + i.quantity * i.avg_price, 0)

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">보유 종목 수</p>
          <p className="text-2xl font-bold text-white">{items.length}<span className="text-sm text-gray-400 ml-1">개</span></p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">총 매수금액</p>
          <p className="text-2xl font-bold text-green-400">₩{formatNumber(Math.round(totalValue))}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800 text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-left">종목코드</th>
              <th className="px-4 py-3 text-left">종목명</th>
              <th className="px-4 py-3 text-right">보유수량</th>
              <th className="px-4 py-3 text-right">매수평균가</th>
              <th className="px-4 py-3 text-right">매수금액</th>
              <th className="px-4 py-3 text-left">메모</th>
              <th className="px-4 py-3 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {items.map((item) => (
              <tr
                key={item.id}
                className="bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="inline-block bg-blue-900/50 text-blue-300 text-xs font-mono font-semibold px-2 py-0.5 rounded">
                    {item.ticker}
                  </span>
                </td>
                <td className="px-4 py-3 text-white font-medium">{item.name}</td>
                <td className="px-4 py-3 text-right text-gray-200">{formatNumber(item.quantity)}</td>
                <td className="px-4 py-3 text-right text-gray-200">₩{formatNumber(item.avg_price)}</td>
                <td className="px-4 py-3 text-right text-green-400 font-medium">
                  ₩{formatNumber(Math.round(item.quantity * item.avg_price))}
                </td>
                <td className="px-4 py-3 text-gray-400 max-w-[180px] truncate">{item.notes ?? '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-xs px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-xs px-3 py-1 rounded-lg bg-red-900/40 hover:bg-red-900/70 text-red-400 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
