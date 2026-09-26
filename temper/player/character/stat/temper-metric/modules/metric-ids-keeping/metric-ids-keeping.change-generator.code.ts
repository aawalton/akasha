import { dirname } from "node:path"
import type { Adding, Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textIn, textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { formattedBody } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { temperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.ts"

const METRIC_IDS_AT =
  "temper/player/character/stat/temper-metric/modules/metric-ids/metric-ids.data-table.code.ts"

const BYTES = new TextEncoder()

type Written = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

const NOTHING: Written = { edits: [], said: [] }

const COMPANION = "companion"

function unionOf(name: string, slugs: readonly string[]): string {
  const sorted = [...new Set(slugs)].sort()
  if (sorted.length === 0) return `export type ${name} = never\n`
  return `export type ${name} =\n${sorted.map((one) => `  | ${JSON.stringify(one)}`).join("\n")}\n`
}

export function metricIdsBody(slugs: readonly string[], companions: readonly string[]): string {
  return `${unionOf("MetricId", slugs)}\n${unionOf("CompanionMetricId", companions)}`
}

function turning(path: string): boolean {
  if (path.startsWith(`${dirname(METRIC_IDS_AT)}/`)) return true
  const said = partedIn(path)
  return said !== null && said.pageType === temperMetric.slug && said.sections.length === 0
}

export function couldTurn(change: Change): boolean {
  return change.changed.some(turning)
}

export function generateChange(change: Change): Written {
  if (!couldTurn(change)) return NOTHING
  const cast = shadowFor(change)
  if ("refused" in cast) return NOTHING
  const slugs: string[] = []
  const companions: string[] = []
  for (const one of cast.shadow.index.everyOfType(temperMetric.slug)) {
    const value = cast.shadow.pageOf(one.path)
    const held = value?.slug
    if (typeof held !== "string") continue
    if (value?.subject === COMPANION) companions.push(held)
    else slugs.push(held)
  }
  const body = textIn(
    formattedBody(change.root, METRIC_IDS_AT, BYTES.encode(metricIdsBody(slugs, companions))).body
  )
  const was = textOf(change.after(METRIC_IDS_AT))
  if (was === body) return NOTHING
  return {
    edits: [
      was === null
        ? { kind: "add", path: METRIC_IDS_AT, content: body }
        : { kind: "replace", path: METRIC_IDS_AT, contentFrom: was, contentTo: body },
    ],
    said: [`\`${METRIC_IDS_AT}\` written again from the stat pages`],
  }
}
