import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nextBossEvents = {
  id: "01a06157-8359-7b61-8020-3f4072b058a7",
  type: "module",
  slug: "next-boss-events",
  definition: "what the tracker does when a boss dies, a zone changes or a group member shares",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tracker listens only while the player is inside Imperial City.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The one-second loop keeps running in Cyrodiil so a timer survives a zone change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A boss counts as dead only where the reticle saw that boss alive in the last minute.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kill shared with the group has the district rather than the boss.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A group broadcast is sent only where LibGroupBroadcast is loaded.",
    },
  ],
} as const satisfies Module
