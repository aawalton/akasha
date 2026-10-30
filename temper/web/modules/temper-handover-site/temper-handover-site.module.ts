import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const temperHandoverSite = {
  id: "01a0bb8f-a5d0-75ce-a592-e0fdb309ce8c",
  type: "page-type/module",
  slug: "temper-handover-site",
  definition: "how the Temper site takes part in a handover",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Temper is named `temper` in a handover, and alanwalton.com knows that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Temper signs its own cookie with `TEMPER_SESSION_KEY`.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A `__Host-` cookie is sent to the one host that set it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handover happens on tempereso.com and on no other host Temper answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader asking a handover of another host under tempereso.com is sent there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A signed-in player lands on `/home`.",
    },
  ],
  createdAt: "2026-09-19T21:25:48.624Z",
  updatedAt: "2026-10-30T16:02:22.571Z",
} as const satisfies Module
