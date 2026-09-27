import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import type { InventoryItemData } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import type { SetBonusEntry } from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"

function listedIn(held: unknown): readonly unknown[] {
  if (Array.isArray(held)) return held
  const record = asRecord(held)
  if (!record) return []
  return Object.keys(record)
    .sort((one, other) => Number(one) - Number(other))
    .map((key) => record[key])
}

function parseSetBonuses(raw: unknown): SetBonusEntry[] | undefined {
  const bonuses: SetBonusEntry[] = []
  for (const held of listedIn(raw)) {
    const bonus = asRecord(held)
    const description = stringIn(bonus?.description)
    if (!bonus || !description) continue
    bonuses.push({
      numRequired: parseNumber(bonus.numRequired) ?? 0,
      description,
      isPerfected: bonus.isPerfected === true,
    })
  }
  return bonuses.length > 0 ? bonuses : undefined
}

export function parseOwnLinkValues(
  item: Record<string, unknown>,
  parsed: InventoryItemData
): undefined {
  const weaponPower = parseNumber(item.weaponPower)
  if (weaponPower !== undefined && weaponPower > 0) parsed.weaponPower = weaponPower

  const armorRating = parseNumber(item.armorRating)
  if (armorRating !== undefined && armorRating > 0) parsed.armorRating = armorRating

  const traitDescription = stringIn(item.traitDescription)
  if (traitDescription) parsed.traitDescription = traitDescription

  const abilityHeader = stringIn(item.abilityHeader)
  const abilityDescription = stringIn(item.abilityDescription)
  if (abilityHeader && abilityDescription) {
    parsed.abilityHeader = abilityHeader
    parsed.abilityDescription = abilityDescription
    const abilityCooldown = parseNumber(item.abilityCooldown)
    if (abilityCooldown !== undefined) parsed.abilityCooldown = abilityCooldown
  }

  const setBonuses = parseSetBonuses(item.setBonuses)
  if (setBonuses) parsed.setBonuses = setBonuses
  return undefined
}
