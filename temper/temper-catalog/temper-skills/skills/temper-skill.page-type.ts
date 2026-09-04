import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { BaseName } from "../properties/base-name.text-property.ts"
import type { EsoSkillId } from "../properties/eso-skill-id.number-property.ts"
import type { IsMorph } from "../properties/is-morph.boolean-property.ts"
import type { LearnedLevel } from "../properties/learned-level.number-property.ts"
import type { LineRankNeeded } from "../properties/line-rank-needed.number-property.ts"
import type { MorphIndex } from "../properties/morph-index.number-property.ts"
import type { SkillRank } from "../properties/skill-rank.number-property.ts"
import type { SkillStatus } from "../properties/skill-status.text-property.ts"

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
  slug: "temper-skill",
  definition: "something a character does, learned from a skill line",
  pluralSlug: "temper-skills",
  extendsSlug: ["page-type/temper-catalog-thing"],
  partSlugs: [
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
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "base-name", required: true, many: false },
    { pagePropertySlug: "eso-skill-id", required: true, many: false },
    { pagePropertySlug: "is-morph", required: true, many: false },
    { pagePropertySlug: "learned-level", required: true, many: false },
    { pagePropertySlug: "line-rank-needed", required: true, many: false },
    { pagePropertySlug: "morph-index", required: true, many: false },
    { pagePropertySlug: "skill-rank", required: true, many: false },
    { pagePropertySlug: "skill-line-id", required: true, many: false },
    { pagePropertySlug: "skill-type", required: true, many: false },
    { pagePropertySlug: "subcategory-id", required: true, many: false },
    { pagePropertySlug: "skill-status", required: false, many: false },
  ],
} as const satisfies PageType
