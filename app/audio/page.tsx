'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import AudioRecorder from '../components/AudioRecorder'
import ResultCard from '../components/ResultCard'
import api from '@/lib/api'

export default function AudioPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  async function handleAudioReady(audioBlob) {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', audioBlob, 'audio.webm')

      const { data } = await api.post('/api/ai/audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setResult(data)
    } catch (err) {
      setError('Erro ao processar o áudio. Tenta de novo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-white font-semibold text-xl">Gravar áudio</h2>
            <p className="text-zinc-500 text-sm">fale suas tarefas e a IA organiza</p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <AudioRecorder onAudioReady={handleAudioReady} />
        </div>

        {loading && (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-400 text-sm">Transcrevendo e processando...</p>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-4 py-3">{error}</p>
        )}

        {result && <ResultCard result={result} />}

      </main>
    </div>
  )
}