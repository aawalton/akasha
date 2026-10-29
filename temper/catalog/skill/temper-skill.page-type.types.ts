import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { EsoAbilityId } from "akasha/temper/catalog/ability/properties/eso-ability-id.number-property.types.ts"
import type { TemperAbility } from "akasha/temper/catalog/ability/temper-ability.page-type.types.ts"
import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { BaseName } from "akasha/temper/catalog/skill/properties/base-name.text-property.types.ts"
import type { IsMorph } from "akasha/temper/catalog/skill/properties/is-morph.boolean-property.types.ts"
import type { LearnedLevel } from "akasha/temper/catalog/skill/properties/learned-level.number-property.types.ts"
import type { LineRankNeeded } from "akasha/temper/catalog/skill/properties/line-rank-needed.number-property.types.ts"
import type { MorphIndex } from "akasha/temper/catalog/skill/properties/morph-index.number-property.types.ts"
import type { SkillRank } from "akasha/temper/catalog/skill/properties/skill-rank.number-property.types.ts"
import type { SkillStatus } from "akasha/temper/catalog/skill/properties/skill-status.text-property.types.ts"
import type { SkillVariants } from "akasha/temper/catalog/skill/properties/skill-variants.record-property.types.ts"
import type { SkillLine } from "akasha/temper/catalog/thing/properties/skill-line.relation-property.types.ts"
import type { SkillType } from "akasha/temper/catalog/thing/properties/skill-type.relation-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperSkill = TemperAbility & {
  key: Key
  description: Description
  baseName: BaseName
  esoAbilityId: EsoAbilityId
  isMorph: IsMorph
  learnedLevel: LearnedLevel
  lineRankNeeded: LineRankNeeded
  morphIndex: MorphIndex
  rank: SkillRank
  skillType: SkillType
  status?: SkillStatus
  skillLineId: SkillLine
  hashPlace: HashPlace
  variants?: SkillVariants
}
