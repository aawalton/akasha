import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonUpdatePlan = {
  id: "01a06069-b78f-7b28-b528-03c2f328ce0c",
  type: "module",
  slug: "addon-update-plan",
  definition: "what each installed addon folder is, weighed against what ESOUI offers",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder the deploy owns is marked as such and weighed no further.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder ESOUI knows nothing about is marked as unmatched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A version is compared with the space inside that version collapsed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An installed addon stating no version counts as out of date.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first ESOUI entry claiming a folder keeps that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only an out-of-date folder is picked up unless the caller forces the rest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A download is fetched once however many folders that download has.",
    },
  ],
} as const satisfies Module
