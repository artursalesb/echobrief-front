import { Task } from '../types'

const statusLabels: Record<string, string> = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em andamento',
  DONE: 'Concluída',
  CANCELLED: 'Cancelada',
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  IN_PROGRESS: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  DONE: 'bg-green-500/10 text-green-400 border-green-500/20',
  CANCELLED: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
}

const categoryLabels: Record<string, string> = {
  HEALTH: 'Saúde',
  FINANCE: 'Finanças',
  WORK: 'Trabalho',
  PERSONAL: 'Pessoal',
  SHOPPING: 'Compras',
  OTHER: 'Outro',
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-white text-sm font-medium">{task.title}</span>
        {task.description && (
          <span className="text-zinc-500 text-xs">{task.description}</span>
        )}
        <span className="text-zinc-600 text-xs">
          {categoryLabels[task.category] || task.category}
        </span>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full border whitespace-nowrap ${statusColors[task.status]}`}>
        {statusLabels[task.status] || task.status}
      </span>
    </div>
  )
}