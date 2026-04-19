'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import PA9Logo from '../components/PA9Logo'

// API идёт через тот же origin (Next.js проксирует /api на backend)
//
// Важно: noVNC должен грузиться ТОЛЬКО через nginx по HTTPS на этом же домене,
// иначе браузер на https:// заблокирует iframe (Mixed Content).
const VNC_PATH = process.env.NEXT_PUBLIC_VNC_URL || '/novnc/vnc.html'

function getVncUrl(): string {
  // Возвращаем относительный путь, чтобы работало и локально (через nginx),
  // и на сервере (через nginx + certbot HTTPS).
  const base = VNC_PATH
  // Добавляем параметры подключения к VNC
  // Важно: WebSocket должен проксироваться через тот же путь /novnc/
  const params = new URLSearchParams({
    resize: 'scale',
    autoconnect: 'true'
  })
  // Используем относительный путь для WebSocket, чтобы он проходил через тот же прокси
  const url = base.includes('?') ? `${base}&${params.toString()}` : `${base}?${params.toString()}`
  return url
}

interface FileInfo {
  name: string
  size: number
}

export default function PA9Page() {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [workspacePath] = useState('/workspace')
  const [status, setStatus] = useState<'idle' | 'copied' | 'uploading'>('idle')
  const [uploadMsg, setUploadMsg] = useState('')
  const [showHelp, setShowHelp] = useState(true)
  const [vncUrl, setVncUrl] = useState('')
  const [vncError, setVncError] = useState<string | null>(null)
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Обработчик мыши для Dither фона
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dpr = window.devicePixelRatio || 1
      const mousePos = {
        x: e.clientX * dpr,
        y: e.clientY * dpr
      }
      window.dispatchEvent(new CustomEvent('dither-mousemove', {
        detail: mousePos
      }))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const url = getVncUrl()
    setVncUrl(url)
    setVncError(null)
    
    // Проверяем доступность VNC через 3 секунды
    const checkTimer = setTimeout(() => {
      if (iframeRef.current) {
        try {
          // Пытаемся проверить доступность через fetch
          fetch(url.replace('/novnc/vnc.html', '/novnc/'))
            .then(() => setVncError(null))
            .catch(() => setVncError('Не удалось подключиться к PA9. Проверьте, что контейнер pa9-gui запущен.'))
        } catch {
          setVncError('Не удалось подключиться к PA9. Проверьте, что контейнер pa9-gui запущен.')
        }
      }
    }, 3000)
    
    return () => clearTimeout(checkTimer)
  }, [])

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    try {
      const res = await fetch(`/api/files`)
      if (res.ok) {
        const data = await res.json()
        setFiles(data.files || [])
      }
    } catch {
      /* silent */
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ext = file.name.toLowerCase().slice(-4)
    if (ext !== '.pa9') {
      setUploadMsg('Разрешены только файлы .pa9')
      e.target.value = ''
      setTimeout(() => setUploadMsg(''), 3000)
      return
    }

    setStatus('uploading')
    setUploadMsg('')
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch(`/api/upload`, { method: 'POST', body: formData })
      if (res.ok) {
        setUploadMsg(`Файл ${file.name} загружен. Ниже откройте его в PA9.`)
        loadFiles()
      } else {
        const err = await res.json()
        setUploadMsg(err.error || 'Ошибка загрузки')
      }
    } catch {
      setUploadMsg('Сервер недоступен. Запустите Docker.')
    } finally {
      setStatus('idle')
      e.target.value = ''
      setTimeout(() => setUploadMsg(''), 5000)
    }
  }

  const handleDownload = (name: string) => {
    const url = `/api/download/${encodeURIComponent(name)}`
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.target = '_blank'
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleDelete = async (name: string) => {
    if (!confirm(`Удалить файл «${name}»?`)) return
    try {
      const res = await fetch(`/api/files/${encodeURIComponent(name)}`, { method: 'DELETE' })
      if (res.ok) {
        loadFiles()
      } else {
        const err = await res.json()
        alert(err.error || 'Ошибка удаления')
      }
    } catch {
      alert('Сервер недоступен')
    }
  }

  const copyPath = () => {
    navigator.clipboard.writeText(workspacePath)
    setStatus('copied')
    setTimeout(() => setStatus('idle'), 2000)
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Floating Glass Navbar */}
      <nav className="glass-navbar pointer-events-auto select-none">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:opacity-70 transition-opacity">
            <PA9Logo className="w-5 h-5" />
            <span className="text-lg font-semibold">PA9</span>
          </Link>
          <div className="flex items-center gap-8 text-[15px] text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              О системе
            </Link>
            <Link href="/pa9" className="hover:text-white transition-colors">
              PA9 Online
            </Link>
            <Link href="/research" className="hover:text-white transition-colors">
              Исследования
            </Link>
          </div>
        </div>
      </nav>

      {/* Верхняя панель — что это и как пользоваться */}
      <div className="shrink-0 px-6 md:px-12 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" aria-hidden />
              <span className="text-sm text-white/80">PA9 запущен</span>
            </div>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="glass-btn text-sm"
            >
              {showHelp ? 'Скрыть подсказку' : 'Показать подсказку'}
            </button>
          </div>

          {showHelp && (
            <div className="mb-8 glass-card p-8 space-y-6">
              <h3 className="text-xl font-semibold text-white">Как работать с файлами</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <p className="font-medium text-white">📂 Открыть файл с компьютера в PA9:</p>
                  <ol className="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
                    <li>Нажмите «Выбрать файл» и выберите .pa9 на диске</li>
                    <li>Файл загрузится в папку /workspace</li>
                    <li>В окне PA9: меню File → Open</li>
                    <li>Введите путь /workspace (или вставьте из поля ниже)</li>
                    <li>Выберите нужный файл</li>
                  </ol>
                </div>
                <div className="space-y-3">
                  <p className="font-medium text-white">💾 Сохранить и управлять:</p>
                  <ol className="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
                    <li>В PA9: File → Save As → путь /workspace, имя файла</li>
                    <li>Нажмите «Обновить» — файл появится в списке</li>
                    <li>Нажмите на имя файла — скачать на компьютер</li>
                    <li>Нажмите ✕ рядом с файлом — удалить лишнее</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <label className="block text-sm font-medium text-white/90 mb-3">
                Открыть файл с компьютера → PA9
              </label>
              <div className="flex items-center gap-3">
                <input
                  ref={uploadInputRef}
                  type="file"
                  accept=".pa9"
                  onChange={handleUpload}
                  className="hidden"
                />
                <button
                  onClick={() => uploadInputRef.current?.click()}
                  disabled={status === 'uploading'}
                  className="glass-btn text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'uploading' ? 'Загрузка…' : 'Выбрать файл'}
                </button>
                <button
                  onClick={loadFiles}
                  className="glass-btn text-sm"
                >
                  Обновить
                </button>
              </div>
              {uploadMsg && (
                <p className={`mt-3 text-sm ${uploadMsg.includes('загружен') ? 'text-green-400' : 'text-amber-400'}`}>
                  {uploadMsg}
                </p>
              )}
            </div>
            <div className="glass-card p-6">
              <label className="block text-sm font-medium text-white/90 mb-3">
                Путь к папке (вставить в PA9: File → Open)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={workspacePath}
                  readOnly
                  className="flex-1 px-4 py-2.5 bg-black/20 backdrop-blur-md border border-white/20 rounded-xl text-sm font-mono text-white"
                />
                <button
                  onClick={copyPath}
                  className="glass-btn text-sm shrink-0"
                >
                  {status === 'copied' ? 'Скопировано' : 'Копировать'}
                </button>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6 glass-card p-6">
              <label className="block text-sm font-medium text-white/90 mb-4">
                Сохранить на компьютер — нажмите на файл:
              </label>
              <ul className="flex flex-wrap gap-3">
                {files.map((f) => (
                  <li key={f.name} className="inline-flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(f.name)}
                      className="glass-btn text-sm inline-flex items-center gap-2"
                    >
                      <span>⬇</span>
                      {f.name}
                    </button>
                    <button
                      onClick={() => handleDelete(f.name)}
                      className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Удалить"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* PA9 */}
      <div className="flex-1 min-h-[600px] p-6 md:p-8">
        <div className="max-w-6xl mx-auto h-full min-h-[500px] glass-card overflow-hidden p-0 relative">
          {vncError && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm rounded-2xl">
              <div className="text-center p-8">
                <p className="text-white text-lg mb-4">{vncError}</p>
                <button
                  onClick={() => {
                    setVncError(null)
                    if (iframeRef.current) {
                      iframeRef.current.src = iframeRef.current.src
                    }
                  }}
                  className="glass-btn"
                >
                  Переподключиться
                </button>
              </div>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={vncUrl || 'about:blank'}
            className="w-full h-full min-h-[500px] border-0 rounded-2xl"
            title="PA9"
            allow="clipboard-read; clipboard-write; fullscreen"
            onError={() => setVncError('Ошибка загрузки VNC. Проверьте, что контейнер pa9-gui запущен.')}
          />
        </div>
      </div>
    </div>
  )
}
