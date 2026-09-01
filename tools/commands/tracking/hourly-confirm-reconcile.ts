export const summary = "Record that a question's answer has been applied to the ledger — refuses, because the store takes no keyed write, so the hourly stream cannot be released this way"

import { askComposed } from "@shared/pages-query/ask"
import type { CommandHelp } from "../../ops/surface.ts"
import {
  ANSWERED_QUESTION_STATUS,
  QUESTION_PAGE_TYPE_SLUG,
} from "@akasha/open-questions/question-status"
import { dataError, inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

const RECONCILED_AT_KEY = "reconciled-at"

// THIS COMMAND EXISTS TO WRITE ONE KEY AND CANNOT WRITE IT. The stamp went on with `patchPage`,
// which the store refuses unconditionally, so every run since has read the question fine and then
// failed at the only thing it was for.
//
// What that blocks is worth naming, because the consumer is live: `tools/lib/tracking/
// hourly-confirm.ts:35` gates on `reconciledAtMs === null` and will not ask about a question again
// until this key is set. So the hourly stream stops on the first question Alan answers and has no
// way to be released — not by this command, and there is no other writer of the key.
const NO_KEYED_WRITE = "the page store refuses every keyed write"

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
    { code: 0, meaning: "reported an existing stamp — no new stamp can be written" },
    { code: 1, meaning: "invalid flags, or a question carrying no answer" },
    { code: 2, meaning: "no such question" },
    { code: 3, meaning: "the page store could not be read, or refused the stamp" },
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

  throw operationalError(
    `hourly-confirm-reconcile: \`${QUESTION_PAGE_TYPE_SLUG}/${named}\` was not stamped — ` +
      `${NO_KEYED_WRITE}. Question ${questionId} still reads as unreconciled, so the hourly ` +
      `stream stays stopped on it and no run of this command can release it`
  )
}
