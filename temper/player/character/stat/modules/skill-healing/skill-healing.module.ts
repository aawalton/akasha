import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillHealing = {
  id: "01a13c1f-1ac3-7cf3-93be-c511d8f673b5",
  type: "page-type/module",
  slug: "skill-healing",
  definition: "the healing one cast of a skill gives, read from the tooltip the game gave it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's healing is read from its tooltip text rather than worked out again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cast's healing is a heal on landing, a shield, and a heal at each tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick stated with no interval falls every 2 seconds over the skill's duration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only the first heal a tooltip states counts, so a later conditional one does not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip sentence naming healing that no shape here reads is kept as unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shield's stated duration is how long the skill's effect runs.",
    },
  ],
  createdAt: "2026-10-14T20:33:53.850Z",
  updatedAt: "2026-10-14T21:44:49.901Z",
} as const satisfies Module
