const links = [
  { label: "Email", href: "mailto:euginevd@gmail.com" },
  { label: "GitHub", href: "https://github.com/euginevd" },
  { label: "LinkedIn", href: "https://linkedin.com/in/euginevd" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-gray-900 py-16 px-8 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <p className="text-white font-medium mb-1">Eugine Dsylva</p>
          <p className="text-gray-600 text-sm">AI Engineer · Sydney, Australia</p>
        </div>

        <nav className="flex gap-6">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-gray-700">© {new Date().getFullYear()} Eugine Dsylva</p>
      </div>
    </footer>
  );
}
