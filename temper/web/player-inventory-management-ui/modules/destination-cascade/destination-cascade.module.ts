import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationCascade = {
  id: "01a0636c-5d97-776a-8d86-38240ccf000b",
  type: "page-type/module",
  slug: "destination-cascade",
  definition: "the linked selects naming where a rule puts an item",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Any place of a group reads Any and the group's name, read from its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Any wording is the web phrase page the action filter cascades read.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.367Z",
  updatedAt: "2026-09-27T11:33:34.000Z",
} as const satisfies Module
