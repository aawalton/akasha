import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const onsetScaledBuff = {
  id: "01a15e1b-556f-7931-a8db-7723ca1ec703",
  type: "page-type/module",
  slug: "onset-scaled-buff",
  definition: "the share a buff gives that the power it began at sets",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Merciless Charge gives 1% for each 555.6 of the higher power it began at, at most 12%.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Any divisor from 553.75 to 558.5 reproduces the readings, so the divisor is fit rather than pinned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refresh keeps the share the buff's first application set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a buff listed with no power at its start gives nothing.",
    },
  ],
  createdAt: "2026-10-21T10:56:52.078Z",
  updatedAt: "2026-10-21T10:56:52.078Z",
} as const satisfies Module
