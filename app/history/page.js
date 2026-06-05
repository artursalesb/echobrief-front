'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Header from '../components/Header'
import { Clock } from 'lucide-react'
import api from '@/lib/api'

export default function HistoryPage() {
  const router = useRouter()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/')
      return
    }
    fetchHistory()
  }, [])

  async function fetchHistory() {
    try {
      const { data } = await api.get('/api/history')
      setHistory(data)
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        Cookies.remove('token')
        router.push('/')
      }
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('pt-BR')
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">

        <div>
          <h2 className="text-white font-semibold text-xl">Histórico</h2>
          <p className="text-zinc-500 text-sm mt-0.5">{history.length} registro{history.length !== 1 ? 's' : ''}</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12">
            <Clock size={32} className="text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500">Nenhum áudio processado ainda.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {history.map((item) => (
              <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">

                <span className="text-zinc-500 text-xs">{formatDate(item.createdAt)}</span>

                <div className="flex flex-col gap-1">
                  <span className="text-zinc-500 text-xs uppercase tracking-wider">Transcrição</span>
                  <p className="text-zinc-300 text-sm leading-relaxed">{item.transcription}</p>
                </div>

                <div className="h-px bg-zinc-800" />

                <div className="flex flex-col gap-1">
                  <span className="text-zinc-500 text-xs uppercase tracking-wider">Resposta da IA</span>
                  <p className="text-white text-sm leading-relaxed">{item.reply}</p>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}