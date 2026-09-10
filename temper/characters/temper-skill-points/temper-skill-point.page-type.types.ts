import type { Category } from "../../things/properties/category.text-property.ts"
import type { Key } from "../../things/properties/key.text-property.ts"
import type { TemperCharacterThing } from "../things/temper-character-thing.page-type.types.ts"
import type { MaxQuests } from "./properties/max-quests.number-property.ts"
import type { MaxSkyshards } from "./properties/max-skyshards.number-property.ts"
import type { MaxValue } from "./properties/max-value.number-property.ts"

export type TemperSkillPoint = TemperCharacterThing & {
  key: Key
  category: Category
  maxQuests?: MaxQuests
  maxSkyshards?: MaxSkyshards
  maxValue?: MaxValue
}
