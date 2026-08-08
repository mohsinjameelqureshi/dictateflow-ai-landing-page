import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Privacy } from "@/components/sections/privacy";
import { Features } from "@/components/sections/features";
import { SmartScreen } from "@/components/sections/smartscreen";
import { Limits } from "@/components/sections/limits";
import { Setup } from "@/components/sections/setup";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/json-ld";

/**
 * One page, a single scrolling route.
 *
 * Section order is deliberate (brief §6): gesture → mechanism → trust →
 * substance → the scary part → the caveats → how to start. The SmartScreen
 * warning lands after the reader has a reason to care and before the download
 * instruction, which is the only ordering where it converts instead of
 * frightening.
 */
export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Privacy />
        <Features />
        <SmartScreen />
        <Limits />
        <Setup />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
