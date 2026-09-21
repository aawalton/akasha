import type { MaxQuests } from "akasha/temper/player/character/temper-skill-point/properties/max-quests.number-property.types.ts"
import type { MaxSkyshards } from "akasha/temper/player/character/temper-skill-point/properties/max-skyshards.number-property.types.ts"
import type { MaxValue } from "akasha/temper/player/character/temper-skill-point/properties/max-value.number-property.types.ts"
import type { Pvp } from "akasha/temper/player/character/temper-skill-point/properties/pvp.boolean-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/player/character/thing/temper-character-thing.page-type.types.ts"
import type { Category } from "akasha/temper/thing/properties/category.text-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperSkillPoint = TemperCharacterThing & {
  key: Key
  category: Category
  maxQuests?: MaxQuests
  maxSkyshards?: MaxSkyshards
  maxValue?: MaxValue
  pvp?: Pvp
}
