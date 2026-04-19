'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import PA9Logo from '../components/PA9Logo'

export default function ResearchPage() {
  // Обработчик мыши для Dither фона
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

      {/* Hero */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 md:px-12 pointer-events-none w-full text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-6 drop-shadow-lg select-none">
            Исследования
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md select-none">
            Научная работа магистрантов и аспирантов под руководством профессора Маничева. Решение прикладных задач с использованием PA9.
          </p>
        </div>
      </section>

      {/* О программном комплексе */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">О программном комплексе ПА9</h2>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Программный комплекс анализа динамических систем ПА9 является современным универсальным средством анализа технических систем путем математического моделирования их работы. Он позволяет определять процессы в проектируемых и потому физически еще не существующих устройствах и показатели их качества.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Программный комплекс позволяет анализировать устройства любой, в том числе и смешанной физической природы практически неограниченной сложности, если устройство может быть описано системой обыкновенных дифференциальных уравнений.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Пользователь избавляется от необходимости составления и решения систем уравнений, поскольку язык описания устройств максимально приближен к языку описания устройств, используемым проектировщиком.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Адаптированный к области машиностроения программный комплекс позволяет с высокой надежностью, достоверностью и малыми затратами времени рассчитывать детали машин, машины в целом на долговечность по условиям прочности.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Математическое моделирование */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">Математическое моделирование технических систем</h2>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="relative w-full rounded-3xl overflow-hidden border border-white/20 pointer-events-auto h-full">
              <Image
                src="/mat.jpg"
                alt="Математическое моделирование"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Объект математического моделирования должен быть описан в его математической модели с полнотой достаточной для того, чтобы задача моделирования была определенной. Качественная определенность задачи моделирования обеспечивается заданием структуры объекта.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Структура объекта определяется наличием тех или иных структурных элементов объекта и связей между ними. В данной версии программного комплекса ПА9 структурные элементы представлены в виде типовых конструктивных элементов машиностроительных объектов.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Для выявления структуры объекта моделирования необходимо выполнить его структурный анализ. При этом объект расчленяется на элементы, с выявлением связей между ними.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Структурный анализ и топология */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">Структурный анализ и топология</h2>
          <div className="grid md:grid-cols-3 gap-8 pointer-events-auto">
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Структурные элементы</h3>
              <p className="text-white/80 leading-relaxed">
                Для объектов механической природы каждая связь соответствует координате одно-, двух или трёхмерного пространства, по которой взаимодействуют элементы. Структура объекта находит своё отражение в топологическом представлении объекта.
              </p>
            </div>
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Топология объекта</h3>
              <p className="text-white/80 leading-relaxed">
                Топология объекта — совокупность графических образов математических моделей, соединённых друг с другом с помощью связей. Каждая математическая модель представляет собой в общем случае многополюсник, каждый полюс которого соответствует координате пространства.
              </p>
            </div>
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Узлы топологии</h3>
              <p className="text-white/80 leading-relaxed">
                Соединение полюсов моделей образуют узлы топологии. Узел топологии соответствует той же координате пространства, что и координаты полюсов моделей, подключённых к узлу. Количественная определённость задачи моделирования обеспечивается заданием параметров моделей.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* О кафедре */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">О кафедре</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Кафедра теории механизмов и машин ведёт научную и учебную работу в области математического моделирования динамики технических систем. PA9 используется в курсовом и дипломном проектировании, в магистерских и кандидатских диссертациях.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Под руководством профессора Маничева магистранты решают задачи моделирования электромеханических приводов, гидравлических систем, механизмов с переменной структурой.
              </p>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md select-none">
                Настоящее пособие предназначено для практического освоения комплекса путем решения ряда предлагаемых задач из области физики, теоретической механики, теории механизмов и машин, машиностроения.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 pointer-events-auto">
              <Image
                src="/kaf.jpg"
                alt="Лаборатория кафедры"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Направления исследований */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">Направления исследований</h2>
          <div className="grid md:grid-cols-2 gap-8 pointer-events-auto">
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Математическое моделирование</h3>
              <p className="text-white/80 leading-relaxed">
                Построение и анализ моделей технических систем. Численное интегрирование. Верификация на экспериментальных данных. Модули Electro, Hydro, Mechan, Thermo, ElMash. Определение необходимой мощности двигателя привода, затраты энергии во всех элементах, работа которых связана с диссипацией энергией.
              </p>
            </div>
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Оптимизация и синтез</h3>
              <p className="text-white/80 leading-relaxed">
                Оптимизация параметров приводов и механизмов. Синтез законов управления. Минимизация энергопотребления и массогабаритных показателей. Модуль Opti. Расчёт профилей кулачков в устройствах с приводом от кулачковых механизмов, определение точности механизмов.
              </p>
            </div>
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Расчёт характеристик</h3>
              <p className="text-white/80 leading-relaxed">
                Определение коэффициента полезного действия, коэффициента мощности двигателя переменного тока, статических и динамических нагрузок в различных системах, включая и статически неопределимые. Расчёт деталей машин, машины в целом на долговечность по условиям прочности.
              </p>
            </div>
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Визуализация результатов</h3>
              <p className="text-white/80 leading-relaxed">
                Использование индикаторов потока, потенциала и интеграла потенциала для вывода горизонтальных, вертикальных сил или моментов в элементах механизма. Вывод радиальных сил в шарнирах, угловых скоростей и перемещений элементов механизма.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Примеры задач */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">Примеры задач</h2>
          <div className="grid md:grid-cols-2 gap-8 pointer-events-auto">
            <div className="usage-card p-10 select-none">
              <div className="scrollable-content">
                <h3 className="text-xl font-semibold text-white mb-4">Электромеханические приводы</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Динамика приводов с асинхронными и синхронными двигателями. Переходные процессы, нагрузки на механическую часть. Модули Electro, ElMash, Mechan. Анализ переходных процессов при пуске и остановке, исследование влияния параметров двигателя на характеристики системы.
                </p>
                <h3 className="text-xl font-semibold text-white mb-4">Гидравлические системы</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Гидроприводы, насосные станции, системы охлаждения. Пульсации давления, кавитация, потери в трубопроводах. Модуль Hydro. Моделирование работы гидравлических систем с учётом нелинейных характеристик насосов и гидроцилиндров.
                </p>
              </div>
            </div>
            <div className="usage-card p-10 select-none">
              <div className="scrollable-content">
                <h3 className="text-xl font-semibold text-white mb-4">Термодинамические процессы</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Тепловые режимы машин и агрегатов. Термодинамические циклы. Оценка потерь и КПД. Модуль Thermo. Анализ тепловых процессов в различных элементах технических систем, определение оптимальных режимов работы.
                </p>
                <h3 className="text-xl font-semibold text-white mb-4">Механические системы</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Моделирование механизмов с переменной структурой, четырёхзвенников, кулачковых механизмов. Анализ кинематических и динамических характеристик. Определение моментов трения в шарнирах, радиальных сил, угловых скоростей и перемещений элементов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Методы численного интегрирования */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">Методы численного интегрирования</h2>
          <div className="grid md:grid-cols-2 gap-8 pointer-events-auto">
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Метод Эйлера</h3>
              <p className="text-white/80 leading-relaxed">
                Используется для численного интегрирования систем обыкновенных дифференциальных уравнений. Позволяет определять процессы во времени с заданной точностью. Параметры интегрирования: время интегрирования, минимальный шаг (Smn), стабильный шаг (Sst), максимальный шаг (Smx).
              </p>
            </div>
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Параметры точности</h3>
              <p className="text-white/80 leading-relaxed">
                Настройка параметров точности интегрирования: Dli (начальный шаг), Dlu (максимальный шаг). Верификация результатов на экспериментальных данных. Анализ устойчивости численных методов при решении различных классов задач.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Индикаторы и визуализация */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">Индикаторы и визуализация результатов</h2>
          <div className="grid md:grid-cols-3 gap-8 pointer-events-auto">
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Индикатор потока</h3>
              <p className="text-white/80 leading-relaxed">
                Выводит моменты трения в шарнирах, горизонтальные и вертикальные силы в элементах механизма. Позволяет анализировать динамические нагрузки в различных точках системы. Настройка верхних и нижних пределов, автокорректировка пределов.
              </p>
            </div>
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Индикатор потенциала</h3>
              <p className="text-white/80 leading-relaxed">
                Выводит горизонтальные, вертикальные или угловые скорости элементов механизма в зависимости от места установки индикатора. Используется для анализа кинематических характеристик системы.
              </p>
            </div>
            <div className="usage-card p-10 select-none">
              <h3 className="text-xl font-semibold text-white mb-4">Универсальный индикатор</h3>
              <p className="text-white/80 leading-relaxed">
                Позволяет выводить не только фазовые переменные (ФП), но и расчётные переменные моделей. Например, радиальная сила в шарнире определяется через проекции радиальной силы на координатные оси путём извлечения квадратного корня из суммы квадратов проекций ФП.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Практические задачи */}
      <section className="section relative flex flex-col items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="section-title mb-16 text-center select-none">Практические задачи</h2>
          <div className="pointer-events-auto">
            <div className="usage-card p-10 select-none">
              <div className="scrollable-content">
                <h3 className="text-xl font-semibold text-white mb-4">Моделирование механизмов</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Построение моделей четырёхзвенников, кулачковых механизмов, механизмов с переменной структурой. Анализ кинематических и динамических характеристик. Исследование влияния параметров трения (коэффициент KTR) и зазоров (параметр Z) на поведение системы.
                </p>
                <h3 className="text-xl font-semibold text-white mb-4">Анализ переходных процессов</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Исследование переходных процессов при изменении параметров системы. Сравнение результатов моделирования при различных значениях коэффициента трения и зазоров в шарнирах. Анализ влияния параметров на динамику механизма.
                </p>
                <h3 className="text-xl font-semibold text-white mb-4">Верификация моделей</h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Сравнение результатов моделирования с экспериментальными данными. Проверка соответствия математической модели реальному объекту. Корректировка параметров моделей для повышения точности расчётов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section relative flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto px-6 md:px-12 pointer-events-none w-full">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 drop-shadow-lg select-none">
            Готовы начать исследование?
          </h2>
          <p className="text-xl text-white/90 mb-12 drop-shadow-md select-none">
            Запустите PA9 в браузере и начните моделирование технических систем.
          </p>
          <div className="pointer-events-auto">
            <Link href="/pa9" className="glass-btn">
              Запустить PA9 Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
