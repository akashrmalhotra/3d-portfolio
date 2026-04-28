import Hero from "@/components/sections/Hero";
import OpeningQuestion from "@/components/sections/OpeningQuestion";
import SurfaceReality from "@/components/sections/SurfaceReality";
import Domain from "@/components/sections/Domain";
import MoatFunnel from "@/components/sections/MoatFunnel";
import PlatformIllusion from "@/components/sections/PlatformIllusion";
import NationalContext from "@/components/sections/NationalContext";
import ValueProposition from "@/components/sections/ValueProposition";
import AgriTechVision from "@/components/sections/AgriTechVision";
import Evolution from "@/components/sections/Evolution";
import Synthesis from "@/components/sections/Synthesis";
import AlgorithmicInclusion from "@/components/sections/AlgorithmicInclusion";
import ModelGovernance from "@/components/sections/ModelGovernance";
import StrategicQuadrant from "@/components/sections/StrategicQuadrant";
import FinalVerdict from "@/components/sections/FinalVerdict";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollBar from "@/components/ui/ScrollBar";
import { MagneticCursor } from "@/components/ui/Scroll";
import { DoorChoiceProvider } from "@/components/ui/DoorChoice";

export default function Page() {
  return (
    <DoorChoiceProvider>
      <SmoothScroll />
      <ScrollBar />
      <ScrollProgress />
      <MagneticCursor />
      <main className="relative">
        <Hero />
        <OpeningQuestion />
        <SurfaceReality />
        <Domain />
        <MoatFunnel />
        <PlatformIllusion />
        <NationalContext />
        <ValueProposition />
        <AgriTechVision />
        <Evolution />
        <Synthesis />
        <AlgorithmicInclusion />
        <ModelGovernance />
        <StrategicQuadrant />
        <FinalVerdict />
      </main>
    </DoorChoiceProvider>
  );
}
