import { existsSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { temperFile } from "./code-tree.ts"
import { COMPANIONS_OUTPUT_DIR } from "./constants.ts"

const out = (rel: string): string => temperFile(`${rel}/src/generated`)

export const TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR = temperFile(
  "game-characters-equipment/src/armor/generated"
)
export const TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR = temperFile(
  "game-characters-equipment/src/enchants/generated"
)
export const TEMPER_EQUIPMENT_SETS_OUTPUT_DIR = temperFile(
  "game-characters-equipment/src/sets/generated"
)
export const TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR = temperFile(
  "game-characters-equipment/src/traits/generated"
)
export const TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR = temperFile(
  "game-characters-equipment/src/weapons/generated"
)
export const TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR = out("game-characters-capture-addon")
export const TEMPER_COMPLETION_OUTPUT_DIR = out("player-completion")
export const TEMPER_INVENTORY_CORE_OUTPUT_DIR = out("game-items-core")
export const TEMPER_SKILLS_OUTPUT_DIR = out("game-characters-skills")
export const TEMPER_STATS_OUTPUT_DIR = out("game-characters-stats")
export const WEB_ENGINE_INVENTORY_DIR = out("game-items-rules-core")

/**
 * The output dirs whose package git still tracks a file under.
 *
 * This list held twelve. Eleven named a package the migration has ablated: measured 2026-09-02,
 * `git ls-files` answers 0 tracked files under each of game-companions-addon,
 * game-characters-equipment, game-characters-capture-addon, game-items-core,
 * game-characters-skills, game-characters-stats and game-items-rules-core, and the parent
 * directory of all eleven is absent from disk. `assertOutputDirParentsExist` threw on the first of
 * them, and `generateAddonData` calls `ensureAllOutputDirs` before any write, so the whole
 * pipeline aborted rather than wrote.
 *
 * The eleven consts are kept because the write table still names them, and they go with the write
 * table when it lands as akasha modules. What must not remain is this list creating eleven
 * directories under packages that ship nothing.
 *
 * Only `temper/player-completion` is still tracked, at 85 files with 13 in its generated folder,
 * so the guard keeps its job for the one destination that still has one.
 */
const ALL_OUTPUT_DIRS: readonly string[] = [TEMPER_COMPLETION_OUTPUT_DIR]

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
