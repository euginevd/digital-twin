import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="about" className="min-h-screen" />
      <section id="skills" className="min-h-screen" />
      <section id="projects" className="min-h-screen" />
      <section id="contact" className="min-h-screen" />
    </main>
  );
}
