import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const SCRIPT_TYPES = ["focus", "signature", "affix"] as const

const TIER_ACHIEVEMENT_SCHEMA = z
  .object({
    id: z.string().optional(),
    achievementId: z.number().int().nonnegative(),
    name: z.string(),
  })
  .strict()

const SCRIBING_SOURCE_EAV_SCHEMA = z
  .object({
    scriptType: z.enum(SCRIPT_TYPES),
    displayOrder: z.number().int().nonnegative(),
    tierAchievements: z.array(TIER_ACHIEVEMENT_SCHEMA),
    zoneSlugs: z.array(z.string()),
  })
  .strict()

const ZONE_LOOKUP_SCHEMA = z
  .object({
    isDlc: z.boolean(),
    dropsScripts: z.boolean(),
  })
  .strict()

interface ParsedScribingSource {
  scriptType: (typeof SCRIPT_TYPES)[number]
  label: string
  displayOrder: number
  achievements: readonly { achievementId: number; name: string }[]
  zoneSlugs: readonly string[]
}

interface ZoneLookup {
  title: string
  dropsScripts: boolean
}

function parseScribingSource(row: Page): ParsedScribingSource {
  if (row.title === null) {
    throw new Error(`temper-scribing-source row ${row.id} has null title`)
  }
  const eav = SCRIBING_SOURCE_EAV_SCHEMA.parse({
    scriptType: row.scriptType,
    displayOrder: row.displayOrder,
    tierAchievements: row.tierAchievements,
    zoneSlugs: row.zoneSlugs,
  })
  return {
    scriptType: eav.scriptType,
    label: row.title,
    displayOrder: eav.displayOrder,
    achievements: eav.tierAchievements,
    zoneSlugs: eav.zoneSlugs,
  }
}

function buildZoneLookup(zoneRows: readonly Page[]): ReadonlyMap<string, ZoneLookup> {
  const out = new Map<string, ZoneLookup>()
  for (const row of zoneRows) {
    if (row.title === null) {
      throw new Error(`temper-zone row ${row.id} has null title`)
    }
    if (typeof row.slug !== "string") {
      throw new Error(`temper-zone row ${row.id} has no slug`)
    }
    const eav = ZONE_LOOKUP_SCHEMA.parse({ isDlc: row.isDlc, dropsScripts: row.dropsScripts })
    out.set(row.slug, { title: row.title, dropsScripts: eav.dropsScripts })
  }
  return out
}

function validateZoneSlugs(
  source: ParsedScribingSource,
  zoneBySlug: ReadonlyMap<string, ZoneLookup>
): undefined {
  for (const zoneSlug of source.zoneSlugs) {
    const zone = zoneBySlug.get(zoneSlug)
    if (zone === undefined) {
      throw new Error(
        `temper-scribing-source ${source.label}: zoneSlugs entry ${zoneSlug} is not a temper-zone row`
      )
    }
    if (!zone.dropsScripts) {
      throw new Error(
        `temper-scribing-source ${source.label}: zone ${zone.title} has dropsScripts=false — cannot classify as a script source`
      )
    }
  }
}

const SCRIPT_TYPE_RANK: Record<(typeof SCRIPT_TYPES)[number], number> = {
  focus: 0,
  signature: 1,
  affix: 2,
}

export function generateTemperScribingSources(
  sourceRows: readonly Page[],
  zoneRows: readonly Page[]
): string {
  const sources = sourceRows.map(parseScribingSource)
  const zoneBySlug = buildZoneLookup(zoneRows)

  for (const source of sources) validateZoneSlugs(source, zoneBySlug)

  const sortedSources = [...sources].sort((a, b) => {
    const rankDelta = SCRIPT_TYPE_RANK[a.scriptType] - SCRIPT_TYPE_RANK[b.scriptType]
    if (rankDelta !== 0) return rankDelta
    return a.displayOrder - b.displayOrder
  })

  const sourceLines = sortedSources.map((s) => {
    const achievementLines = s.achievements
      .map((a) => `      { achievementId: ${a.achievementId}, name: ${JSON.stringify(a.name)} },`)
      .join("\n")
    return `\
  {
    scriptType: ${JSON.stringify(s.scriptType)},
    label: ${JSON.stringify(s.label)},
    achievements: [
${achievementLines}
    ],
  },`
  })

  return `\
/**
 * Temper Scribing Sources (Generated)
 *
 * ESO scribing script sources + tier achievements, sourced from the universal
 * pages table (page type: temper-scribing-source).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ScribingSource } from "../scribing-sources"

export const SCRIBING_SOURCES = [
${sourceLines.join("\n")}
] as const satisfies readonly ScribingSource[]
`
}
