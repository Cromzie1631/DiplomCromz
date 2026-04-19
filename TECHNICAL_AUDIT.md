# 🔍 Технический аудит проекта PA9 Online

**Дата аудита:** 2026-03-06  
**Проект:** PA9 Online - Веб-версия PA9  
**Проблема:** `TypeError: Cannot read properties of undefined (reading 'S')` при использовании компонента Dither

---

## 1️⃣ Общая архитектура проекта

### Структура папок
```
web/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Главный layout (SSR)
│   ├── page.tsx           # Главная страница
│   ├── pa9/
│   │   └── page.tsx       # Страница PA9 Online
│   ├── research/
│   │   └── page.tsx       # Страница исследований
│   ├── components/
│   │   └── Dither.tsx     # Компонент анимированного фона
│   └── globals.css
├── server/                 # Express API backend
└── public/
```

### Используется Next.js App Router
- ✅ Да, используется App Router (папка `app/`)
- ✅ Главный layout: `app/layout.tsx`
- ✅ Рендер страниц: Server Components по умолчанию, Client Components с `'use client'`

### Рендер страниц
- **Layout (SSR):** `app/layout.tsx` - серверный компонент
- **Страницы:** Server Components (page.tsx файлы)
- **Dither компонент:** Client Component (`'use client'`) + динамический импорт с `ssr: false`

---

## 2️⃣ SSR / Client компоненты

### Компоненты на сервере
- ✅ `app/layout.tsx` - Server Component (без `'use client'`)
- ✅ `app/page.tsx` - Server Component
- ✅ `app/pa9/page.tsx` - Server Component
- ✅ `app/research/page.tsx` - Server Component

### Client компоненты
- ✅ `app/components/Dither.tsx` - Client Component (`'use client'`)
- ✅ Защита от SSR: `if (typeof window === 'undefined') return null;`
- ✅ Динамический импорт: `dynamic(() => import('./components/Dither'), { ssr: false })`

### WebGL компоненты и SSR
- ✅ **Dither НЕ выполняется на сервере:**
  - Используется `dynamic` с `ssr: false`
  - Проверка `typeof window === 'undefined'`
  - Компонент рендерится только на клиенте

**Вывод:** SSR не является причиной ошибки, так как Dither полностью отключен от SSR.

---

## 3️⃣ Где используется Dither

### Импорт и использование
```tsx
// app/layout.tsx
const Dither = dynamic(() => import('./components/Dither'), {
  ssr: false,
})

// В body:
<Dither
  waveColor={[0.5, 0.5, 0.5]}
  disableAnimation={false}
  enableMouseInteraction
  mouseRadius={0.3}
  colorNum={4}
  waveAmplitude={0.3}
  waveFrequency={3}
  waveSpeed={0.05}
/>
```

### Позиционирование
- ✅ Компонент добавлен в `layout.tsx` (глобально для всех страниц)
- ✅ CSS: `position: fixed; z-index: -1;` (фон)
- ⚠️ **Проблема:** Canvas может рендериться до полной инициализации WebGL контекста

### Порядок инициализации
1. Next.js загружает layout (SSR)
2. На клиенте: динамический импорт Dither
3. Dither создает Canvas
4. Canvas инициализирует WebGL
5. **ПРОБЛЕМА:** `wrapEffect` вызывается в `useEffect`, но может быть вызван до готовности EffectComposer

---

## 4️⃣ Библиотеки и версии

### Установленные версии
```json
{
  "three": "^0.183.2",                    // ✅ Установлено
  "postprocessing": "^6.38.3",            // ✅ Установлено
  "@react-three/fiber": "^9.5.0",         // ✅ Установлено
  "@react-three/postprocessing": "^3.0.4",  // ✅ Установлено
  "react": "^18.2.0",                     // ⚠️ ПРОБЛЕМА
  "next": "14.0.4"                        // ✅ Установлено
}
```

### Фактические версии (из node_modules)
- `react@18.3.1` - **УСТАНОВЛЕНО**
- `three@0.183.2` - ✅
- `postprocessing@6.38.3` - ✅
- `@react-three/fiber@9.5.0` - ✅
- `@react-three/postprocessing@3.0.4` - ✅

### 🔴 КРИТИЧЕСКАЯ ПРОБЛЕМА: Конфликт peerDependencies

**Требования библиотек:**
- `@react-three/fiber@9.5.0` требует: `react >=19 <19.3`
- `@react-three/postprocessing@3.0.4` требует: `react ^19.0`
- **Установлено:** `react@18.3.1`

**Результат:**
```
npm error invalid: react@18.3.1
invalid: ">=19 <19.3" from node_modules/@react-three/fiber
invalid: "^19.0" from node_modules/@react-three/postprocessing
```

**Установка с `--legacy-peer-deps`:**
- ✅ Позволяет установить несовместимые версии
- ⚠️ Может вызывать runtime ошибки из-за несовместимости API

---

## 5️⃣ WebGL / r3f пайплайн

### Canvas
```tsx
<Canvas
  className="dither-container"
  camera={{ position: [0, 0, 6] }}
  dpr={1}
  gl={{ antialias: true, preserveDrawingBuffer: true }}
>
```
- ✅ Корректная настройка Canvas
- ✅ Проверка `typeof window === 'undefined'` перед рендером

### EffectComposer
```tsx
<EffectComposer>
  <RetroEffectComponent 
    ref={retroEffectRef}
    colorNum={colorNum} 
    pixelSize={pixelSize}
  />
</EffectComposer>
```
- ✅ Используется корректно
- ⚠️ **Проблема:** RetroEffectComponent может рендериться до готовности EffectComposer

### Custom Effect (RetroEffectImpl)

#### Класс Effect
```tsx
class RetroEffectImpl extends Effect {
  uniforms: Map<string, THREE.Uniform<any>>;
  constructor() {
    const uniforms = new Map<string, THREE.Uniform<any>>([
      ['colorNum', new THREE.Uniform(4.0)],
      ['pixelSize', new THREE.Uniform(2.0)]
    ]);
    super('RetroEffect', ditherFragmentShader, { uniforms });
    this.uniforms = uniforms;
  }
}
```
- ✅ Наследуется от `Effect` из postprocessing
- ✅ Uniforms определены корректно

#### wrapEffect
```tsx
const RetroEffectComponent = forwardRef(({ colorNum, pixelSize }, ref) => {
  const [wrappedEffect, setWrappedEffect] = useState<any>(null);
  const { gl } = useThree();

  useEffect(() => {
    if (!wrappedEffect && gl && gl.domElement) {
      const timer = setTimeout(() => {
        const Wrapped = wrapEffect(RetroEffectImpl);
        setWrappedEffect(() => Wrapped);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [wrappedEffect, gl]);
  // ...
});
```

**Проблемы:**
1. ⚠️ `wrapEffect` вызывается в `useEffect` с задержкой, но может быть вызван до готовности EffectComposer
2. ⚠️ `wrapEffect` может требовать активного WebGL контекста и готового EffectComposer

### Shader анализ

#### ditherFragmentShader
```glsl
uniform float colorNum;
uniform float pixelSize;
uniform vec2 resolution;  // ⚠️ ПРОБЛЕМА

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;  // ⚠️ resolution не определен
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = inputColor;  // ⚠️ Должно быть texture2D(inputBuffer, ...)
  color.rgb = dither(uv, color.rgb);
  outputColor = color;
}
```

**🔴 КРИТИЧЕСКИЕ ПРОБЛЕМЫ В SHADER:**

1. **`resolution` объявлен как uniform, но не передается:**
   - В конструкторе `RetroEffectImpl` нет uniform для `resolution`
   - В postprocessing `resolution` доступен автоматически через встроенную переменную

2. **`inputColor` используется напрямую:**
   - В postprocessing нужно использовать `texture2D(inputBuffer, uv)`
   - `inputColor` может быть undefined на момент вызова

3. **Синтаксис `mainImage`:**
   - ✅ Правильный: `void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)`
   - ⚠️ Но `inputColor` должен быть получен из `inputBuffer`

---

## 6️⃣ Возможные причины ошибки

### Ошибка: `TypeError: Cannot read properties of undefined (reading 'S')`

#### Гипотеза 1: Несовместимость версий React (НАИБОЛЕЕ ВЕРОЯТНАЯ)

**Причина:**
- `@react-three/fiber@9.5.0` требует React 19
- Установлен React 18.3.1
- Внутренние API React Three Fiber могут обращаться к свойствам React 19, которых нет в React 18

**Доказательства:**
- npm показывает `invalid: react@18.3.1` для всех зависимостей
- Ошибка происходит в `51749ec1-3613e87e38821bb6.js` (скомпилированный код r3f)
- Стек указывает на `isPrimaryRenderer` - внутренний метод React

**Вероятность:** 🔴 **95%**

#### Гипотеза 2: Неправильный shader для postprocessing

**Причина:**
- Shader использует `inputColor` напрямую вместо `texture2D(inputBuffer, uv)`
- `resolution` объявлен как uniform, но не передается
- Postprocessing может не найти нужные переменные в shader

**Доказательства:**
- В shader нет `sampler2D inputBuffer`
- `resolution` используется, но не определен в uniforms
- Postprocessing может падать при компиляции shader

**Вероятность:** 🟡 **60%**

#### Гипотеза 3: wrapEffect вызывается до готовности EffectComposer

**Причина:**
- `wrapEffect` вызывается в `useEffect` после монтирования компонента
- Но EffectComposer может быть еще не готов к использованию эффектов
- `wrapEffect` может требовать активного контекста EffectComposer

**Доказательства:**
- Инициализация в `useEffect` с `setTimeout(..., 0)` - асинхронная
- EffectComposer может инициализироваться позже
- Ошибка происходит при попытке использовать эффект

**Вероятность:** 🟡 **50%**

#### Гипотеза 4: Проблема с инициализацией WebGL контекста

**Причина:**
- Canvas создается, но WebGL контекст может быть не полностью инициализирован
- `gl.domElement` существует, но контекст может быть в состоянии инициализации
- `wrapEffect` может требовать полностью готовый WebGL контекст

**Вероятность:** 🟢 **30%**

---

## 7️⃣ Итоговый отчет

### 🔴 Гипотеза 1: Несовместимость версий React (НАИБОЛЕЕ ВЕРОЯТНАЯ)

**Почему:**
1. **Критический конфликт peerDependencies:**
   - `@react-three/fiber@9.5.0` требует React 19
   - Установлен React 18.3.1
   - npm показывает ошибки валидации для всех зависимостей

2. **Ошибка в скомпилированном коде:**
   - Ошибка в `51749ec1-3613e87e38821bb6.js` (r3f bundle)
   - Стек указывает на `isPrimaryRenderer` - внутренний метод React
   - Свойство 'S' может быть частью внутренней структуры React 19

3. **Использование `--legacy-peer-deps`:**
   - Позволяет установить несовместимые версии
   - Но не гарантирует runtime совместимость
   - React Three Fiber может использовать API, доступные только в React 19

**Решение:**
- Обновить React до версии 19.x
- Или откатить `@react-three/fiber` до версии, совместимой с React 18

---

### 🟡 Гипотеза 2: Неправильный shader для postprocessing

**Почему:**
1. **Отсутствует `inputBuffer`:**
   - Shader использует `inputColor` напрямую
   - В postprocessing нужно `texture2D(inputBuffer, uv)`
   - `inputBuffer` - встроенная переменная postprocessing

2. **`resolution` не определен:**
   - Объявлен как uniform, но не передается в конструкторе
   - В postprocessing `resolution` доступен автоматически
   - Нужно использовать встроенную переменную `vec2(resolution)`

3. **Неправильный синтаксис `mainImage`:**
   - Параметр `inputColor` может быть undefined
   - Нужно получать цвет из `inputBuffer`

**Решение:**
- Исправить shader: использовать `texture2D(inputBuffer, uv)` вместо `inputColor`
- Убрать `resolution` из uniforms, использовать встроенную переменную

---

### 🟡 Гипотеза 3: wrapEffect вызывается до готовности EffectComposer

**Почему:**
1. **Асинхронная инициализация:**
   - `wrapEffect` вызывается в `useEffect` с `setTimeout`
   - EffectComposer может инициализироваться позже
   - `wrapEffect` может требовать активного контекста EffectComposer

2. **Порядок рендеринга:**
   - RetroEffectComponent рендерится внутри EffectComposer
   - Но `wrapEffect` вызывается до того, как EffectComposer готов
   - Может быть race condition

**Решение:**
- Использовать `useEffect` с проверкой готовности EffectComposer
- Или использовать Suspense для отложенной загрузки эффекта

---

## 📊 Приоритет исправлений

### Критический приоритет:
1. **Обновить React до 19.x** или откатить r3f до версии для React 18
2. **Исправить shader:** использовать `texture2D(inputBuffer, uv)` и встроенный `resolution`

### Высокий приоритет:
3. **Улучшить инициализацию эффекта:** добавить проверку готовности EffectComposer
4. **Добавить обработку ошибок:** try-catch вокруг `wrapEffect`

### Средний приоритет:
5. **Оптимизировать зависимости:** убрать `--legacy-peer-deps` из продакшена
6. **Добавить fallback:** показывать статический фон при ошибке WebGL

---

## 🔧 Рекомендации

1. **Немедленно:** Обновить React до 19.x или использовать совместимые версии библиотек
2. **Критично:** Исправить shader для postprocessing
3. **Важно:** Улучшить инициализацию эффекта с проверкой готовности
4. **Желательно:** Добавить мониторинг ошибок WebGL

---

**Аудит выполнен:** 2026-03-06  
**Статус:** 🔴 Критические проблемы требуют немедленного исправления
