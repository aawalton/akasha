import type { Module } from "@akasha/code-system/module"

export const gpsMapAdapter = {
  id: "01a0614d-4764-7590-90c4-082d02d03370",
  pageTypeSlug: "module",
  slug: "gps-map-adapter",
  definition: "the game's map changing functions wrapped so a change can be measured",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game's own function is called first and its result is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A function the game does not define is left unwrapped.",
    },
  ],
} as const satisfies Module
