import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.ts"
import type { EsoCraftTypeId } from "./properties/eso-craft-type-id.number-property.ts"

export type TemperCraftType = TemperPursuitThing & {
  esoCraftTypeId: EsoCraftTypeId
}

export const temperCraftType = {
  id: "01a0616b-2cdf-7001-a24c-0dd3c96e1a6e",
  pageTypeSlug: "page-type",
  slug: "temper-craft-type",
  definition: "a craft a player researches item traits under",
  pluralSlug: "temper-craft-types",
  extendsSlug: ["page-type/temper-pursuit-thing"],
  partSlugs: ["number-property/eso-craft-type-id"],
  properties: [{ pagePropertySlug: "eso-craft-type-id", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A craft type gathers the research lines one crafting skill covers.",
    },
  ],
} as const satisfies PageType
