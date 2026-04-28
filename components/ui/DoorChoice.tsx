"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DoorKey = "deeper" | "global" | null;

type Ctx = {
  choice: DoorKey;
  setChoice: (k: DoorKey) => void;
};

const DoorChoiceContext = createContext<Ctx>({ choice: null, setChoice: () => {} });

export function DoorChoiceProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<DoorKey>(null);
  return (
    <DoorChoiceContext.Provider value={{ choice, setChoice }}>
      {children}
    </DoorChoiceContext.Provider>
  );
}

export function useDoorChoice() {
  return useContext(DoorChoiceContext);
}
