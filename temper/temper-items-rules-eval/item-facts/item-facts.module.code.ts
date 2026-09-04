import type { InventoryLocationConditionId } from "@akasha/temper-items-core/location-condition"
import type { ItemKey } from "@akasha/temper-items-rules-core/use-destination-types"

export interface ItemFacts {
  readonly itemId: number
  readonly itemName: string
  readonly itemLink: string

  readonly stackCount?: number
  readonly maxStackSize?: number
  readonly quality?: number
  readonly requiredLevel?: number
  readonly requiredCP?: number

  readonly itemType?: number
  readonly specializedItemType?: number
  readonly filterType?: number
  readonly traitType?: number
  readonly equipType?: number
  readonly weaponType?: number
  readonly armorType?: number
  readonly furnitureCategoryId?: number
  readonly furnitureSubcategoryId?: number
  readonly setId?: number

  readonly isContainer?: boolean
  readonly isStolen?: boolean
  readonly isBound?: boolean
  readonly isBoPTradeable?: boolean
  readonly isQuestRelevant?: boolean
  readonly isCrafted?: boolean
  readonly isLocked?: boolean
  readonly isReconstructed?: boolean
  readonly isTransmuted?: boolean

  readonly estimatedValue?: number
  readonly merchantValue?: number
  readonly replacementCost?: number

  readonly known?: boolean

  readonly isKnowledgeItem?: boolean

  readonly location?: InventoryLocationConditionId

  readonly potionEffectMetricIds?: readonly string[]

  readonly itemKey?: ItemKey

  readonly categoryNodeIds?: ReadonlyArray<string>
}
