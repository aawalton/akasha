import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperCompanionArmorWeight } from "akasha/temper/catalog/companion/armor-weight/temper-companion-armor-weight.page-type.ts"
import type { TemperCompanionArmorWeight } from "akasha/temper/catalog/companion/armor-weight/temper-companion-armor-weight.page-type.types.ts"
import { temperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.ts"
import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"
import { temperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.ts"
import type { TemperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.types.ts"
import { temperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.ts"
import type { TemperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.types.ts"

type Places = Record<number, number>

type Placed = { readonly hashPlace: number }

type TraitNumbers = Pick<
  TemperCompanionTrait,
  "hashPlace" | "esoArmorTraitType" | "esoJewelryTraitType" | "esoWeaponTraitType"
>

function placesBy<Page extends Placed>(
  this: void,
  pages: readonly Page[],
  gameNumberOf: (this: void, page: Page) => number | undefined
): Places {
  const found: Places = {}
  for (const page of pages) {
    const gameNumber = gameNumberOf(page)
    if (gameNumber !== undefined) found[gameNumber] = page.hashPlace
  }
  return found
}

const TRAITS = $pagesOfType<TraitNumbers>(temperCompanionTrait)

export const ARMOR_TRAIT_TO_INDEX: Places = placesBy(TRAITS, (one) => one.esoArmorTraitType)

export const JEWELRY_TRAIT_TO_INDEX: Places = placesBy(TRAITS, (one) => one.esoJewelryTraitType)

export const WEAPON_TRAIT_TO_INDEX: Places = placesBy(TRAITS, (one) => one.esoWeaponTraitType)

export const QUALITY_TO_INDEX: Places = placesBy(
  $pagesOfType<Pick<TemperQuality, "esoDisplayQuality" | "hashPlace">>(temperQuality),
  (one) => one.esoDisplayQuality
)

export const ARMOR_TYPE_TO_INDEX: Places = placesBy(
  $pagesOfType<Pick<TemperCompanionArmorWeight, "armorType" | "hashPlace">>(
    temperCompanionArmorWeight
  ),
  (one) => one.armorType
)

const WEAPON_TYPE_TO_INDEX: Places = placesBy(
  $pagesOfType<Pick<TemperCompanionWeaponType, "esoWeaponTypeNumber" | "hashPlace">>(
    temperCompanionWeaponType
  ),
  (one) => one.esoWeaponTypeNumber
)

export function getArmorTraitIndex(traitType: number): number {
  return ARMOR_TRAIT_TO_INDEX[traitType] ?? 0
}

export function getJewelryTraitIndex(traitType: number): number {
  return JEWELRY_TRAIT_TO_INDEX[traitType] ?? 0
}

export function getWeaponTraitIndex(traitType: number): number {
  return WEAPON_TRAIT_TO_INDEX[traitType] ?? 0
}

export function getQualityIndex(displayQuality: number): number {
  return QUALITY_TO_INDEX[displayQuality] ?? 0
}

export function getArmorWeightIndex(armorType: number): number {
  return ARMOR_TYPE_TO_INDEX[armorType] ?? 0
}

export function getWeaponTypeIndex(weaponType: number): number {
  return WEAPON_TYPE_TO_INDEX[weaponType] ?? 0
}
