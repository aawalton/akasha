import {
  askSupervisorDecide,
  SUPERVISOR_DECIDE_COMMAND,
} from "@akasha/seat-system/supervisor-limit-resume-effects"
import { shape } from "./shape.ts"
import type { Infer, ShapeError } from "./shape-core"
import { LOG } from "./supervisor-config.ts"
import { SUPERVISOR_NOTICE_PREFIX } from "./supervisor-resume-notices.ts"

const RESTART_NOTICE_DECISION = "restartNotice"

const handed = shape.string().min(1)

const RestartNoticeVerdictZ = shape.object({
  route: shape.enum(["spawn-argv", "rail"]),
  notice: handed,
})
const RestartNoticeAnswerZ = shape.object({ [RESTART_NOTICE_DECISION]: RestartNoticeVerdictZ })
export type RestartNoticePlan = Infer<typeof RestartNoticeVerdictZ>

export type AskDecide = (stdin: string) => Promise<unknown>

export const DECISION_UNREACHED_PREFIX = `${SUPERVISOR_NOTICE_PREFIX} Your resume notice could not be decided`

const REASON_CAP = 400

function unreachedNotice(reason: string): string {
  console.error(`${LOG} ${reason}`)
  return `${DECISION_UNREACHED_PREFIX}: ${reason.slice(0, REASON_CAP)}. Nothing was asked of you by this restart.`
}

async function decided(
  key: string,
  question: unknown,
  ask: AskDecide
): Promise<{ answered: unknown } | { reason: string }> {
  try {
    return { answered: await ask(JSON.stringify({ [key]: question })) }
  } catch (error) {
    return { reason: `${SUPERVISOR_DECIDE_COMMAND} could not decide \`${key}\`: ${String(error)}` }
  }
}

function unusable(key: string, error: ShapeError): string {
  const issue = error.issues[0]
  const at = issue === undefined || issue.path.length === 0 ? "" : ` at \`${issue.path.join(".")}\``
  return `${SUPERVISOR_DECIDE_COMMAND} answered nothing this can use for \`${key}\`${at}: ${issue?.message ?? "no reason given"}`
}

function degradedRestart(reason: string): RestartNoticePlan {
  return { route: "spawn-argv", notice: unreachedNotice(reason) }
}

export async function askRestartNotice(
  question: {
    readonly event: { action: "restart-now"; interruptMessage: string | null }
    readonly ctx: { maintenance: boolean; reExecPending: boolean }
  },
  ask: AskDecide = askSupervisorDecide
): Promise<RestartNoticePlan> {
  const call = await decided(RESTART_NOTICE_DECISION, question, ask)
  if ("reason" in call) return degradedRestart(call.reason)
  const read = RestartNoticeAnswerZ.safeParse(call.answered)
  if (!read.success) return degradedRestart(unusable(RESTART_NOTICE_DECISION, read.error))
  return read.data[RESTART_NOTICE_DECISION]
}
