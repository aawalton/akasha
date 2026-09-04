import type { Module } from "@akasha/code-system/module"

export const nextBossGlobal = {
  id: "01a06157-8357-7112-8787-b5ac39b4f125",
  pageTypeSlug: "module",
  slug: "next-boss-global",
  definition: "the name the key bindings reach this tracker's table by",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A key binding's Lua runs outside the bundle and reaches only a global.",
    },
  ],
} as const satisfies Module
