import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Engines } from "@/components/sections/engines";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Transform } from "@/components/sections/transform";
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
 * Section order is deliberate (brief §6): gesture → the choice → mechanism →
 * the second gesture → trust → substance → the scary part → the caveats →
 * how to start. Engines sits second because "this can run entirely on your
 * machine" is the strongest claim the product has, and it has to land before
 * the reader reaches a pipeline diagram that would otherwise imply one fixed
 * path.
 *
 * Transform sits between the pipeline and Privacy on purpose. It is the one
 * part of the product that leaves your machine even on the offline engine, so
 * the reader has to have met it before they read the boundary diagram.
 *
 * The SmartScreen warning lands after the reader has a reason to care and
 * before the download instruction, which is the only ordering where it
 * converts instead of frightening.
 */
export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main>
        <Hero />
        <Engines />
        <HowItWorks />
        <Transform />
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
