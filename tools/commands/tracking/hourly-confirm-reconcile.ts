export const summary = "Record that a question's answer has been applied to the ledger, which is what lets the hourly stream ask again (applying it stays your judgment)"

import { patchPage } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import type { CommandHelp } from "../../ops/surface.ts"
import {
  ANSWERED_QUESTION_STATUS,
  QUESTION_PAGE_TYPE_SLUG,
} from "../../../shared/open-questions/src/index.ts"
import { dataError, inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

const RECONCILED_AT_KEY = "reconciled-at"

const WRITER = "ops tracking hourly-confirm-reconcile"

function textOf(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined
  const held = value.trim()
  return held === "" ? undefined : held
}

export const help: CommandHelp = {
  flags: [
    {
      name: "--question",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "The question whose answer you have applied",
    },
    { name: "--json", description: "Emit `{ question, reconciledAt, alreadyStamped }` JSON" },
  ],
  positionals: [
    {
      name: "question",
      required: false,
      aliasOfFlag: "--question",
      description: "The question id, as an alternative to --question",
    },
  ],
  exits: [
    { code: 0, meaning: "stamped, or reported an existing stamp" },
    { code: 1, meaning: "invalid flags, or a question carrying no answer" },
    { code: 2, meaning: "no such question" },
    { code: 3, meaning: "the page store could not be read, or the stamp did not land" },
  ],
  examples: [
    "ops tracking hourly-confirm-reconcile --question 019faa50-4459-71af-bec7-17fd97a30fd4",
  ],
}

export default async function trackingHourlyConfirmReconcileCommand(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")
  const questionId = parsed.string("--question")
  if (questionId === undefined || questionId === "") {
    throw inputError("hourly-confirm-reconcile: --question <id> is required")
  }

  const asked = await askComposed({
    "page-type": QUESTION_PAGE_TYPE_SLUG,
    where: { id: { is: questionId } },
    keys: ["id", "slug", "status", RECONCILED_AT_KEY],
    limit: 1,
  })
  if (!asked.ok) {
    throw operationalError(`hourly-confirm-reconcile: reading question ${questionId}: ${asked.why}`)
  }
  const row = asked.answer.rows[0]
  if (row === undefined) {
    throw dataError(`hourly-confirm-reconcile: no question ${questionId}`)
  }

  const status = textOf(row.values.status)
  if (status !== ANSWERED_QUESTION_STATUS) {
    throw inputError(
      `hourly-confirm-reconcile: question ${questionId} is '${status ?? "unreadable"}', not '${ANSWERED_QUESTION_STATUS}' — there is no answer to have applied`
    )
  }

  const existing = textOf(row.values[RECONCILED_AT_KEY])
  if (existing !== undefined) {
    const envelope = { question: questionId, reconciledAt: existing, alreadyStamped: true }
    process.stdout.write(
      json
        ? `${JSON.stringify(envelope)}\n`
        : `already stamped at ${existing} — nothing to do, the stream is not waiting on this one\n`
    )
    return
  }

  const named = textOf(row.values.slug)
  if (named === undefined) {
    throw dataError(
      `hourly-confirm-reconcile: question ${questionId} carries no slug, so nothing names the page to stamp`
    )
  }

  const at = new Date().toISOString()
  const landed = await patchPage(
    QUESTION_PAGE_TYPE_SLUG,
    named,
    { [RECONCILED_AT_KEY]: at },
    WRITER
  )
  if (!landed.ok) {
    throw operationalError(
      `hourly-confirm-reconcile: stamping ${RECONCILED_AT_KEY} on question ${questionId}: ${landed.why}`
    )
  }

  const envelope = { question: questionId, reconciledAt: at, alreadyStamped: false }
  process.stdout.write(
    json
      ? `${JSON.stringify(envelope)}\n`
      : `stamped ${questionId} reconciled at ${at} — the hourly stream can ask again\n`
  )
}
