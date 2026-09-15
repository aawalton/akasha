import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const memoryGuard = {
  id: "01a05c67-00ad-77fa-b6c0-e677644ff621",
  type: "module",
  slug: "memory-guard",
  definition: "whether the workstation has memory enough to admit one more process",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Eight gigabytes free is the least the workstation admits a process on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A least read from the environment is used only where that least parses to a positive number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Admitting a spawn asks the inodes as well as the memory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A meminfo line that does not match refuses rather than reading as zero.",
    },
  ],
} as const satisfies Module
