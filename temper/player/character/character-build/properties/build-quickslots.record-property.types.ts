import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { QuickslotId } from "akasha/temper/player/character/character-build/properties/quickslot-id.number-property.types.ts"
import type { QuickslotKind } from "akasha/temper/player/character/character-build/properties/quickslot-kind.select-property.types.ts"
import type { QuickslotName } from "akasha/temper/player/character/character-build/properties/quickslot-name.text-property.types.ts"
import type { QuickslotSlot } from "akasha/temper/player/character/character-build/properties/quickslot-slot.number-property.types.ts"

export type BuildQuickslots = List<{
  slot: QuickslotSlot
  kind: QuickslotKind
  id: QuickslotId
  name: QuickslotName
}>
