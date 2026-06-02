export default function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm px-8 py-4 flex justify-between items-center">
      <span className="text-white font-bold text-lg">Eugine Dsylva</span>
      <div className="flex gap-8 text-sm text-gray-300">
        <a href="#about" className="hover:text-white transition">About</a>
        <a href="#skills" className="hover:text-white transition">Skills</a>
        <a href="#projects" className="hover:text-white transition">Projects</a>
        <a href="#contact" className="hover:text-white transition">Contact</a>
      </div>
    </nav>
  );
}