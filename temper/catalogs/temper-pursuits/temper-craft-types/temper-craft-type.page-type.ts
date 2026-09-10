import type { PageType } from "@akasha/pages/page-type"

export const temperCraftType = {
  id: "01a0616b-2cdf-7001-a24c-0dd3c96e1a6e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-craft-type",
  definition: "a craft a player researches item traits under",
  pluralSlug: "temper-craft-types",
  extends: ["page-type/temper-pursuit-thing"],
  parts: ["number-property/eso-craft-type-id"],
  properties: [{ pageProperty: "number-property/eso-craft-type-id", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A craft type gathers the research lines one crafting skill covers.",
    },
  ],
  types: "ts",
} as const satisfies PageType
