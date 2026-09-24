import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { EquipType } from "akasha/temper/catalog/companion/thing/properties/equip-type.number-property.types.ts"
import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { AmountCount } from "akasha/temper/player/character/temper-account/properties/amount-count.number-property.types.ts"
import type { Bag } from "akasha/temper/player/character/temper-account/properties/bag.number-property.types.ts"
import type { BopTradeable } from "akasha/temper/player/character/temper-account/properties/bop-tradeable.boolean-property.types.ts"
import type { Bound } from "akasha/temper/player/character/temper-account/properties/bound.boolean-property.types.ts"
import type { Crafted } from "akasha/temper/player/character/temper-account/properties/crafted.boolean-property.types.ts"
import type { FurnitureCategory } from "akasha/temper/player/character/temper-account/properties/furniture-category.text-property.types.ts"
import type { FurnitureCategoryId } from "akasha/temper/player/character/temper-account/properties/furniture-category-id.number-property.types.ts"
import type { FurnitureSubcategoryId } from "akasha/temper/player/character/temper-account/properties/furniture-subcategory-id.number-property.types.ts"
import type { IsContainer } from "akasha/temper/player/character/temper-account/properties/is-container.boolean-property.types.ts"
import type { ItemLink } from "akasha/temper/player/character/temper-account/properties/item-link.text-property.types.ts"
import type { Known } from "akasha/temper/player/character/temper-account/properties/known.boolean-property.types.ts"
import type { LocationId } from "akasha/temper/player/character/temper-account/properties/location-id.text-property.types.ts"
import type { Locked } from "akasha/temper/player/character/temper-account/properties/locked.boolean-property.types.ts"
import type { MarketValue } from "akasha/temper/player/character/temper-account/properties/market-value.number-property.types.ts"
import type { MinPrice } from "akasha/temper/player/character/temper-account/properties/min-price.number-property.types.ts"
import type { QuestRelevant } from "akasha/temper/player/character/temper-account/properties/quest-relevant.boolean-property.types.ts"
import type { Reconstructed } from "akasha/temper/player/character/temper-account/properties/reconstructed.boolean-property.types.ts"
import type { ReplacementValue } from "akasha/temper/player/character/temper-account/properties/replacement-value.number-property.types.ts"
import type { SaleAmountCount } from "akasha/temper/player/character/temper-account/properties/sale-amount-count.number-property.types.ts"
import type { SaleAvg } from "akasha/temper/player/character/temper-account/properties/sale-avg.number-property.types.ts"
import type { Slot } from "akasha/temper/player/character/temper-account/properties/slot.number-property.types.ts"
import type { StackCount } from "akasha/temper/player/character/temper-account/properties/stack-count.number-property.types.ts"
import type { Stolen } from "akasha/temper/player/character/temper-account/properties/stolen.boolean-property.types.ts"
import type { SuggestedPrice } from "akasha/temper/player/character/temper-account/properties/suggested-price.number-property.types.ts"
import type { Transmuted } from "akasha/temper/player/character/temper-account/properties/transmuted.boolean-property.types.ts"
import type { ArmorType } from "akasha/temper/player/character/temper-mine/properties/armor-type.number-property.types.ts"
import type { FilterType } from "akasha/temper/player/character/temper-mine/properties/filter-type.number-property.types.ts"
import type { ItemQuality } from "akasha/temper/player/character/temper-mine/properties/item-quality.number-property.types.ts"
import type { ItemType } from "akasha/temper/player/character/temper-mine/properties/item-type.number-property.types.ts"
import type { MerchantValue } from "akasha/temper/player/character/temper-mine/properties/merchant-value.number-property.types.ts"
import type { RequiredCp } from "akasha/temper/player/character/temper-mine/properties/required-cp.number-property.types.ts"
import type { RequiredLevel } from "akasha/temper/player/character/temper-mine/properties/required-level.number-property.types.ts"
import type { SetId } from "akasha/temper/player/character/temper-mine/properties/set-id.number-property.types.ts"
import type { SpecializedItemType } from "akasha/temper/player/character/temper-mine/properties/specialized-item-type.number-property.types.ts"
import type { TraitType } from "akasha/temper/player/character/temper-mine/properties/trait-type.number-property.types.ts"
import type { WeaponType } from "akasha/temper/player/character/temper-mine/properties/weapon-type.number-property.types.ts"

export type Stacks = "jsonl"

export type StacksRow = {
  id: Id
  locationId: LocationId
  bag: Bag
  slot: Slot
  itemId: ItemId
  title: Title
  itemLink: ItemLink
  quality: ItemQuality
  filterType: FilterType
  itemType: ItemType
  traitType: TraitType
  requiredLevel: RequiredLevel
  requiredCp: RequiredCp
  stackCount: StackCount
  stolen?: Stolen
  bound?: Bound
  reconstructed?: Reconstructed
  transmuted?: Transmuted
  locked?: Locked
  crafted?: Crafted
  bopTradeable?: BopTradeable
  questRelevant?: QuestRelevant
  specializedItemType?: SpecializedItemType
  merchantValue?: MerchantValue
  minPrice?: MinPrice
  amountCount?: AmountCount
  marketValue?: MarketValue
  suggestedPrice?: SuggestedPrice
  saleAvg?: SaleAvg
  saleAmountCount?: SaleAmountCount
  equipType?: EquipType
  armorType?: ArmorType
  weaponType?: WeaponType
  setId?: SetId
  known?: Known
  replacementValue?: ReplacementValue
  furnitureCategory?: FurnitureCategory
  furnitureCategoryId?: FurnitureCategoryId
  furnitureSubcategoryId?: FurnitureSubcategoryId
  isContainer?: IsContainer
}
