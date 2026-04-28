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
import { HoverCursor, BackgroundStage } from "@/components/ui/Cinematic";
import { DoorChoiceProvider } from "@/components/ui/DoorChoice";

export default function Page() {
  return (
    <DoorChoiceProvider>
      <SmoothScroll />
      <ScrollBar />
      <ScrollProgress />
      <HoverCursor />
      <BackgroundStage
        stops={[
          "#F5F1E8", // hero
          "#F0E9DB", // opening
          "#F5F1E8", // surface
          "#EFE7D6", // domain
          "#F0EBDD", // moat
          "#E8F2F7", // platform
          "#F0E9DB", // national
          "#F5F1E8", // value
          "#FAFAF7", // vision
          "#F0E9DB", // evolution
          "#E8F2F7", // synthesis
          "#F5F1E8", // inclusion
          "#0F1E3D", // governance
          "#F5F1E8", // quadrant
          "#FAFAF7", // verdict
        ]}
      />
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
