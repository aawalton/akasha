import type { Description } from "akasha/pages/properties/description.text-property.ts"
import type { BaseName } from "akasha/temper/catalog/temper-skill/properties/base-name.text-property.types.ts"
import type { EsoSkillId } from "akasha/temper/catalog/temper-skill/properties/eso-skill-id.number-property.types.ts"
import type { IsMorph } from "akasha/temper/catalog/temper-skill/properties/is-morph.boolean-property.types.ts"
import type { LearnedLevel } from "akasha/temper/catalog/temper-skill/properties/learned-level.number-property.types.ts"
import type { LineRankNeeded } from "akasha/temper/catalog/temper-skill/properties/line-rank-needed.number-property.types.ts"
import type { MorphIndex } from "akasha/temper/catalog/temper-skill/properties/morph-index.number-property.types.ts"
import type { SkillRank } from "akasha/temper/catalog/temper-skill/properties/skill-rank.number-property.types.ts"
import type { SkillStatus } from "akasha/temper/catalog/temper-skill/properties/skill-status.text-property.types.ts"
import type { SkillLineId } from "akasha/temper/catalog/things/properties/skill-line-id.text-property.types.ts"
import type { SkillType } from "akasha/temper/catalog/things/properties/skill-type.text-property.types.ts"
import type { SubcategoryId } from "akasha/temper/catalog/things/properties/subcategory-id.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

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
