import dynamic from "next/dynamic";
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
import StitchedRail from "@/components/ui/StitchedRail";
import NeedleCursor from "@/components/ui/NeedleCursor";
import Preloader from "@/components/ui/Preloader";
import RaymondLogo from "@/components/ui/RaymondLogo";

const ClothBackground = dynamic(() => import("@/components/ui/ClothBackground"), { ssr: false });

export default function Page() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <ClothBackground />
      <RaymondLogo />
      <StitchedRail />
      <NeedleCursor />

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
