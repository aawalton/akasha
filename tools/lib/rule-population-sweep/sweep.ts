import type { AuditReading } from "../audit-reading.ts"
import { writeMessage } from "../message-file.ts"
import { buildRulePopulationNotification, type EmptyRuleLine } from "./notification.ts"
import {
  BLIND_SPOTS,
  gatherRulePopulations,
} from "../../../infra/cluster-checks/src/audits/rule-population.ts"
import { akashaRoot } from "../../../repo/roots/roots.ts"

export const LOG = "[rule-population-sweep]"

export const READER = "dalla"

export const SENDER = "rule-population-sweep"

function offeredBy(reading: AuditReading): number {
  return reading.kind === "no-population" ? 0 : reading.scanned
}

export interface SweptReading {
  readonly text: string
  readonly emptyCount: number
  readonly rulesRead: number
  readonly repoRoot: string
}

export async function readRulePopulations(log: (line: string) => void): Promise<SweptReading> {
  const repoRoot = akashaRoot()
  log(`${LOG} reading rule populations over ${repoRoot}`)

  const audit = await gatherRulePopulations({
    repoRoot,
    treeSha: undefined,
    cacheDir: undefined,
  })

  const empty: readonly EmptyRuleLine[] = audit.empty.map((rule) => ({
    rule: rule.rule,
    kind: rule.kind,
    source: rule.source,
    offered: offeredBy(rule.reading),
  }))

  for (const rule of empty) {
    log(`${LOG} EMPTY: ${rule.rule} (${rule.kind}) offered ${rule.offered} file(s)`)
  }

  const notification = buildRulePopulationNotification({
    rulesRead: audit.rules.length,
    empty,
    filesExamined: audit.filesExamined,
    filesDeclared: audit.filesDeclared,
    blindSpots: BLIND_SPOTS,
  })

  return { ...notification, repoRoot }
}

export function fileReadingFor(reading: SweptReading, log: (line: string) => void): string {
  const wrote = writeMessage({
    to: READER,
    from: SENDER,
    warrant: "announce",
    body: reading.text,
  })
  if (wrote.kind === "refused") {
    throw new Error(
      `${LOG} today's reading did not land in \`${READER}\`'s mailbox, so nothing is waiting: ${wrote.detail}`
    )
  }
  log(`${LOG} filed ${wrote.relPath}`)
  return wrote.relPath
}
