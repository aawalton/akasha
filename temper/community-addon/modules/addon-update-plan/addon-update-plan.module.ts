import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonUpdatePlan = {
  id: "01a06069-b78f-7b28-b528-03c2f328ce0c",
  type: "module",
  slug: "addon-update-plan",
  definition: "what each installed addon folder is, weighed against what ESOUI offers",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder the deploy owns is marked as such and weighed no further.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder ESOUI knows nothing about is marked as unmatched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version is compared with the space inside that version collapsed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An installed addon stating no version counts as out of date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first ESOUI entry claiming a folder keeps that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an out-of-date folder is picked up unless the caller forces the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A download is fetched once however many folders that download has.",
    },
  ],
} as const satisfies Module
