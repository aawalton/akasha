import { readdirSync } from "node:fs"
import { join } from "node:path"
import type { Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textIn, textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { formattedBody } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { formulaFileWrittenAgain } from "akasha/temper/player/character/stat/temper-metric/modules/metric-formula-writing/metric-formula-writing.module.code.ts"
import { temperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.ts"

const PAGES_AT = "temper/player/character/stat/temper-metric/pages/"

const WRITER_AT = "temper/player/character/stat/temper-metric/modules/metric-formula-writing/"

const ENDING = `.${temperMetric.slug}.formula.ts`

const BYTES = new TextEncoder()

type Written = {
  readonly edits: readonly Replacing[]
  readonly said: readonly string[]
}

const NOTHING: Written = { edits: [], said: [] }

export function isFormulaFile(path: string): boolean {
  return path.startsWith(PAGES_AT) && path.endsWith(ENDING)
}

function writerTurns(path: string): boolean {
  return path.startsWith(WRITER_AT)
}

export function couldTurn(change: Change): boolean {
  return change.changed.some((path) => isFormulaFile(path) || writerTurns(path))
}

function everyFormulaFile(root: string): readonly string[] {
  return readdirSync(join(root, PAGES_AT)).map((slug) => `${PAGES_AT}${slug}/${slug}${ENDING}`)
}

export function generateChange(change: Change): Written {
  if (!couldTurn(change)) return NOTHING
  const paths = change.changed.some(writerTurns)
    ? everyFormulaFile(change.root)
    : change.changed.filter(isFormulaFile)
  const edits: Replacing[] = []
  for (const path of paths) {
    const was = textOf(change.after(path))
    if (was === null) continue
    const again = formulaFileWrittenAgain(was)
    if (again === null) continue
    const body = textIn(formattedBody(change.root, path, BYTES.encode(again)).body)
    if (body === was) continue
    edits.push({ kind: "replace", path, contentFrom: was, contentTo: body })
  }
  if (edits.length === 0) return NOTHING
  return { edits, said: [`${edits.length} stat formula files written again through the writer`] }
}
