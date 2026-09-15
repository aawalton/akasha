import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesFr02 = {
  id: "01a061e7-9315-72bc-ad9c-4f41ed8ec7f2",
  type: "page-type/module",
  slug: "zone-names-fr-02",
  definition: "part 02 of every zone's name in fr",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
