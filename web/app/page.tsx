'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import PA9Logo from './components/PA9Logo'

export default function Home() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dpr = window.devicePixelRatio || 1
      const mousePos = {
        x: e.clientX * dpr,
        y: e.clientY * dpr
      }
      // Обновляем позицию мыши в Canvas через глобальное событие
      window.dispatchEvent(new CustomEvent('dither-mousemove', {
        detail: mousePos
      }))
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="scroll-container">
      {/* Hero Section - Full Screen */}
      <section className="section relative flex flex-col items-center justify-center">

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

        {/* Central Content - Direct on Background */}
        <div className="relative z-[2] w-full max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24 text-center pointer-events-none">
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 pointer-events-none select-none">
            Система моделирования<br />технических систем
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light pointer-events-none select-none">
            Программный комплекс для моделирования динамики технических систем различной физической природы.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            <Link href="/pa9" className="btn-primary">
            Запустить PA9 Online
          </Link>
            <Link href="/research" className="btn-secondary">
              Узнать больше
            </Link>
          </div>
        </div>
      </section>

      {/* Что такое PA9 */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="relative w-full rounded-3xl overflow-hidden border border-white/20 pointer-events-auto h-full">
              <Image
                src="/pa9-monitors.png"
                alt="Интерфейс PA9 - два монитора с схемами и графиками"
                width={800}
                height={600}
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="space-y-6">
              <h2 className="section-title text-left select-none">Что такое PA9</h2>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                PA9 — это программная система схемного моделирования, предназначенная для построения и исследования динамических моделей технических систем.
                Она позволяет создавать математические модели в графическом виде, соединяя элементы схемы и задавая параметры взаимодействия между ними.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Каждому элементу схемы соответствует математическая модель, на основе которой система выполняет численный расчёт процессов во времени. Результаты моделирования отображаются в виде графиков и позволяют анализировать поведение системы и её параметры.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                PA9 используется для научных исследований, инженерных расчётов и обучения методам математического моделирования.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Кто создал и когда */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <h2 className="section-title text-left select-none">Кто создал и когда</h2>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                PA9 — система моделирования сложных технических объектов, разработанная в Московском государственном техническом университете имени Н. Э. Баумана.
                Авторами программного комплекса являются И. П. Норенков, М. Ю. Уваров и В. А. Трудоношин. Описание системы было опубликовано в 2006 году.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                PA9 предназначена для построения и исследования моделей технических систем различной физической природы. Система позволяет создавать схемные модели объектов, выполнять математические расчёты и анализировать динамику процессов во времени.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Программный комплекс используется в научной и образовательной деятельности при изучении методов математического моделирования, а также при выполнении инженерных и исследовательских задач.
              </p>
            </div>
            <div className="relative w-full rounded-3xl overflow-hidden border border-white/20 pointer-events-auto h-full">
              <Image
                src="/kto.png"
                alt="Схема PA9 - Гидравлический подъемник"
                width={800}
                height={600}
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Модули */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">Модули</h2>
          <div className="modules-grid pointer-events-auto">
            {[
              { name: 'Electro', desc: 'Электротехника', backDesc: 'Модуль предназначен для моделирования электрических цепей и электросистем. Позволяет анализировать взаимодействие источников питания, нагрузок и электрических компонентов.' },
              { name: 'Hydro', desc: 'Гидравлика', backDesc: 'Используется для моделирования гидравлических систем и процессов движения жидкости. Применяется для анализа насосов, трубопроводов и гидравлических приводов.' },
              { name: 'Mechan', desc: 'Механика', backDesc: 'Предназначен для моделирования механических систем и динамики механизмов. Позволяет исследовать движение тел, силы взаимодействия и кинематические связи.' },
              { name: 'Thermo', desc: 'Термодинамика', backDesc: 'Модуль используется для анализа тепловых и термодинамических процессов. Позволяет моделировать теплообмен, температурные режимы и энергетические процессы.' },
              { name: 'ElMash', desc: 'Электроприводы', backDesc: 'Модуль предназначен для моделирования электрических машин и систем электропривода. Используется при исследовании работы двигателей и их взаимодействия с нагрузкой.' },
              { name: 'Opti', desc: 'Оптимизация', backDesc: 'Модуль оптимизации параметров моделей и технических систем. Позволяет находить оптимальные решения при проектировании и исследовании процессов.' },
            ].map((m) => (
              <ModuleCard key={m.name} name={m.name} desc={m.desc} backDesc={m.backDesc} />
            ))}
          </div>
        </div>
      </section>

      {/* Зачем используется */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">Зачем используется</h2>
            <div className="grid md:grid-cols-3 gap-8 pointer-events-auto">
            {[
                { title: 'Моделирование', desc: 'Создание математических моделей технических систем различной физической природы.\nПозволяет исследовать динамику механических, электрических, гидравлических и тепловых процессов, а также анализировать взаимодействие элементов сложных инженерных систем.' },
                { title: 'Расчёт', desc: 'Выполнение численных расчётов и анализ переходных процессов в моделируемых системах.\nСистема позволяет исследовать статические и динамические режимы работы, рассчитывать параметры и изучать устойчивость технических объектов.' },
                { title: 'Оптимизация', desc: 'Подбор оптимальных параметров моделей и технических систем.\nИспользуется для повышения эффективности работы оборудования, уменьшения энергетических потерь и улучшения характеристик инженерных процессов.' },
            ].map((item) => (
                <div key={item.title} className="usage-card p-8 select-none">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/80 leading-relaxed whitespace-pre-line">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Где применяется */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">Где применяется</h2>
          <div className="grid md:grid-cols-2 gap-8 pointer-events-auto">
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Образование</h3>
              <p className="text-white/80 leading-relaxed whitespace-pre-line">
                Используется в учебном процессе при подготовке инженеров и исследователей.
                Применяется при выполнении курсовых и дипломных проектов, а также в лабораторных работах по теории механизмов и машин, моделированию технических систем, электроприводу, гидравлике и другим инженерным дисциплинам.
              </p>
            </div>
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Исследования</h3>
              <p className="text-white/80 leading-relaxed whitespace-pre-line">
                Используется в научной деятельности для моделирования и анализа сложных технических процессов.
                Применяется при подготовке магистерских и кандидатских диссертаций, проведении научных исследований, а также при публикации результатов в научных журналах и на конференциях.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section relative flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 drop-shadow-lg select-none">
            Готовы попробовать?
          </h2>
          <p className="text-xl text-white/90 mb-12 drop-shadow-md select-none">
            Запустите PA9 в браузере без установки Java.
          </p>
          <div className="pointer-events-auto">
            <Link href="/pa9" className="glass-btn">
            Запустить PA9 Online
          </Link>
          </div>
        </div>
      </section>

      {/* Footer - в конце scroll-container */}
      <footer className="bg-black/20 backdrop-blur-md py-12 relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-sm text-white/60 text-center">
          © {new Date().getFullYear()} PA9
        </div>
      </footer>
    </div>
  )
}

function ModuleCard({ name, desc, backDesc }: { name: string; desc: string; backDesc: string }) {
  const [flip, setFlip] = useState(false)

  return (
    <div className="module-card" onClick={() => setFlip(!flip)}>
      <div className={`module-inner ${flip ? "flipped" : ""}`}>
        <div className="module-front">
          <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
          <p className="text-white/70">{desc}</p>
        </div>
        <div className="module-back">
          <p className="text-white/90 text-sm leading-relaxed">{backDesc}</p>
        </div>
      </div>
    </div>
  )
}
