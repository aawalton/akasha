import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { EquipType } from "akasha/temper/catalog/companion/thing/properties/equip-type.number-property.types.ts"
import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { AbilityCooldown } from "akasha/temper/player/character/temper-mine/properties/ability-cooldown.number-property.types.ts"
import type { AbilityDescription } from "akasha/temper/player/character/temper-mine/properties/ability-description.text-property.types.ts"
import type { AbilityHeader } from "akasha/temper/player/character/temper-mine/properties/ability-header.text-property.types.ts"
import type { ArmorRating } from "akasha/temper/player/character/temper-mine/properties/armor-rating.number-property.types.ts"
import type { ArmorType } from "akasha/temper/player/character/temper-mine/properties/armor-type.number-property.types.ts"
import type { EnchantDescription } from "akasha/temper/player/character/temper-mine/properties/enchant-description.text-property.types.ts"
import type { EnchantHeader } from "akasha/temper/player/character/temper-mine/properties/enchant-header.text-property.types.ts"
import type { FilterType } from "akasha/temper/player/character/temper-mine/properties/filter-type.number-property.types.ts"
import type { FilterTypeSpecific } from "akasha/temper/player/character/temper-mine/properties/filter-type-specific.number-property.types.ts"
import type { FlavorText } from "akasha/temper/player/character/temper-mine/properties/flavor-text.text-property.types.ts"
import type { HasOnUseAbility } from "akasha/temper/player/character/temper-mine/properties/has-on-use-ability.boolean-property.types.ts"
import type { HasSet } from "akasha/temper/player/character/temper-mine/properties/has-set.boolean-property.types.ts"
import type { IsUnique } from "akasha/temper/player/character/temper-mine/properties/is-unique.boolean-property.types.ts"
import type { IsUniqueEquipped } from "akasha/temper/player/character/temper-mine/properties/is-unique-equipped.boolean-property.types.ts"
import type { ItemQuality } from "akasha/temper/player/character/temper-mine/properties/item-quality.number-property.types.ts"
import type { ItemStyle } from "akasha/temper/player/character/temper-mine/properties/item-style.number-property.types.ts"
import type { ItemType } from "akasha/temper/player/character/temper-mine/properties/item-type.number-property.types.ts"
import type { MerchantValue } from "akasha/temper/player/character/temper-mine/properties/merchant-value.number-property.types.ts"
import type { MinedAt } from "akasha/temper/player/character/temper-mine/properties/mined-at.instant-property.types.ts"
import type { RequiredCp } from "akasha/temper/player/character/temper-mine/properties/required-cp.number-property.types.ts"
import type { RequiredLevel } from "akasha/temper/player/character/temper-mine/properties/required-level.number-property.types.ts"
import type { SetBonuses } from "akasha/temper/player/character/temper-mine/properties/set-bonuses.record-property.types.ts"
import type { SetId } from "akasha/temper/player/character/temper-mine/properties/set-id.number-property.types.ts"
import type { SetMaxEquip } from "akasha/temper/player/character/temper-mine/properties/set-max-equip.number-property.types.ts"
import type { SetName } from "akasha/temper/player/character/temper-mine/properties/set-name.text-property.types.ts"
import type { SpecializedItemType } from "akasha/temper/player/character/temper-mine/properties/specialized-item-type.number-property.types.ts"
import type { TraitDescription } from "akasha/temper/player/character/temper-mine/properties/trait-description.text-property.types.ts"
import type { TraitType } from "akasha/temper/player/character/temper-mine/properties/trait-type.number-property.types.ts"
import type { WeaponPower } from "akasha/temper/player/character/temper-mine/properties/weapon-power.number-property.types.ts"
import type { WeaponType } from "akasha/temper/player/character/temper-mine/properties/weapon-type.number-property.types.ts"
import type { ItemName } from "akasha/temper/player/holdings/temper-sale/properties/item-name.text-property.types.ts"
import type { Icon } from "akasha/temper/thing/properties/icon.text-property.types.ts"

export type Items = "jsonl"

export type ItemsRow = {
  id: Id
  title: Title
  name?: ItemName
  icon: Icon
  minedAt: MinedAt
  itemId: ItemId
  itemType: ItemType
  quality: ItemQuality
  style: ItemStyle
  merchantValue: MerchantValue
  abilityCooldown: AbilityCooldown
  abilityDescription: AbilityDescription
  abilityHeader: AbilityHeader
  armorRating: ArmorRating
  armorType: ArmorType
  enchantDescription: EnchantDescription
  enchantHeader: EnchantHeader
  equipType: EquipType
  filterType: FilterType
  filterTypeSpecific: FilterTypeSpecific
  flavorText: FlavorText
  hasOnUseAbility: HasOnUseAbility
  hasSet: HasSet
  isUnique: IsUnique
  isUniqueEquipped: IsUniqueEquipped
  requiredCp: RequiredCp
  requiredLevel: RequiredLevel
  setBonuses: SetBonuses
  setId: SetId
  setMaxEquip: SetMaxEquip
  setName: SetName
  specializedItemType: SpecializedItemType
  traitDescription: TraitDescription
  traitType: TraitType
  weaponPower: WeaponPower
  weaponType: WeaponType
}
