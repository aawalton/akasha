import type { Module } from "@akasha/code-system/module"

export const addonJson = {
  id: "01a06060-ec3d-70b4-aba1-0e67a09d8d91",
  pageTypeSlug: "module",
  slug: "addon-json",
  definition: "the shape of the `addon.json` an addon in this repository states itself in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon states the name the game loads that addon under.",
    },
    {
      invariantKind: "departure",
      statement: "An addon states the version of that addon as a number the game compares.",
    },
    {
      invariantKind: "departure",
      statement: "An addon states the saved variables the game keeps for that addon.",
    },
    {
      invariantKind: "departure",
      statement: "An addon states the addons the game loads before that addon.",
    },
    {
      invariantKind: "departure",
      statement: "A key nothing here names is carried through rather than dropped.",
    },
  ],
} as const satisfies Module
