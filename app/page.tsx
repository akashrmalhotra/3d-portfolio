"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- NEW GLOBAL UI & PHYSICS ENGINES ---
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import FabricBackground from "@/components/ui/FabricBackground";

// --- YOUR EXISTING UI HELPERS ---
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollBar from "@/components/ui/ScrollBar";
import { BackgroundStage } from "@/components/ui/Cinematic";

// --- ALL 14 SECTIONS ---
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

export default function Page() {
  useEffect(() => {
    // Register GSAP globally on client-side load
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <SmoothScroll>
      {/* The main tag now has 'cursor-none' to hide the default mouse 
        and give full control to your CustomCursor 
      */}
      <main className="relative min-h-screen w-full cursor-none overflow-hidden bg-[#0a1f3d] selection:bg-[#c9a961] selection:text-[#0a1f3d]">
        
        {/* New 3D and Cursor Layers */}
        <CustomCursor />
        <FabricBackground />

        {/* Your Original Scroll & Background Helpers */}
        <ScrollBar />
        <ScrollProgress />
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

        {/* The Website Narrative Flow */}
        <div className="relative z-10 flex flex-col">
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
        </div>
      </main>
    </SmoothScroll>
  );
}