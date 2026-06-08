'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import api from '@/lib/api'
import Header from '../components/Header'
import TaskCard from '../components/TaskCard'
import { RefreshCw, Mic } from 'lucide-react'
import Link from 'next/link'
import { Task } from '../types'

export default function DashboardPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/')
      return
    }
    fetchTasks()
  }, [])

  async function fetchTasks() {
    setLoading(true)
    try {
      const { data } = await api.get('/api/tasks')
      setTasks(data)
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        Cookies.remove('token')
        router.push('/')
      }
    } finally {
      setLoading(false)
    }
  }

  const pending = tasks.filter(t => t.status === 'PENDING')
  const done = tasks.filter(t => t.status === 'DONE')

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">

        <Link
          href="/audio"
          className="flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl py-5 transition-colors"
        >
          <Mic size={22} />
          <span className="font-medium">Gravar novo áudio</span>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold text-xl">Suas tarefas</h2>
            <p className="text-zinc-500 text-sm mt-0.5">
              {tasks.length} tarefa{tasks.length !== 1 ? 's' : ''} no total
            </p>
          </div>
          <button
            onClick={fetchTasks}
            className="text-zinc-400 hover:text-white transition-colors"
            title="Atualizar"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500">Nenhuma tarefa ainda.</p>
            <p className="text-zinc-600 text-sm mt-1">Grave um áudio para começar.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {pending.length > 0 && (
              <section className="flex flex-col gap-3">
                <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
                  Pendentes · {pending.length}
                </h3>
                {pending.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </section>
            )}
            {done.length > 0 && (
              <section className="flex flex-col gap-3">
                <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
                  Concluídas · {done.length}
                </h3>
                {done.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </section>
            )}
          </div>
        )}

      </main>
    </div>
  )
}