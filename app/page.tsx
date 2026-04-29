import Hero from "@/components/sections/Hero";
import RaymondGlance from "@/components/sections/RaymondGlance";
import MacroDisconnect from "@/components/sections/MacroDisconnect";
import StructuralFlaw from "@/components/sections/StructuralFlaw";
import BlindSpot from "@/components/sections/BlindSpot";
import DormantAsset from "@/components/sections/DormantAsset";
import Catalyst from "@/components/sections/Catalyst";
import NewArchitecture from "@/components/sections/NewArchitecture";
import ValueExchange from "@/components/sections/ValueExchange";
import ModelShift from "@/components/sections/ModelShift";
import Defensibility from "@/components/sections/Defensibility";
import MarketImpact from "@/components/sections/MarketImpact";
import UnfairAdvantage from "@/components/sections/UnfairAdvantage";
import Closing from "@/components/sections/Closing";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollBar from "@/components/ui/ScrollBar";
import { HoverCursor, BackgroundStage } from "@/components/ui/Cinematic";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <ScrollBar />
      <ScrollProgress />
      <HoverCursor />
      <BackgroundStage
        stops={[
          "#F5F1E8", // hero
          "#EFE9D8", // glance
          "#F5F1E8", // macro
          "#EFE9D8", // flaw
          "#F5F1E8", // blindspot
          "#EFE9D8", // dormant
          "#F5F1E8", // catalyst
          "#EFE9D8", // architecture
          "#F5F1E8", // exchange
          "#EFE9D8", // shift
          "#F5F1E8", // defensibility
          "#EFE9D8", // impact
          "#F5F1E8", // advantage
          "#0A1F3D", // closing
        ]}
      />
      <main className="relative">
        <Hero />
        <RaymondGlance />
        <MacroDisconnect />
        <StructuralFlaw />
        <BlindSpot />
        <DormantAsset />
        <Catalyst />
        <NewArchitecture />
        <ValueExchange />
        <ModelShift />
        <Defensibility />
        <MarketImpact />
        <UnfairAdvantage />
        <Closing />
      </main>
    </>
  );
}
