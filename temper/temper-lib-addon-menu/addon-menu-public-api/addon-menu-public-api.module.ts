import type { Module } from "@akasha/code-system/module"

export const addonMenuPublicApi = {
  id: "01a06100-0000-7000-8000-000000000007",
  pageTypeSlug: "module",
  slug: "addon-menu-public-api",
  definition:
    "the global names LibAddonMenu2 and LAMCreateControl assigned once every module has loaded",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every widget module is imported for the side effect of registering its factory.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An older LibAddonMenu already in memory triggers a one-time compatibility warning.",
    },
    {
      invariantKind: "departure",
      statement: "The two globals are assigned after all imports have run.",
    },
  ],
} as const satisfies Module
