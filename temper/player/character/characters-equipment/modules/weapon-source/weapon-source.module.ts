import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const weaponSource = {
  id: "01a0616f-8e1a-75a8-85c6-c316865f042b",
  type: "page-type/module",
  slug: "weapon-source",
  definition: "the effects a wielded weapon gives a character",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An off-hand weapon gives 0.237 of its Weapon and Spell Damage, rounded on its own before the sum.",
    },
  ],
  createdAt: "2026-09-02T09:24:55.962Z",
  updatedAt: "2026-10-20T18:49:52.739Z",
} as const satisfies Module
