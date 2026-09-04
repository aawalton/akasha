import type { Module } from "@akasha/code-system/module"

export const hudComponentLabels = {
  id: "01a060a4-fa3a-7e69-ab6f-7e0aaefa14c1",
  pageTypeSlug: "module",
  slug: "hud-component-labels",
  definition: "the name and category a person reads for one part of the HUD",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A label is hand-written rather than walked out of the game source.",
    },
    {
      invariantKind: "departure",
      statement: "A part covering several controls at once says so.",
    },
    {
      invariantKind: "departure",
      statement: "A part with no label is named from the spelling of its ESO global.",
    },
    {
      invariantKind: "absence",
      statement: "No label is read from the game.",
    },
  ],
} as const satisfies Module
