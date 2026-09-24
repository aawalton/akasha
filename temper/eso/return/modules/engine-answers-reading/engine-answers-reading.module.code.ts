import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { EngineAnswer } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"
import { accountWideHolding } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"

const TOP_LEVEL = "TemperCatalog_SavedVariables"

const HELD = "engineAnswerCatalog"

const NO_VERSION = 0

const FIRST = 1

export interface EngineAnswers {
  readonly apiVersion: number
  readonly answers: Readonly<Record<string, readonly EngineAnswer[]>>
}

function isAnswer(held: unknown): held is EngineAnswer {
  return typeof held === "number" || typeof held === "string" || typeof held === "boolean"
}

function listedIn(held: Readonly<Record<string, unknown>>): readonly EngineAnswer[] {
  const found: EngineAnswer[] = []
  for (let at = FIRST; ; at += 1) {
    const one = held[String(at)]
    if (!isAnswer(one)) return found
    found.push(one)
  }
}

export function engineAnswersIn(content: string): EngineAnswers | undefined {
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, TOP_LEVEL)
  } catch {
    return undefined
  }
  const catalog = accountWideHolding(root, HELD)
  if (catalog === undefined || !isRecord(catalog.answers)) return undefined
  const given = catalog.answers
  const answers: Record<string, readonly EngineAnswer[]> = {}
  for (const name of Object.keys(given).sort()) {
    const held = given[name]
    if (isRecord(held)) answers[name] = listedIn(held)
  }
  return {
    apiVersion: typeof catalog.apiVersion === "number" ? catalog.apiVersion : NO_VERSION,
    answers,
  }
}

export function answersBody(held: EngineAnswers): string {
  return `${JSON.stringify(held, null, 2)}\n`
}
