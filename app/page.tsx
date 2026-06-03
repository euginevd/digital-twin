import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Outcomes from "@/components/Outcomes";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Outcomes />
      <Chat />
      <Footer />
    </main>
  );
}
