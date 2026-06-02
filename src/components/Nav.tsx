import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0d0e1a]/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center font-bold text-white text-sm tracking-tight select-none"
        >
          ED
        </Link>

        <div className="flex gap-10 text-[11px] uppercase tracking-[0.2em] text-gray-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        </div>

        <a
          href="#contact"
          className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-full transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  );
}
