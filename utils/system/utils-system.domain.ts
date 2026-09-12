import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utilsSystem = {
  id: "01a05c67-00ac-7c6f-a5c8-9391ef1427fe",
  type: "domain",
  slug: "utils-system",
  definition: "what the Linux kernel says about the workstation, read from the files it says it in",
  parts: ["module/inode-guard", "module/memory-guard", "module/worktree-paths"],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Everything here reads a file only Linux has.",
    },
  ],
} as const satisfies Domain
