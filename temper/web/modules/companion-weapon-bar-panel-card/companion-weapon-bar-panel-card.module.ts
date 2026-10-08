import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionWeaponBarPanelCard = {
  id: "01a06421-251e-7ab9-8fd5-d60f4ba996b4",
  type: "page-type/module",
  slug: "companion-weapon-bar-panel-card",
  definition: "a panel card stating the weapons on a companion's bar",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title and empty choices are read from catalog pages.",
    },
  ],
  createdAt: "2026-09-02T21:58:08.926Z",
  updatedAt: "2026-09-27T11:45:02.000Z",
} as const satisfies Module
