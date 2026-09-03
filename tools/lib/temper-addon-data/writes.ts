import { resolve } from "node:path"
import type { AddonDataPages } from "@akasha/temper-addon-data/addon-data-pages"
import { built } from "@akasha/temper-addon-data/failing-alone"
import { buildAddonDataWritesSkills } from "./writes-skills.ts"
import { buildAddonDataWritesAlchemy } from "./writes/alchemy.ts"
import { buildAddonDataWritesCodec } from "./writes/codec.ts"
import { buildAddonDataWritesCompanionMappings } from "./writes/companion-mappings.ts"
import { buildAddonDataWritesEquipment } from "./writes/equipment.ts"
import { buildAddonDataWritesInventory } from "./writes/inventory.ts"
import { buildAddonDataWritesRules } from "./writes/rules.ts"
import { buildAddonDataWritesScribing } from "./writes/scribing.ts"
import { buildAddonDataWritesSets } from "./writes/sets.ts"
import { buildAddonDataWritesStats } from "./writes/stats.ts"

export type AddonDataWrite = (dir: string, name: string, source: string) => Promise<number>

export const writeToDisk: AddonDataWrite = (dir, name, source) =>
  Bun.write(resolve(dir, name), source)

export type AddonDataSection = readonly [string, (p: AddonDataPages, w: AddonDataWrite) => readonly Promise<number>[]]

export const ADDON_DATA_SECTIONS: readonly AddonDataSection[] = [
  ["codec", (_p, w) => buildAddonDataWritesCodec(w)],
  ["equipment", buildAddonDataWritesEquipment],
  ["sets", buildAddonDataWritesSets],
  ["alchemy", buildAddonDataWritesAlchemy],
  ["inventory", buildAddonDataWritesInventory],
  ["rules", buildAddonDataWritesRules],
  ["scribing", buildAddonDataWritesScribing],
  ["stats", buildAddonDataWritesStats],
  ["companion-mappings", (_p, w) => buildAddonDataWritesCompanionMappings(w)],
  ["skills", buildAddonDataWritesSkills],
]

export function buildAddonDataWrites(
  p: AddonDataPages,
  w: AddonDataWrite = writeToDisk
): readonly Promise<number>[] {
  return ADDON_DATA_SECTIONS.flatMap(([name, build]) => built(name, build, p, w))
}
