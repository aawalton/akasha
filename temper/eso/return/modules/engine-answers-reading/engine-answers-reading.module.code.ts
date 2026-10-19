import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { EngineAnswer } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"

const NO_VERSION = 0

const FIRST = 1

export interface EngineAnswers {
  readonly apiVersion: number
  readonly answers: Readonly<Record<string, readonly EngineAnswer[]>>
  readonly answersGiven: Readonly<Record<string, Readonly<Record<string, readonly EngineAnswer[]>>>>
}

type Listed = Readonly<Record<string, readonly EngineAnswer[]>>

function listsIn(given: Readonly<Record<string, unknown>>): Listed {
  const found: Record<string, readonly EngineAnswer[]> = {}
  for (const key of Object.keys(given).sort()) {
    const held = given[key]
    if (isRecord(held)) found[key] = listedIn(held)
  }
  return found
}

function isAnswer(held: unknown): held is EngineAnswer {
  return typeof held === "number" || typeof held === "string" || typeof held === "boolean"
}

export function listedIn(held: Readonly<Record<string, unknown>>): readonly EngineAnswer[] {
  const found: EngineAnswer[] = []
  for (let at = FIRST; ; at += 1) {
    const one = held[String(at)]
    if (!isAnswer(one)) return found
    found.push(one)
  }
}

export function engineAnswersIn(
  catalog: Readonly<Record<string, unknown>> | undefined
): EngineAnswers | undefined {
  if (catalog === undefined || !isRecord(catalog.answers)) return undefined
  const answersGiven: Record<string, Listed> = {}
  const byName = isRecord(catalog.answersGiven) ? catalog.answersGiven : {}
  for (const name of Object.keys(byName).sort()) {
    const held = byName[name]
    if (isRecord(held)) answersGiven[name] = listsIn(held)
  }
  return {
    apiVersion: typeof catalog.apiVersion === "number" ? catalog.apiVersion : NO_VERSION,
    answers: listsIn(catalog.answers),
    answersGiven,
  }
}

export function answersBody(held: EngineAnswers): string {
  return `${JSON.stringify(held, null, 2)}\n`
}
