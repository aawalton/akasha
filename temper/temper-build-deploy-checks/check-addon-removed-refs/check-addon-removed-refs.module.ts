import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkAddonRemovedRefs = {
  id: "01a06365-e827-7008-ba28-298e223f8538",
  pageTypeSlug: "module",
  slug: "check-addon-removed-refs",
  definition: "the run judging whether an emitted bundle still reaches a removed add-on",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The population this run states is the emitted bundles under the build output.",
    },
    {
      invariantKind: "constraint",
      statement: "A bundle examined is a bundle whose text was read.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty build output ends the run rather than passing the run.",
    },
    {
      invariantKind: "constraint",
      statement: "A bundle no longer on disk is skipped rather than counted as examined.",
    },
  ],
} as const satisfies Module
