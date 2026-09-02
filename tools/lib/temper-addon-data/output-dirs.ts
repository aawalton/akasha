import { existsSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { temperFile } from "./code-tree.ts"
import { COMPANIONS_OUTPUT_DIR, OUTPUT_DIR } from "./constants.ts"

const out = (rel: string): string => temperFile(`${rel}/src/generated`)

export const TEMPER_INVENTORY_OUTPUT_DIR = out("game-items-addon")
export const TEMPER_EQUIPMENT_OUTPUT_DIR = out("game-characters-equipment")
export const TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR = temperFile("game-characters-equipment/src/armor/generated")
export const TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR = temperFile("game-characters-equipment/src/enchants/generated")
export const TEMPER_EQUIPMENT_JEWELRY_OUTPUT_DIR = temperFile("game-characters-equipment/src/jewelry/generated")
export const TEMPER_EQUIPMENT_SETS_OUTPUT_DIR = temperFile("game-characters-equipment/src/sets/generated")
export const TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR = temperFile("game-characters-equipment/src/traits/generated")
export const TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR = temperFile("game-characters-equipment/src/weapons/generated")
export const TEMPER_CHARACTER_OUTPUT_DIR = out("game-characters-character")
export const TEMPER_CHARACTER_GENERATED_DIR = out("game-characters-character")
export const TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR = out("game-characters-capture-addon")
export const TEMPER_COMPANIONS_OUTPUT_DIR = out("game-companions-core")
export const TEMPER_COMPLETION_OUTPUT_DIR = out("player-completion")
export const TEMPER_ADDONS_CHARACTERS_GENERATED_DIR = out("player-completion-addon")
export const TEMPER_INVENTORY_CORE_OUTPUT_DIR = out("game-items-core")
export const TEMPER_PRICING_OUTPUT_DIR = out("game-trading-pricing")
export const TEMPER_SKILLS_OUTPUT_DIR = out("game-characters-skills")
export const TEMPER_STATS_OUTPUT_DIR = out("game-characters-stats")
export const WEB_ENGINE_INVENTORY_DIR = out("game-items-rules-core")

const ALL_OUTPUT_DIRS: readonly string[] = [
  OUTPUT_DIR,
  COMPANIONS_OUTPUT_DIR,
  TEMPER_INVENTORY_OUTPUT_DIR,
  TEMPER_EQUIPMENT_OUTPUT_DIR,
  TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR,
  TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR,
  TEMPER_EQUIPMENT_JEWELRY_OUTPUT_DIR,
  TEMPER_EQUIPMENT_SETS_OUTPUT_DIR,
  TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR,
  TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR,
  TEMPER_CHARACTER_OUTPUT_DIR,
  TEMPER_CHARACTER_GENERATED_DIR,
  TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR,
  TEMPER_COMPANIONS_OUTPUT_DIR,
  TEMPER_COMPLETION_OUTPUT_DIR,
  TEMPER_ADDONS_CHARACTERS_GENERATED_DIR,
  TEMPER_INVENTORY_CORE_OUTPUT_DIR,
  TEMPER_PRICING_OUTPUT_DIR,
  TEMPER_SKILLS_OUTPUT_DIR,
  TEMPER_STATS_OUTPUT_DIR,
  WEB_ENGINE_INVENTORY_DIR,
]

export function assertOutputDirParentsExist(dirs: readonly string[] = ALL_OUTPUT_DIRS): undefined {
  for (const dir of dirs) {
    const parent = dirname(dir)
    if (!existsSync(parent)) {
      throw new Error(
        `Codegen output dir is orphaned: "${dir}" has no existing parent at "${parent}". ` +
          "A generated target's package was likely moved or renamed without updating output-dirs.ts."
      )
    }
  }
  return undefined
}

export function ensureAllOutputDirs(): undefined {
  assertOutputDirParentsExist()
  for (const dir of ALL_OUTPUT_DIRS) {
    mkdirSync(dir, { recursive: true })
  }
  return undefined
}
