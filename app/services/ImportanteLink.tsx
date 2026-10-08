"use client";

export default function ImportanteLink({ targetId }: { targetId: string }) {
  function handleClick() {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    el.classList.remove("animate-shake");
    // Force reflow so the animation restarts if clicked again in a row.
    void el.offsetWidth;
    el.classList.add("animate-shake");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Ver información importante sobre este servicio"
      title="Ver información importante"
      className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white shadow-sm hover:bg-primary-dark transition-colors flex-shrink-0"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="7.25" r="1.5" />
        <rect x="11" y="10.5" width="2" height="7" rx="1" />
      </svg>
    </button>
  );
}
