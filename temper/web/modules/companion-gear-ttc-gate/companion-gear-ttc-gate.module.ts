import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionGearTtcGate = {
  id: "01a0e0bf-70b2-701e-907b-37ceea2c9b29",
  type: "page-type/module",
  slug: "companion-gear-ttc-gate",
  definition: "what shows its content only once the companion gear trade numbers are read",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the numbers are read the screen shows what it is handed instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is drawn again whenever a page the numbers come from changes.",
    },
  ],
} as const satisfies Module
