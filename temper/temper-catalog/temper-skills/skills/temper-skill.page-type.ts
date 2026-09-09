import type { PageType } from "@akasha/pages/page-type"
import type { BaseName } from "../../../catalogs/temper-skills/properties/base-name.text-property.ts"
import type { EsoSkillId } from "../../../catalogs/temper-skills/properties/eso-skill-id.number-property.ts"
import type { IsMorph } from "../../../catalogs/temper-skills/properties/is-morph.boolean-property.ts"
import type { LearnedLevel } from "../../../catalogs/temper-skills/properties/learned-level.number-property.ts"
import type { LineRankNeeded } from "../../../catalogs/temper-skills/properties/line-rank-needed.number-property.ts"
import type { MorphIndex } from "../../../catalogs/temper-skills/properties/morph-index.number-property.ts"
import type { SkillRank } from "../../../catalogs/temper-skills/properties/skill-rank.number-property.ts"
import type { SkillStatus } from "../../../catalogs/temper-skills/properties/skill-status.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.ts"

export type TemperSkill = TemperCatalogThing & {
  baseName: BaseName
  esoSkillId: EsoSkillId
  isMorph: IsMorph
  learnedLevel: LearnedLevel
  lineRankNeeded: LineRankNeeded
  morphIndex: MorphIndex
  rank: SkillRank
  status?: SkillStatus
}

export const temperSkill = {
  id: "01a05fca-cb8c-7b06-8668-7985d611dbab",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-skill",
  definition: "something a character does, learned from a skill line",
  pluralSlug: "temper-skills",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "boolean-property/is-morph",
    "number-property/eso-skill-id",
    "number-property/learned-level",
    "number-property/line-rank-needed",
    "number-property/morph-index",
    "number-property/skill-rank",
    "text-property/base-name",
    "text-property/skill-status",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "text-property/base-name", required: true, many: false },
    { pageProperty: "number-property/eso-skill-id", required: true, many: false },
    { pageProperty: "boolean-property/is-morph", required: true, many: false },
    { pageProperty: "number-property/learned-level", required: true, many: false },
    { pageProperty: "number-property/line-rank-needed", required: true, many: false },
    { pageProperty: "number-property/morph-index", required: true, many: false },
    { pageProperty: "number-property/skill-rank", required: true, many: false },
    { pageProperty: "text-property/skill-line-id", required: true, many: false },
    { pageProperty: "text-property/skill-type", required: true, many: false },
    { pageProperty: "text-property/subcategory-id", required: true, many: false },
    { pageProperty: "text-property/skill-status", required: false, many: false },
  ],
} as const satisfies PageType
