export default function PA9Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Центральное ядро */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      {/* Орбитальные пути */}
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        transform="rotate(0 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        transform="rotate(120 12 12)"
      />
      {/* Электроны на орбитах */}
      <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      <circle cx="4" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
      <circle cx="18.928" cy="6.928" r="1.5" fill="currentColor" />
      <circle cx="5.072" cy="17.072" r="1.5" fill="currentColor" />
    </svg>
  );
}
