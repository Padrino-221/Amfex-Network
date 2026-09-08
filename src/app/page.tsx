import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Header />
      <Hero />
      <Marquee />
      <Portfolio />
      <Services />
      <About />
      <Journey />
      <Footer />
    </main>
  );
}


export const dynamic = "force-dynamic";
