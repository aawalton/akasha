import { existsSync, readFileSync } from "node:fs"
import { temperFile } from "./code-tree.ts"
import { equipmentQualities } from "./code/quality-data.ts"
import {
  companionArmorWeightIds,
  companionTraitIds,
  companionWeaponTypeIds,
} from "./code/companion-codec-indices.ts"
import { z } from "zod"

const RAW_MATCH_OR_NULL = z.array(z.string()).min(2).nullable()

function parseEntriesBody(content: string, label: string): string | null {
  const re = new RegExp(`${label}.*?\\{([^}]+)\\}`, "s")
  const raw = RAW_MATCH_OR_NULL.parse(re.exec(content))
  if (raw === null) return null
  const captured = raw[1]
  return captured ?? null
}

function countSlots(body: string): number {
  const result = z.array(z.string()).safeParse(body.match(/\[\w+\]/g))
  return result.success ? result.data.length : 0
}

export function validateEquipmentMappings(): boolean {
  const equipmentPath = temperFile("game-characters-capture-addon/src/build/equipment-mappings.ts")

  if (!existsSync(equipmentPath)) {
    console.error(
      `  Equipment validation FAILED: committed mappings file not found at ${equipmentPath} — the resolve() path is stale (addon moved). Repoint validateEquipmentMappings().`
    )
    return false
  }

  const content = z.string().parse(readFileSync(equipmentPath, "utf-8"))
  let errors = 0

  const traitBody = parseEntriesBody(content, "ARMOR_TRAIT_TO_INDEX")
  if (traitBody !== null) {
    const traitCount = countSlots(traitBody)
    if (traitCount !== companionTraitIds.length) {
      console.error(
        `  Equipment mismatch: ARMOR_TRAIT_TO_INDEX has ${traitCount} entries, temper has ${companionTraitIds.length} traits`
      )
      errors++
    }
  }

  const qualityBody = parseEntriesBody(content, "QUALITY_TO_INDEX")
  if (qualityBody !== null) {
    const qualityCount = countSlots(qualityBody)
    if (qualityCount !== equipmentQualities.ids.length) {
      console.error(
        `  Equipment mismatch: QUALITY_TO_INDEX has ${qualityCount} entries, temper has ${equipmentQualities.ids.length} qualities`
      )
      errors++
    }
  }

  const weightBody = parseEntriesBody(content, "ARMOR_TYPE_TO_INDEX")
  if (weightBody !== null) {
    const weightCount = countSlots(weightBody)
    if (weightCount !== companionArmorWeightIds.length) {
      console.error(
        `  Equipment mismatch: ARMOR_TYPE_TO_INDEX has ${weightCount} entries, temper has ${companionArmorWeightIds.length} weights`
      )
      errors++
    }
  }

  const weaponBody = parseEntriesBody(content, "WEAPON_TYPE_TO_INDEX")
  if (weaponBody !== null) {
    const weaponCount = countSlots(weaponBody)
    if (weaponCount !== companionWeaponTypeIds.length) {
      console.error(
        `  Equipment mismatch: WEAPON_TYPE_TO_INDEX has ${weaponCount} entries, temper has ${companionWeaponTypeIds.length} weapon types`
      )
      errors++
    }
  }

  return errors === 0
}
