import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { BaseName } from "../../temper-skill/properties/base-name.text-property.ts"
import type { EsoSkillId } from "../../temper-skill/properties/eso-skill-id.number-property.ts"
import type { IsMorph } from "../../temper-skill/properties/is-morph.boolean-property.ts"
import type { LearnedLevel } from "../../temper-skill/properties/learned-level.number-property.ts"
import type { LineRankNeeded } from "../../temper-skill/properties/line-rank-needed.number-property.ts"
import type { MorphIndex } from "../../temper-skill/properties/morph-index.number-property.ts"
import type { SkillRank } from "../../temper-skill/properties/skill-rank.number-property.ts"
import type { SkillStatus } from "../../temper-skill/properties/skill-status.text-property.ts"
import type { SkillLineId } from "../../things/properties/skill-line-id.text-property.ts"
import type { SkillType } from "../../things/properties/skill-type.text-property.ts"
import type { SubcategoryId } from "../../things/properties/subcategory-id.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperSkill = TemperCatalogThing & {
  key: Key
  description: Description
  baseName: BaseName
  esoSkillId: EsoSkillId
  isMorph: IsMorph
  learnedLevel: LearnedLevel
  lineRankNeeded: LineRankNeeded
  morphIndex: MorphIndex
  rank: SkillRank
  skillLineId: SkillLineId
  skillType: SkillType
  subcategoryId: SubcategoryId
  status?: SkillStatus
}
