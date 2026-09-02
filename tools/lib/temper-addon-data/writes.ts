import { resolve } from "node:path"
import type { AddonDataPages } from "./addon-data-pages.ts"
import { buildAddonDataWritesAlchemy } from "./writes/alchemy.ts"
import { buildAddonDataWritesCharacters } from "./writes/characters.ts"
import { buildAddonDataWritesCodec } from "./writes/codec.ts"
import { buildAddonDataWritesCompanionMappings } from "./writes/companion-mappings.ts"
import { buildAddonDataWritesCompanionRotations } from "./writes/companion-rotations.ts"
import { buildAddonDataWritesCompletion } from "./writes/completion.ts"
import { buildAddonDataWritesEquipment } from "./writes/equipment.ts"
import { buildAddonDataWritesInventory } from "./writes/inventory.ts"
import { buildAddonDataWritesLore } from "./writes/lore.ts"
import { buildAddonDataWritesRules } from "./writes/rules.ts"
import { buildAddonDataWritesScribing } from "./writes/scribing.ts"
import { buildAddonDataWritesSets } from "./writes/sets.ts"
import { buildAddonDataWritesStats } from "./writes/stats.ts"
import { buildAddonDataWritesCompanions } from "./writes-companions.ts"
import { buildAddonDataWritesSkills } from "./writes-skills.ts"


export function buildAddonDataWrites(p: AddonDataPages): readonly Promise<number>[] {
  const w = (dir: string, name: string, source: string): Promise<number> =>
    Bun.write(resolve(dir, name), source)
  return [
    ...buildAddonDataWritesCodec(w),
    ...buildAddonDataWritesEquipment(p, w),
    ...buildAddonDataWritesSets(p, w),
    ...buildAddonDataWritesAlchemy(p, w),
    ...buildAddonDataWritesCharacters(p, w),
    ...buildAddonDataWritesCompletion(p, w),
    ...buildAddonDataWritesLore(p, w),
    ...buildAddonDataWritesInventory(p, w),
    ...buildAddonDataWritesRules(p, w),
    ...buildAddonDataWritesScribing(p, w),
    ...buildAddonDataWritesStats(p, w),
    ...buildAddonDataWritesCompanions(p, w),
    ...buildAddonDataWritesCompanionRotations(p, w),
    ...buildAddonDataWritesCompanionMappings(w),
    ...buildAddonDataWritesSkills(p, w),
  ]
}
