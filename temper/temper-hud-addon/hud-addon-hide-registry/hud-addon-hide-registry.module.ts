import type { Module } from "@akasha/code-system/module"

export const hudAddonHideRegistry = {
  id: "01a061c5-18dd-700c-9fd0-0e774e55b75b",
  pageTypeSlug: "module",
  slug: "hud-addon-hide-registry",
  definition:
    "the plan carried out against the game, each part through the mechanism the part names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part is reached again each time the plan is carried out.",
    },
    {
      invariantKind: "departure",
      statement: "A part not answering the mechanism the catalog names is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "Carrying out the whole plan touches only the parts to be hidden.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mechanism the catalog gains and the registry does not is refused at compile time.",
    },
  ],
} as const satisfies Module
