import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inodeGuard = {
  id: "01a05c67-00ad-7fd7-8303-5ff4a8e492b2",
  type: "module",
  slug: "inode-guard",
  definition: "whether the mounts have inodes enough to admit one more process",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "Two hundred thousand free inodes is the floor unless the environment names another floor.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mount reporting no inodes is left out rather than read as full.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mount that cannot be read leaves the whole reading indeterminate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An indeterminate reading admits rather than refuses.",
    },
  ],
} as const satisfies Module
