import type { MaxQuests } from "akasha/temper/characters/temper-skill-points/properties/max-quests.number-property.types.ts"
import type { MaxSkyshards } from "akasha/temper/characters/temper-skill-points/properties/max-skyshards.number-property.types.ts"
import type { MaxValue } from "akasha/temper/characters/temper-skill-points/properties/max-value.number-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/characters/things/temper-character-thing.page-type.types.ts"
import type { Category } from "akasha/temper/things/properties/category.text-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperSkillPoint = TemperCharacterThing & {
  key: Key
  category: Category
  maxQuests?: MaxQuests
  maxSkyshards?: MaxSkyshards
  maxValue?: MaxValue
}
