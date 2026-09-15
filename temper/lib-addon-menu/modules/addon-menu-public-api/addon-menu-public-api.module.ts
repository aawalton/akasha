import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuPublicApi = {
  id: "01a06100-0000-7000-8000-000000000007",
  type: "module",
  slug: "addon-menu-public-api",
  definition:
    "the global names LibAddonMenu2 and LAMCreateControl assigned once every module has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every widget module is imported for the side effect of registering its factory.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An older LibAddonMenu already in memory triggers a one-time compatibility warning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The two globals are assigned after all imports have run.",
    },
  ],
} as const satisfies Module
