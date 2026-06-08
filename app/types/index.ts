export interface Task {
  id: number
  title: string
  description?: string
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'
  category: 'HEALTH' | 'FINANCE' | 'WORK' | 'PERSONAL' | 'SHOPPING' | 'OTHER'
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface HistoryItem {
  id: number
  transcription: string
  reply: string
  createdAt: string
}