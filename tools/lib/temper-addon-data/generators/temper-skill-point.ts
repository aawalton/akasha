import type { Page } from "../page.ts"
import { TEMPER_DUNGEONS } from "../code/shared-foundation-misc-dungeons.ts"
import { z } from "zod"

const SKILL_POINT_EAV_SCHEMA = z
  .object({
    key: z.string(),
    category: z.union([z.literal("general"), z.literal("zone")]),
    maxValue: z.number().nullable().optional(),
    maxQuests: z.number().nullable().optional(),
    maxSkyshards: z.number().nullable().optional(),
  })
  .strict()

interface ParsedGeneral {
  category: "general"
  key: string
  label: string
  maxValue: number
}

interface ParsedZone {
  category: "zone"
  key: string
  label: string
  maxQuests: number
  maxSkyshards: number
}

type Parsed = ParsedGeneral | ParsedZone

function parseRow(row: Page): Parsed {
  if (row.title === null) {
    throw new Error(`temper-skill-point row ${row.id} has null title`)
  }
  const eav = SKILL_POINT_EAV_SCHEMA.parse({
    key: row.key,
    category: row.category,
    maxValue: row.maxValue,
    maxQuests: row.maxQuests,
    maxSkyshards: row.maxSkyshards,
  })
  if (eav.category === "general") {
    if (eav.maxValue === null || eav.maxValue === undefined) {
      throw new Error(
        `temper-skill-point row ${row.id} (key=${eav.key}, category=general) is missing maxValue`
      )
    }
    return {
      category: "general",
      key: eav.key,
      label: row.title,
      maxValue: eav.maxValue,
    }
  }
  if (eav.maxQuests === null || eav.maxQuests === undefined) {
    throw new Error(
      `temper-skill-point row ${row.id} (key=${eav.key}, category=zone) is missing maxQuests`
    )
  }
  if (eav.maxSkyshards === null || eav.maxSkyshards === undefined) {
    throw new Error(
      `temper-skill-point row ${row.id} (key=${eav.key}, category=zone) is missing maxSkyshards`
    )
  }
  return {
    category: "zone",
    key: eav.key,
    label: row.title,
    maxQuests: eav.maxQuests,
    maxSkyshards: eav.maxSkyshards,
  }
}

const GENERAL_KEY_RANK: Record<string, number> = {
  level: 0,
  mainQuests: 1,
  tutorial: 2,
  foliumDiscognitum: 3,
  pvpRank: 4,
  maelstromArena: 5,
  endlessArchive: 6,
}

const ZONE_KEY_RANK: Record<string, number> = {
  WP: 0,
  AD0: 1,
  AD1: 2,
  AD2: 3,
  AD3: 4,
  AD4: 5,
  AD5: 6,
  DC0b: 7,
  DC0a: 8,
  DC1: 9,
  DC2: 10,
  DC3: 11,
  DC4: 12,
  DC5: 13,
  EP0b: 14,
  EP0a: 15,
  EP1: 16,
  EP2: 17,
  EP3: 18,
  EP4: 19,
  EP5: 20,
  CH: 21,
  CY: 22,
  CL: 23,
  IC: 24,
  WR: 25,
  HB: 26,
  GC: 27,
  VV: 28,
  CC: 29,
  SU: 30,
  MM: 31,
  NE: 32,
  SE: 33,
  WS: 34,
  TR: 35,
  BW: 36,
  TD: 37,
  HI: 38,
  GY: 39,
  AP: 40,
  WW: 41,
  SO: 42,
}

function rankFromMap(map: Record<string, number>, key: string): number {
  return map[key] ?? Number.MAX_SAFE_INTEGER
}

const PUBLIC_DUNGEONS: ReadonlyArray<{ key: string; label: string }> = [
  { key: "AD1", label: "Toothmaul Gully" },
  { key: "AD2", label: "Root Sunder Ruins" },
  { key: "AD3", label: "Rulanyil's Fall" },
  { key: "AD4", label: "Crimson Cove" },
  { key: "AD5", label: "Vile Manse" },
  { key: "DC1", label: "Bad Man's Hallows" },
  { key: "DC2", label: "Bonesnap Ruins" },
  { key: "DC3", label: "Obsidian Scar" },
  { key: "DC4", label: "Lost City of the Na-Totambu" },
  { key: "DC5", label: "Razak's Wheel" },
  { key: "EP1", label: "Crow's Wood" },
  { key: "EP2", label: "Forgotten Crypts" },
  { key: "EP3", label: "Sanguine's Demesne" },
  { key: "EP4", label: "Hall of the Dead" },
  { key: "EP5", label: "Lion's Den" },
  { key: "CH", label: "Village of the Lost" },
  { key: "VFW", label: "Forgotten Wastes" },
  { key: "VNC", label: "Nchuleftingth" },
  { key: "WOO", label: "Old Orsinium" },
  { key: "WRK", label: "Rkindaleft" },
  { key: "SKW", label: "Karnwasten" },
  { key: "SSH", label: "Sunhold" },
  { key: "RN", label: "Rimmen Necropolis" },
  { key: "OC", label: "Orcrest" },
  { key: "LT", label: "Labyrinthian" },
  { key: "NK", label: "Nchuthnkarst" },
  { key: "SH", label: "Silent Halls" },
  { key: "ZA", label: "Zenithar's Abbey" },
  { key: "GHB", label: "Ghost Haven Bay" },
  { key: "SCC", label: "Crimson Coin" },
  { key: "GO", label: "Gorne" },
  { key: "TU", label: "The Underweave" },
  { key: "LW", label: "Lakewatch" },
  { key: "SI", label: "Silo Indomitus" },
  { key: "DG", label: "Deetra Grotto" },
  { key: "CG", label: "Centurion's Gideon" },
]

export function generateTemperSkillPoint(skillPointRows: readonly Page[]): string {
  const parsed = skillPointRows.map(parseRow)
  const generals: ParsedGeneral[] = []
  const zones: ParsedZone[] = []
  for (const row of parsed) {
    if (row.category === "general") generals.push(row)
    else zones.push(row)
  }
  generals.sort((a, b) => {
    const rankDelta = rankFromMap(GENERAL_KEY_RANK, a.key) - rankFromMap(GENERAL_KEY_RANK, b.key)
    if (rankDelta !== 0) return rankDelta
    return a.key.localeCompare(b.key)
  })
  zones.sort((a, b) => {
    const rankDelta = rankFromMap(ZONE_KEY_RANK, a.key) - rankFromMap(ZONE_KEY_RANK, b.key)
    if (rankDelta !== 0) return rankDelta
    return a.key.localeCompare(b.key)
  })

  const generalLines = generals.map(
    (g) =>
      `  { key: ${JSON.stringify(g.key)}, label: ${JSON.stringify(g.label)}, maxValue: ${g.maxValue} },`
  )
  const zoneLines = zones.map(
    (z) =>
      `  { key: ${JSON.stringify(z.key)}, label: ${JSON.stringify(z.label)}, maxQuests: ${z.maxQuests}, maxSkyshards: ${z.maxSkyshards} },`
  )
  const groupDungeonLines = TEMPER_DUNGEONS.map(
    (d) => `  { key: ${JSON.stringify(d.key)}, label: ${JSON.stringify(d.label)} },`
  )
  const publicDungeonLines = PUBLIC_DUNGEONS.map(
    (d) => `  { key: ${JSON.stringify(d.key)}, label: ${JSON.stringify(d.label)} },`
  )

  return `\
/**
 * Temper Skill Point Sources (Generated)
 *
 * General + zone skill-point sources sourced from the universal pages
 * table (page type: temper-skill-point). Group-dungeon sources are
 * derived from \`TEMPER_DUNGEONS\` at codegen time so the addon and
 * engine resolve the same dungeon labels by construction. Public-dungeon
 * sources are inline in the generator — they have no other catalog home.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type {
  SkillPointDungeonSource,
  SkillPointGeneralSource,
  SkillPointZoneSource,
} from "../skill-points-data"

export const skillPointGeneralSources: readonly SkillPointGeneralSource[] = [
${generalLines.join("\n")}
]

export const skillPointZoneSources: readonly SkillPointZoneSource[] = [
${zoneLines.join("\n")}
]

export const skillPointGroupDungeonSources: readonly SkillPointDungeonSource[] = [
${groupDungeonLines.join("\n")}
]

export const skillPointPublicDungeonSources: readonly SkillPointDungeonSource[] = [
${publicDungeonLines.join("\n")}
]
`
}
