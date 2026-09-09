import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages/code-root"
import { equipmentQualities } from "@akasha/temper-equipment-kinds/equipment-qualities"
import {
  COMPANION_ARMOR_WEIGHT_IDS,
  companionTraitIds,
  companionWeaponTypeIds,
} from "akasha/temper/companion-codec/companion-codec-indices/companion-codec-indices.module.code.ts"
import { z } from "zod"

const EQUIPMENT_MAPPINGS = "temper-bit-codec/equipment-mappings/equipment-mappings.module.code.ts"

interface Table {
  readonly label: string
  readonly held: readonly string[]
  readonly what: string
}

const TABLES: readonly Table[] = [
  { label: "ARMOR_TRAIT_TO_INDEX", held: companionTraitIds, what: "traits" },
  { label: "QUALITY_TO_INDEX", held: equipmentQualities.ids, what: "qualities" },
  { label: "ARMOR_TYPE_TO_INDEX", held: COMPANION_ARMOR_WEIGHT_IDS, what: "weights" },
  { label: "WEAPON_TYPE_TO_INDEX", held: companionWeaponTypeIds, what: "weapon types" },
]

const RAW_MATCH_OR_NULL = z.array(z.string()).min(2).nullable()

function committedAt(): string {
  return resolve(codeRoot(), "temper", EQUIPMENT_MAPPINGS)
}

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
  const equipmentPath = committedAt()

  if (!existsSync(equipmentPath)) {
    console.error(
      `  Equipment validation FAILED: committed mappings file not found at ${equipmentPath} — the resolve() path is stale (the module moved). Repoint EQUIPMENT_MAPPINGS.`
    )
    return false
  }

  const content = z.string().parse(readFileSync(equipmentPath, "utf-8"))
  let errors = 0

  for (const { label, held, what } of TABLES) {
    const body = parseEntriesBody(content, label)
    if (body === null) {
      console.error(
        `  Equipment validation FAILED: ${equipmentPath} states no ${label}, so nothing was compared against temper's ${held.length} ${what}`
      )
      errors++
      continue
    }
    const found = countSlots(body)
    if (found !== held.length) {
      console.error(
        `  Equipment mismatch: ${label} has ${found} entries, temper has ${held.length} ${what}`
      )
      errors++
    }
  }

  return errors === 0
}
