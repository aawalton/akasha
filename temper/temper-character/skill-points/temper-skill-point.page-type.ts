import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"
import type { MaxQuests } from "./properties/max-quests.number-property.ts"
import type { MaxSkyshards } from "./properties/max-skyshards.number-property.ts"
import type { MaxValue } from "./properties/max-value.number-property.ts"

export type TemperSkillPoint = TemperCharacterThing & {
  maxQuests?: MaxQuests
  maxSkyshards?: MaxSkyshards
  maxValue?: MaxValue
}

export const temperSkillPoint = {
  id: "01a05fcd-f559-75c5-bd78-0041c552d484",
  pageTypeSlug: "page-type",
  slug: "temper-skill-point",
  definition: "one source a character earns skill points from",
  pluralSlug: "temper-skill-points",
  extendsSlug: ["page-type/temper-character-thing"],
  partSlugs: [
    "number-property/max-quests",
    "number-property/max-skyshards",
    "number-property/max-value",
  ],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "category", required: true, many: false },
    { pagePropertySlug: "max-quests", required: false, many: false },
    { pagePropertySlug: "max-skyshards", required: false, many: false },
    { pagePropertySlug: "max-value", required: false, many: false },
  ],
} as const satisfies PageType
