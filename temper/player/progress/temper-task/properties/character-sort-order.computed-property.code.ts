import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"
import type { CharacterSortOrder } from "akasha/temper/player/progress/temper-task/properties/character-sort-order.computed-property.types.ts"

type Kept = { readonly effectiveCharacter?: string }

export const work: Work<Kept, CharacterSortOrder> = (_page, reach) =>
  reach.through<CharacterSortOrder>("effectiveCharacter", "displayOrder")
