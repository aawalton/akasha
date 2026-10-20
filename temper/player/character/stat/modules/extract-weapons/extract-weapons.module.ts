import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const extractWeapons = {
  id: "01a06271-abcf-7408-81ef-b5cd9c05faac",
  type: "page-type/module",
  slug: "extract-weapons",
  definition: "the weapons on a bar of a build, read out as effect sources",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon's effect held only while a buff is up counts on either bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An off-hand weapon gives 0.177 of its power, and 0.03 more per Dual Wield Expert rank.",
    },
  ],
  createdAt: "2026-09-02T14:06:51.855Z",
  updatedAt: "2026-10-20T19:38:17.456Z",
} as const satisfies Module
