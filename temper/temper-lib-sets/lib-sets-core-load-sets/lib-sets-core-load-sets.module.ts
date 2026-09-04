import type { Module } from "@akasha/code-system/module"

export const libSetsCoreLoadSets = {
  id: "01a061fc-ceec-7554-91c4-46ddf7db919c",
  pageTypeSlug: "module",
  slug: "lib-sets-core-load-sets",
  definition: "building every lookup table the library answers from, in one sweep of the set data",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A load is refused while another load is already running.",
    },
    {
      invariantKind: "constraint",
      statement: "Every lookup table built here is emptied and rebuilt from scratch on each load.",
    },
    {
      invariantKind: "departure",
      statement: "The type tables are named by strings carried in the set type data.",
    },
  ],
} as const satisfies Module
