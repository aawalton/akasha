import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillUltimate = {
  id: "01a14006-0ced-7fdc-85fa-30d67668f304",
  type: "page-type/module",
  slug: "skill-ultimate",
  definition:
    "the Ultimate a tooltip says it gives, and the healing it says each point spent gives",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Heroism gives the Ultimate its tooltip says, as often and as long as it says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Healing for each point of Ultimate spent is the current amount the game gives now.",
    },
  ],
  createdAt: "2026-10-15T14:45:00.781Z",
  updatedAt: "2026-10-15T14:45:00.781Z",
} as const satisfies Module
