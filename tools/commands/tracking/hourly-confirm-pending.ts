export const summary = "Show the custom answer waiting to be applied — what Alan was asked, what he typed, the open block, and the command that closes the loop (same text the reactor delivers)"

import type { CommandHelp } from "../../ops/surface.ts"
import { dataError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { listPersonaTargets } from "../../lib/persona-wake-slugs.ts"
import {
  buildPendingConfirmContext,
  renderPendingConfirm,
} from "../../lib/tracking/hourly-confirm-context.ts"
import { readConfirmStreamQuestions } from "../../lib/tracking/hourly-confirm-reads.ts"
import { selectUnreconciledQuestions } from "../../lib/tracking/hourly-confirm.ts"
import { pagesClient, trackingResolve } from "../../lib/tracking-capability.ts"

const CONFIRM_PERSONA_SLUG = "amy"

export const help: CommandHelp = {
  flags: [
    { name: "--json", description: "Emit the assembled context instead of the rendered text" },
  ],
  exits: [
    { code: 0, meaning: "read — reported what is outstanding, or that nothing is" },
    { code: 1, meaning: "invalid flags" },
    { code: 2, meaning: `no '${CONFIRM_PERSONA_SLUG}' persona page to read the stream against` },
  ],
  examples: ["ops tracking hourly-confirm-pending", "ops tracking hourly-confirm-pending --json"],
}

export default async function trackingHourlyConfirmPendingCommand(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const targets = await listPersonaTargets()
  const persona = targets.find((t) => t.slug === CONFIRM_PERSONA_SLUG)
  if (persona === undefined) {
    throw dataError(
      `hourly-confirm-pending: no '${CONFIRM_PERSONA_SLUG}' persona page — there is no stream to read`
    )
  }

  const sb = await pagesClient().then((c) => c.getPageAccessClient())
  const outstanding = selectUnreconciledQuestions(
    await readConfirmStreamQuestions(sb, persona.id)
  )
  const resolve = await trackingResolve()
  const session = outstanding.length === 0 ? null : await resolve.findOpenSession(sb)
  const contexts = outstanding.map((pending) =>
    buildPendingConfirmContext({
      question: {
        id: pending.id,
        title: pending.row.title,
        createdAt: pending.row.createdAt,
        answeredAt: pending.row.answeredAt,
        answer: pending.row.answer,
      },
      block:
        session === null
          ? null
          : {
              title: session.title,
              startTime: session.startTime,
              safetyLevel: session.safetyLevel,
              difficultyLevel: session.difficultyLevel,
            },
    })
  )

  if (json) {
    process.stdout.write(`${JSON.stringify({ outstanding: contexts })}\n`)
    return
  }

  if (contexts.length === 0) {
    process.stdout.write("Nothing outstanding — every answer Alan has given has been applied.\n")
    return
  }
  if (contexts.length > 1) {
    process.stdout.write(
      `${contexts.length} outstanding answers, where the emitter's gate should allow at most one — ` +
        "something opened a question while an answer was unapplied. All of them:\n\n"
    )
  }
  process.stdout.write(
    `${contexts.map((ctx) => renderPendingConfirm(ctx)).join("\n\n---\n\n")}\n`
  )
}
