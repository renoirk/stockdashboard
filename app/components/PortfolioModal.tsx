'use client'

import { useState, useEffect } from 'react'
import type { PortfolioItem, PortfolioInsert } from '@/types/database'

interface Props {
  isOpen: boolean
  editItem: PortfolioItem | null
  onClose: () => void
  onSubmit: (data: PortfolioInsert) => Promise<void>
}

const empty: PortfolioInsert = {
  ticker: '',
  name: '',
  quantity: 0,
  avg_price: 0,
  notes: '',
}

export default function PortfolioModal({ isOpen, editItem, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<PortfolioInsert>(empty)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editItem) {
      setForm({
        ticker: editItem.ticker,
        name: editItem.name,
        quantity: editItem.quantity,
        avg_price: editItem.avg_price,
        notes: editItem.notes ?? '',
      })
    } else {
      setForm(empty)
    }
    setError('')
  }, [editItem, isOpen])

  if (!isOpen) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'avg_price' ? Number(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.ticker.trim() || !form.name.trim()) {
      setError('종목코드와 종목명은 필수입니다.')
      return
    }
    if (form.quantity <= 0 || form.avg_price <= 0) {
      setError('수량과 평균가는 0보다 커야 합니다.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await onSubmit(form)
      onClose()
    } catch {
      setError('저장 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            {editItem ? '종목 수정' : '종목 추가'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs text-gray-400 mb-1 block">종목코드 *</span>
              <input
                name="ticker"
                value={form.ticker}
                onChange={handleChange}
                placeholder="예: 005930"
                className="input-field font-mono uppercase"
              />
            </label>
            <label className="block">
              <span className="text-xs text-gray-400 mb-1 block">종목명 *</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="예: 삼성전자"
                className="input-field"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs text-gray-400 mb-1 block">보유수량 *</span>
              <input
                name="quantity"
                type="number"
                min="0"
                step="0.0001"
                value={form.quantity || ''}
                onChange={handleChange}
                placeholder="0"
                className="input-field text-right"
              />
            </label>
            <label className="block">
              <span className="text-xs text-gray-400 mb-1 block">매수평균가 (₩) *</span>
              <input
                name="avg_price"
                type="number"
                min="0"
                step="0.01"
                value={form.avg_price || ''}
                onChange={handleChange}
                placeholder="0"
                className="input-field text-right"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">메모</span>
            <textarea
              name="notes"
              value={form.notes ?? ''}
              onChange={handleChange}
              placeholder="선택사항"
              rows={2}
              className="input-field resize-none"
            />
          </label>

          {error && (
            <p className="text-sm text-red-400 bg-red-900/20 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
            >
              {loading ? '저장 중…' : editItem ? '수정 완료' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
