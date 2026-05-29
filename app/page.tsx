'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { PortfolioItem, PortfolioInsert } from '@/types/database'
import PortfolioTable from './components/PortfolioTable'
import PortfolioModal from './components/PortfolioModal'

export default function Home() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('데이터를 불러오는 중 오류가 발생했습니다: ' + error.message)
    } else {
      setItems(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  async function handleSubmit(data: PortfolioInsert) {
    if (editItem) {
      const { error } = await supabase
        .from('portfolio')
        .update(data)
        .eq('id', editItem.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('portfolio').insert(data)
      if (error) throw error
    }
    await fetchItems()
  }

  async function confirmDelete() {
    if (!deleteId) return
    const { error } = await supabase.from('portfolio').delete().eq('id', deleteId)
    if (error) {
      setError('삭제 중 오류가 발생했습니다.')
    } else {
      await fetchItems()
    }
    setDeleteId(null)
  }

  function openAdd() {
    setEditItem(null)
    setModalOpen(true)
  }

  function openEdit(item: PortfolioItem) {
    setEditItem(item)
    setModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <h1 className="text-base font-bold tracking-tight">Stock Dashboard</h1>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-900/30"
          >
            <span className="text-lg leading-none">+</span>
            종목 추가
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">내 포트폴리오</h2>
          <p className="text-gray-400 text-sm mt-1">보유 주식 종목을 관리하세요</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-900/30 border border-red-800 rounded-xl text-red-300 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <PortfolioTable items={items} onEdit={openEdit} onDelete={setDeleteId} />
        )}
      </div>

      {/* Add/Edit modal */}
      <PortfolioModal
        isOpen={modalOpen}
        editItem={editItem}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* Delete confirm dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="text-lg font-semibold text-white mb-2">종목을 삭제하시겠습니까?</h3>
            <p className="text-gray-400 text-sm mb-6">이 작업은 되돌릴 수 없습니다.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
