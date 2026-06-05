import { CheckCircle } from 'lucide-react'

const categoryLabels = {
  HEALTH: 'Saúde',
  FINANCE: 'Finanças',
  WORK: 'Trabalho',
  PERSONAL: 'Pessoal',
  SHOPPING: 'Compras',
  OTHER: 'Outro',
}

export default function ResultCard({ result }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-4">

      <div className="flex flex-col gap-1">
        <span className="text-zinc-500 text-xs uppercase tracking-wider">Transcrição</span>
        <p className="text-zinc-300 text-sm leading-relaxed">{result.transcription}</p>
      </div>

      <div className="h-px bg-zinc-800" />

      <div className="flex flex-col gap-2">
        <span className="text-zinc-500 text-xs uppercase tracking-wider">Resposta da IA</span>
        <p className="text-white text-sm leading-relaxed">{result.reply}</p>
      </div>

    </div>
  )
}