import type { Module } from "../../code-system/modules/module.page-type.ts"

export const atomicWrite = {
  id: "01a05c4c-9441-7a1c-a7fc-dc1ab3914181",
  pageTypeSlug: "module",
  slug: "atomic-write",
  definition: "a body put at a path with no reader ever seeing the path half written",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A write that throws leaves the path the write was asked for as the path stood.",
    },
    {
      invariantKind: "departure",
      statement: "The path written beside is taken away whether the rename landed or not.",
    },
    {
      invariantKind: "departure",
      statement: "Only a caller asking for another attempt has a busy file system tried again.",
    },
    {
      invariantKind: "constraint",
      statement: "Five attempts are made at the most.",
    },
    {
      invariantKind: "departure",
      statement: "The wait between attempts reaches no `Bun` global.",
    },
    {
      invariantKind: "departure",
      statement: "Only a retry ever waits.",
    },
    {
      invariantKind: "departure",
      statement: "A runtime holding no `Bun` read this module as working until a write was busy.",
    },
    {
      invariantKind: "departure",
      statement: "The editor's extension host holds no `Bun`.",
    },
  ],
} as const satisfies Module
