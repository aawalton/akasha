import type { Module } from "@akasha/code-system/module"

export const libSetsTipSettingsLam = {
  id: "01a0623c-2df6-7308-a66d-91a7225dd61b",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-settings-lam",
  definition: "the settings panel rows for the tooltip options",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Nothing is built here on console or in gamepad mode.",
    },
    { invariantKind: "constraint", statement: "The panel is built at most once." },
    {
      invariantKind: "departure",
      statement: "Turning a custom pattern on greys out every stock tooltip row.",
    },
    {
      invariantKind: "departure",
      statement: "The traits needed setting shares its row with the reconstruction cost setting.",
    },
  ],
} as const satisfies Module
