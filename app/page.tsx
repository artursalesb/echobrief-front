'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login'
      const { data } = await api.post(endpoint, { email, password })
      Cookies.set('token', data.token, { expires: 1 })
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Algo deu errado, tenta de novo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">EchoBrief</h1>
          <p className="text-zinc-400 mt-1 text-sm">transforme áudios em tarefas</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-2xl p-6 flex flex-col gap-4 border border-zinc-800">

          <h2 className="text-white font-semibold text-lg">
            {isRegister ? 'Criar conta' : 'Entrar'}
          </h2>

          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="voce@email.com"
              className="bg-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-500 border border-zinc-700"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-sm">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••"
              className="bg-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-500 border border-zinc-700"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium rounded-lg py-2.5 text-sm transition-colors"
          >
            {loading ? 'Aguarda...' : isRegister ? 'Criar conta' : 'Entrar'}
          </button>

          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setError('') }}
            className="text-zinc-400 hover:text-white text-sm transition-colors text-center"
          >
            {isRegister ? 'Já tenho conta' : 'Criar conta'}
          </button>

        </form>
      </div>
    </main>
  )
}