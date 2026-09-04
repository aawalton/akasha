import type { Module } from "@akasha/code-system/module"

export const libSetsTipSettingsState = {
  id: "01a0623c-2df6-79c8-86f2-4a92326c6cf2",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-settings-state",
  definition: "the settings menu handle and the flag saying it has been built",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The built flag is kept per input mode in a two-key map.",
    },
  ],
} as const satisfies Module
