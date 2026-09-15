import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nextBossGui = {
  id: "01a06157-8359-7e61-9d80-9e788c9ca1c7",
  type: "module",
  slug: "next-boss-gui",
  definition: "the timetable window and the timers drawn over the Imperial City map",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A district's label on the map is found by the district's name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The map's zoom is held still while the timers are drawn over the map.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The timetable window remembers where the player dragged the window to.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The map timers are drawn only on the Imperial City map.",
    },
  ],
} as const satisfies Module
