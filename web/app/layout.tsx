import type { Metadata } from 'next'
import './globals.css'
import DitherWrapper from './components/DitherWrapper'

export const metadata: Metadata = {
  title: 'PA9 — Система моделирования технических систем',
  description: 'Программный комплекс PA9 для моделирования динамики технических систем.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen relative">
        {/* Dither Background - на весь экран */}
        <div className="fixed inset-0 z-0">
          <DitherWrapper
            waveColor={[0.5, 0.5, 0.5]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
            </div>

        {/* Dark Overlay для читаемости текста */}
        <div className="fixed inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/30 to-black/50 pointer-events-none" />

        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
