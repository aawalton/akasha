import type { Page } from "../daily-tracking/tracking-types.ts"
import { displayTitle, fieldStr } from "./format.ts"
import {
  ANSWERED_QUESTION_STATUS,
  type AutomationQuestion,
  ConfirmStreamQuestion,
  type OpenBlock,
  OPEN_QUESTION_STATUS,
} from "./hourly-confirm.ts"
import { getPages, type PageAccessClient, type PagesQuery } from "./pages.ts"
import { findOpenSession } from "./resolve.ts"

const MAX_QUESTIONS_PER_READ = 100

const QUESTION_PAGE_TYPE_SLUG = "question"
const ANSWERED_OPTION_INDEX_KEY = "answeredOptionIndex"
const RECONCILED_AT_KEY = "reconciledAt"

function instantMs(iso: string | undefined): number | null {
  if (iso === undefined || iso === "") return null
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? null : ms
}

function optionIndex(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
    return Number(value)
  }
  return null
}

export interface ConfirmQuestionRow extends AutomationQuestion {
  readonly row: Page
}

function confirmStreamQueries(personaId: string): readonly PagesQuery[] {
  return [
    {
      pageTypeSlug: QUESTION_PAGE_TYPE_SLUG,
      where: [
        { key: "asked-by", eq: personaId },
        { key: "status", eq: OPEN_QUESTION_STATUS },
      ],
      limit: MAX_QUESTIONS_PER_READ,
    },
    {
      pageTypeSlug: QUESTION_PAGE_TYPE_SLUG,
      where: [
        { key: "asked-by", eq: personaId },
        { key: "status", eq: ANSWERED_QUESTION_STATUS },
      ],
      sortBy: "answered-at",
      descending: true,
      limit: MAX_QUESTIONS_PER_READ,
    },
  ]
}

function foldConfirmStreamQuestions(
  rows: readonly Page[]
): readonly ConfirmStreamQuestion<ConfirmQuestionRow>[] {
  const byId = new Map<string, ConfirmStreamQuestion<ConfirmQuestionRow>>()
  for (const row of rows) {
    byId.set(
      row.id,
      ConfirmStreamQuestion({
        id: row.id,
        sourceContext: fieldStr(row, "sourceContext"),
        status: fieldStr(row, "status") ?? "",
        answeredAtMs: instantMs(fieldStr(row, "answeredAt")),
        reconciledAtMs: instantMs(fieldStr(row, RECONCILED_AT_KEY)),
        createdAtMs: instantMs(fieldStr(row, "createdAt")),
        answeredOptionIndex: optionIndex(row[ANSWERED_OPTION_INDEX_KEY]),
        row,
      })
    )
  }
  return [...byId.values()].sort((a, b) => (a.createdAtMs ?? 0) - (b.createdAtMs ?? 0))
}

export async function readConfirmStreamQuestions(
  sb: PageAccessClient,
  personaId: string
): Promise<readonly ConfirmStreamQuestion<ConfirmQuestionRow>[]> {
  const read = await Promise.all(confirmStreamQueries(personaId).map((q) => getPages(sb, q)))
  return foldConfirmStreamQuestions(read.flatMap((one) => [...one.rows]))
}

export async function readOpenBlock(sb: PageAccessClient): Promise<OpenBlock | null> {
  const session = await findOpenSession(sb)
  if (session === null) return null
  const startTimeMs = instantMs(fieldStr(session, "startTime"))
  if (startTimeMs === null) return null
  return {
    activity: displayTitle(session),
    safetyLevel: fieldStr(session, "safetyLevel"),
    difficultyLevel: fieldStr(session, "difficultyLevel"),
    startTimeMs,
  }
}
