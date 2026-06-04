'use client'

import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { LogOut } from 'lucide-react'

export default function Header() {
  const router = useRouter()

  function handleLogout() {
    Cookies.remove('token')
    router.push('/')
  }

  return (
    <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-white font-bold text-lg tracking-tight">EchoBrief</h1>
        <p className="text-zinc-500 text-xs">seu assistente de voz</p>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors"
      >
        <LogOut size={16} />
        Sair
      </button>
    </header>
  )
}