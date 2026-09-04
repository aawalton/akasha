import type { Module } from "../../code-system/modules/module.page-type.ts"

export const memoryGuard = {
  id: "01a05c67-00ad-77fa-b6c0-e677644ff621",
  pageTypeSlug: "module",
  slug: "memory-guard",
  definition: "whether the workstation has memory enough to admit one more process",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Eight gigabytes free is the least the workstation admits a process on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A least read from the environment stands only where it parses to a positive number.",
    },
    {
      invariantKind: "departure",
      statement: "A host with no pressure file reads as no pressure rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "Admitting a spawn asks the inodes as well as the memory.",
    },
    {
      invariantKind: "departure",
      statement: "A meminfo line that does not match refuses rather than reading as zero.",
    },
  ],
} as const satisfies Module
