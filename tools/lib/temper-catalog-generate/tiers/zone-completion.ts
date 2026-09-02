
import { zoneCompletionCatalogSchema } from "@akasha/temper-game-catalog-capture-host/zone-completion-catalog-schema"
import { CATALOG_SAVED_VARIABLES, type Tier, type TierEmit } from "../harness.ts"
import { dataError } from "../../exit.ts"

const COMPLETION_TYPE_LABELS: Record<number, string> = {
  1: "Priority Quests",
  2: "Points of Interest",
  3: "Featured Achievements",
  4: "Wayshrines",
  5: "Delves",
  6: "Set Stations",
  7: "Skyshards",
  8: "World Events",
  9: "Striking Locales",
  10: "Group Bosses",
  11: "Mages Guild Books",
  12: "Mundus Stones",
  13: "Public Dungeons",
  14: "Group Delves",
}

interface ZoneCompletionActivityEntry {
  activityIndex: number
  activityId: number
  name: string
}

interface ZoneCompletionTypeEntry {
  completionType: number
  label: string
  activities: readonly ZoneCompletionActivityEntry[]
}

interface ZoneCompletionZoneEntry {
  zoneId: number
  name: string
  completionTypes: readonly ZoneCompletionTypeEntry[]
}

function extractZoneCompletionDataFromSavedVars(
  accountWide: Record<string, unknown>
): readonly ZoneCompletionZoneEntry[] {
  if (accountWide.zoneCompletionCatalog === undefined)
    throw dataError(
      "No zoneCompletionCatalog found. Deploy the TemperCatalog addon and log in to collect it."
    )

  const zoneCompletionCatalog = zoneCompletionCatalogSchema.parse(accountWide.zoneCompletionCatalog)

  const zones: ZoneCompletionZoneEntry[] = []

  for (const [zoneKey, zone] of Object.entries(zoneCompletionCatalog)) {
    const zoneId = Number(zoneKey)

    const typeEntries: ZoneCompletionTypeEntry[] = []

    for (const [typeKey, typeData] of Object.entries(zone.completionTypes)) {
      const completionType = Number(typeKey)

      const activityEntries: ZoneCompletionActivityEntry[] = []

      for (const [actKey, activity] of Object.entries(typeData.activities)) {
        const activityIndex = Number(actKey)
        activityEntries.push({
          activityIndex,
          activityId: activity.activityId,
          name: activity.name,
        })
      }

      activityEntries.sort((a, b) => a.activityIndex - b.activityIndex)

      if (activityEntries.length > 0) {
        typeEntries.push({
          completionType,
          label: COMPLETION_TYPE_LABELS[completionType] ?? `Type ${completionType}`,
          activities: activityEntries,
        })
      }
    }

    typeEntries.sort((a, b) => a.completionType - b.completionType)

    if (typeEntries.length > 0) {
      zones.push({ zoneId, name: zone.name, completionTypes: typeEntries })
    }
  }

  const byName = new Map<string, ZoneCompletionZoneEntry>()
  for (const zone of zones) {
    const existing = byName.get(zone.name)
    if (!existing || zone.completionTypes.length > existing.completionTypes.length) {
      byName.set(zone.name, zone)
    }
  }
  const deduped = [...byName.values()]

  deduped.sort((a, b) => a.name.localeCompare(b.name))

  return deduped
}

function generateDataFile(zones: readonly ZoneCompletionZoneEntry[], apiVersion: string): string {
  const totalTypes = zones.reduce((sum, z) => sum + z.completionTypes.length, 0)
  const totalActivities = zones.reduce(
    (sum, z) => sum + z.completionTypes.reduce((tSum, t) => tSum + t.activities.length, 0),
    0
  )

  return `\
/**
 * Zone Completion Static Data (Generated)
 *
 * ${zones.length} zones, ${totalTypes} completion types, ${totalActivities} activities
 *
 * apiVersion: ${apiVersion}
 * DO NOT EDIT — regenerate with: ops temper catalog generate zone-completion
 */

interface ZoneCompletionActivityEntry {
  activityIndex: number
  activityId: number
  name: string
}

interface ZoneCompletionTypeEntry {
  completionType: number
  label: string
  activities: readonly ZoneCompletionActivityEntry[]
}

interface ZoneCompletionZoneEntry {
  zoneId: number
  name: string
  completionTypes: readonly ZoneCompletionTypeEntry[]
}

export const zoneCompletionData: ZoneCompletionZoneEntry[] = ${JSON.stringify(zones, null, 2)}
`
}

export const tier: Tier = {
  slug: "zone-completion",
  summary: "Zone completion activities, by zone and completion type",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "temper/player-completion/src/generated/zone-completion-data.generated.ts",
  format: true,
  emit: (accountWide, apiVersion): TierEmit => {
    const zones = extractZoneCompletionDataFromSavedVars(accountWide)

    const totalTypes = zones.reduce((sum, z) => sum + z.completionTypes.length, 0)
    const totalActivities = zones.reduce(
      (sum, z) => sum + z.completionTypes.reduce((tSum, t) => tSum + t.activities.length, 0),
      0
    )

    return {
      content: generateDataFile(zones, apiVersion),
      report: [
        `Found ${zones.length} zones, ${totalTypes} completion types, ${totalActivities} activities (apiVersion: ${apiVersion})`,
      ],
    }
  },
}
