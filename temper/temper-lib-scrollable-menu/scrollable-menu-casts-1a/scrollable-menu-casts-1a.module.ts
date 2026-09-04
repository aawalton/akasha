import type { Module } from "@akasha/code-system/module"

export const scrollableMenuCasts1a = {
  id: "01a06275-c443-79ce-a2b3-306d66ef04d7",
  pageTypeSlug: "module",
  slug: "scrollable-menu-casts-1a",
  definition: "the narrowing helpers for shapes named from Anchor through ContextMenuCallbackEntry",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each helper performs a bare TypeScript cast and returns the value unchanged.",
    },
    {
      invariantKind: "absence",
      statement: "The cast is not guarded by any runtime check.",
    },
    {
      invariantKind: "constraint",
      statement: "Membership of this half is decided by the alphabetical name of the target type.",
    },
    {
      invariantKind: "departure",
      statement: "A target shape with no named declaration is written inline as a structural type.",
    },
  ],
} as const satisfies Module
