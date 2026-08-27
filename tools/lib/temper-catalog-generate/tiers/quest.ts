
import {
  extractMinedQuestRows,
  isFullyRead,
  type MinedExtractDiagnostics,
} from "@temper/scripts/mined-data-parse"
import { MINED_SAVED_VARIABLES, type Tier, type TierEmit } from "../harness.ts"
import { dataError } from "../../exit.ts"

const QUEST_REPEAT_NOT_REPEATABLE = 0

const MAX_NAMED_IDS = 20

function nameSome(values: readonly (number | string)[]): string {
  if (values.length <= MAX_NAMED_IDS) return values.join(", ")
  return `${values.slice(0, MAX_NAMED_IDS).join(", ")}, +${values.length - MAX_NAMED_IDS} more`
}

function describeLosses(diagnostics: MinedExtractDiagnostics): string {
  const losses: string[] = []
  if (diagnostics.unreadableIds.length > 0) {
    losses.push(
      `${diagnostics.unreadableIds.length} unreadable (${nameSome(diagnostics.unreadableIds)})`
    )
  }
  if (diagnostics.nonIntegerKeys.length > 0) {
    losses.push(
      `${diagnostics.nonIntegerKeys.length} non-integer key(s) (${nameSome(diagnostics.nonIntegerKeys)})`
    )
  }
  return losses.join(" and ")
}

function unreadableWarnings(
  diagnostics: MinedExtractDiagnostics,
  fullyRead: boolean
): readonly string[] {
  if (fullyRead) return []
  return [
    `⚠ quests: ${describeLosses(diagnostics)} — absent from the generated dataset.`,
    ...diagnostics.reasons.map(({ reason, count }) => `    ${count}× ${reason}`),
  ]
}

function extractQuestData(accountWide: Record<string, unknown>): {
  zoneMap: Map<string, { questId: number; name: string }[]>
  diagnostics: MinedExtractDiagnostics
  fullyRead: boolean
} {
  const { rows, diagnostics } = extractMinedQuestRows(accountWide)
  const fullyRead = isFullyRead(diagnostics)
  if (rows.length === 0) {
    throw dataError(
      fullyRead
        ? "No mined quests found. Deploy the TemperDataMining addon and run quest mining in-game to collect them."
        : `No mined quests could be read: ${describeLosses(diagnostics)}. The mine is not empty — every entry it held was rejected.`
    )
  }

  const zoneMap = new Map<string, { questId: number; name: string }[]>()
  for (const row of rows) {
    if (row.name === "") continue
    if (row.repeatableType !== QUEST_REPEAT_NOT_REPEATABLE) continue

    const zoneName = row.zoneName !== "" ? row.zoneName : "Unknown"
    let group = zoneMap.get(zoneName)
    if (!group) {
      group = []
      zoneMap.set(zoneName, group)
    }
    group.push({ questId: row.questId, name: row.name })
  }

  return { zoneMap, diagnostics, fullyRead }
}

function generateDataFile(
  zoneMap: Map<string, { questId: number; name: string }[]>,
  apiVersion: string
): string {
  const sortedZones = [...zoneMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))

  let totalQuests = 0

  const zoneLines: string[] = []

  for (const [zoneName, quests] of sortedZones) {
    quests.sort((a, b) => a.name.localeCompare(b.name))
    if (quests.length === 0) continue

    totalQuests += quests.length

    const questLines = quests.map(
      (q) => `    { questId: ${q.questId}, name: ${JSON.stringify(q.name)} }`
    )

    zoneLines.push(
      `  { zoneName: ${JSON.stringify(zoneName)}, quests: [\n${questLines.join(",\n")}\n  ]}`
    )
  }

  return `\
/**
 * Quest Static Data (Generated)
 *
 * ${sortedZones.length} zones, ${totalQuests} quests
 *
 * apiVersion: ${apiVersion}
 * DO NOT EDIT — regenerate with: ops temper catalog generate quest
 */

interface QuestEntry {
  questId: number
  name: string
}

interface QuestZoneEntry {
  zoneName: string
  quests: readonly QuestEntry[]
}

export const questData: QuestZoneEntry[] = [
${zoneLines.join(",\n")}
]
`
}

export const tier: Tier = {
  slug: "quest",
  summary: "Non-repeatable quests, by zone, read from the data-mining capture",
  savedVariables: MINED_SAVED_VARIABLES,
  outputPath: "temper/player-completion/src/generated/quest-data.generated.ts",
  format: false,
  emit: (accountWide, apiVersion): TierEmit => {
    const { zoneMap, diagnostics, fullyRead } = extractQuestData(accountWide)

    return {
      content: generateDataFile(zoneMap, apiVersion),
      report: [
        `apiVersion: ${apiVersion}`,
        `Found ${zoneMap.size} zones, ${[...zoneMap.values()].reduce((sum, q) => sum + q.length, 0)} quests`,
      ],
      warnings: unreadableWarnings(diagnostics, fullyRead),
    }
  },
}
