import type { Module } from "@akasha/code-system/module"

export const hudAddonPublicApi = {
  id: "01a061c5-18dd-700f-96b2-7a0b4a1f8e37",
  pageTypeSlug: "module",
  slug: "hud-addon-public-api",
  definition: "the global another add-on reaches the bar, the commands and the hiding through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The global is published as the module is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The shape of the global is stated in `temper-addon-library-types`.",
    },
    {
      invariantKind: "departure",
      statement: "Another add-on reaches the heads-up add-on through the global alone.",
    },
  ],
} as const satisfies Module
