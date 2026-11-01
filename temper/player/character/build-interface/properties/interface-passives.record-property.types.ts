import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { SkillRank } from "akasha/temper/catalog/skill/properties/skill-rank.number-property.types.ts"
import type { PassiveSkill } from "akasha/temper/player/character/build-interface/properties/passive-skill.relation-property.types.ts"

export type InterfacePassives = List<{
  skill: PassiveSkill
  rank?: SkillRank
}>
