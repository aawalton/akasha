
import { cadwellCatalogSchema } from "@temper/game-completion-capture-host/cadwell-catalog-schema"
import { CATALOG_SAVED_VARIABLES, type Tier, type TierEmit } from "../harness.ts"
import { dataError } from "../../exit.ts"

const LEVEL_LABELS: Record<number, string> = {
  1: "Silver",
  2: "Gold",
}

interface CadwellPOIData {
  poiIndex: number
  name: string
}

interface CadwellZoneData {
  zoneIndex: number
  name: string
  pois: readonly CadwellPOIData[]
}

interface CadwellLevelData {
  level: number
  label: string
  zones: readonly CadwellZoneData[]
}

function extractCadwellDataFromSavedVars(
  accountWide: Record<string, unknown>
): readonly CadwellLevelData[] {
  if (accountWide.cadwellCatalog === undefined)
    throw dataError(
      "No cadwellCatalog found. Deploy the TemperCatalog addon and log in to collect it."
    )

  const cadwellCatalog = cadwellCatalogSchema.parse(accountWide.cadwellCatalog)

  const levels: CadwellLevelData[] = []

  for (const [levelKey, level] of Object.entries(cadwellCatalog)) {
    const levelNum = Number(levelKey)

    const zoneEntries: {
      zoneIndex: number
      name: string
      order: number
      pois: CadwellPOIData[]
    }[] = []

    for (const [zoneKey, zone] of Object.entries(level.zones)) {
      const zoneIndex = Number(zoneKey)

      const poiEntries: { poiIndex: number; name: string; order: number }[] = []

      for (const [poiKey, poi] of Object.entries(zone.pois)) {
        const poiIndex = Number(poiKey)
        poiEntries.push({ poiIndex, name: poi.name, order: poi.order })
      }

      poiEntries.sort((a, b) => a.order - b.order)

      zoneEntries.push({
        zoneIndex,
        name: zone.name,
        order: zone.order,
        pois: poiEntries.map(({ poiIndex, name }) => ({ poiIndex, name })),
      })
    }

    zoneEntries.sort((a, b) => a.order - b.order)

    levels.push({
      level: levelNum,
      label: LEVEL_LABELS[levelNum] ?? `Level ${levelNum}`,
      zones: zoneEntries.map(({ zoneIndex, name, pois }) => ({ zoneIndex, name, pois })),
    })
  }

  levels.sort((a, b) => a.level - b.level)

  return levels
}

function generateDataFile(levels: readonly CadwellLevelData[], apiVersion: string): string {
  const totalZones = levels.reduce((sum, l) => sum + l.zones.length, 0)
  const totalPois = levels.reduce(
    (sum, l) => sum + l.zones.reduce((zSum, z) => zSum + z.pois.length, 0),
    0
  )

  return `\
/**
 * Cadwell's Almanac Static Data (Generated)
 *
 * ${levels.length} levels, ${totalZones} zones, ${totalPois} POIs
 *
 * apiVersion: ${apiVersion}
 * DO NOT EDIT — regenerate with: ops temper catalog generate cadwell
 */

interface CadwellPOIData {
  poiIndex: number
  name: string
}

interface CadwellZoneData {
  zoneIndex: number
  name: string
  pois: readonly CadwellPOIData[]
}

interface CadwellLevelData {
  level: number
  label: string
  zones: readonly CadwellZoneData[]
}

export const cadwellData: CadwellLevelData[] = ${JSON.stringify(levels, null, 2)}
`
}

export const tier: Tier = {
  slug: "cadwell",
  summary: "Cadwell's Almanac, by level and zone",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "packages/temper/player/completion/src/generated/cadwell-data.generated.ts",
  format: true,
  emit: (accountWide, apiVersion): TierEmit => {
    const levels = extractCadwellDataFromSavedVars(accountWide)

    const totalZones = levels.reduce((sum, l) => sum + l.zones.length, 0)
    const totalPois = levels.reduce(
      (sum, l) => sum + l.zones.reduce((zSum, z) => zSum + z.pois.length, 0),
      0
    )

    return {
      content: generateDataFile(levels, apiVersion),
      report: [
        `Found ${levels.length} levels, ${totalZones} zones, ${totalPois} POIs (apiVersion: ${apiVersion})`,
      ],
    }
  },
}
