const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/euginevd", icon: "in" },
  { label: "GitHub", href: "https://github.com/euginevd", icon: "gh" },
  { label: "Email", href: "mailto:euginevd@gmail.com", icon: "@" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0d0e1a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          {/* Left — brand */}
          <div>
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center font-bold text-white text-sm mb-4">
              ED
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Building AI that actually works — production-grade LLMs,
              agents, and infrastructure.
            </p>
          </div>

          {/* Right — connect */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              Connect With Me
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:border-violet-600 hover:text-white transition-all text-xs font-bold"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-700 text-xs">
            © {new Date().getFullYear()} Eugine Dsylva · AI Engineer · Sydney, Australia
          </p>
        </div>
      </div>
    </footer>
  );
}
