import type { Module } from "@akasha/code-system/module"

export const hudAddonVisibilityVersion = {
  id: "01a061c5-18dd-7002-98bb-12e2b151ea28",
  pageTypeSlug: "module",
  slug: "hud-addon-visibility-version",
  definition:
    "which version the stored HUD visibility is at and how an older version is brought forward",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The baseline stored what each part was hidden by.",
    },
    {
      invariantKind: "departure",
      statement: "The current version stores what each part is shown by.",
    },
    {
      invariantKind: "departure",
      statement: "A stored value that is not a boolean is left out of the migration.",
    },
  ],
} as const satisfies Module
