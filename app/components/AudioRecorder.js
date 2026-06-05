'use client'

import { useState, useRef } from 'react'
import { Mic, Square, Upload } from 'lucide-react'

export default function AudioRecorder({ onAudioReady }) {
  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder
    chunksRef.current = []

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      const url = URL.createObjectURL(blob)
      setAudioBlob(blob)
      setAudioUrl(url)
      stream.getTracks().forEach(t => t.stop())
    }

    mediaRecorder.start()
    setRecording(true)
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAudioBlob(file)
    setAudioUrl(url)
  }

  function handleSend() {
    if (audioBlob) onAudioReady(audioBlob)
  }

  function handleReset() {
    setAudioBlob(null)
    setAudioUrl(null)
  }

  return (
    <div className="flex flex-col gap-6">

      {!audioBlob ? (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={recording ? stopRecording : startRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              recording
                ? 'bg-red-500 hover:bg-red-400 animate-pulse'
                : 'bg-violet-600 hover:bg-violet-500'
            }`}
          >
            {recording ? <Square size={32} color="white" /> : <Mic size={32} color="white" />}
          </button>
          <p className="text-zinc-400 text-sm">
            {recording ? 'Gravando... clique para parar' : 'Clique para gravar'}
          </p>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs">ou</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <label className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm cursor-pointer transition-colors border border-zinc-700 hover:border-zinc-500 rounded-lg px-4 py-2.5">
            <Upload size={16} />
            Enviar arquivo de áudio
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <audio controls src={audioUrl} className="w-full" />
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-lg py-2.5 text-sm transition-colors"
            >
              Gravar de novo
            </button>
            <button
              onClick={handleSend}
              className="flex-1 bg-violet-600 hover:bg-violet-500 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
            >
              Processar com IA
            </button>
          </div>
        </div>
      )}
    </div>
  )
}