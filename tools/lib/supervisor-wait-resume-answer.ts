
import { shape } from "./shape.ts"
import { type Infer } from "./shape-core"
import { SUPERVISOR_DECIDE_COMMAND } from "./supervisor-limit-resume-effects.ts"

export const WAIT_RESUME_DECISION = "waitResume"

export type AskDecide = (stdin: string) => Promise<unknown>

const WaitResumeAnswerShape = shape.object({
  [WAIT_RESUME_DECISION]: shape.discriminatedUnion("kind", [
    shape.object({
      kind: shape.literal("nudge"),
      reason: shape.string(),
      attempt: shape.number(),
      nudge: shape.string().refine((text) => text.trim() !== "", {
        message: "the nudge text is blank, which would reach the seat as an empty turn",
      }),
    }),
    shape.object({
      kind: shape.literal("wait"),
      reason: shape.string(),
      readyAtMs: shape.number(),
    }),
    shape.object({ kind: shape.literal("hold"), reason: shape.string() }),
  ]),
})

export type WaitResumeVerdict =
  Infer<typeof WaitResumeAnswerShape>[typeof WAIT_RESUME_DECISION]

export type WaitResumeQuestion = {
  readonly deathDetected: true
  readonly consecutiveDeaths: number
  readonly lastNudgeAtMs: number | null
  readonly now: number
}

export async function askWaitResume(
  ask: AskDecide,
  question: WaitResumeQuestion
): Promise<{ verdict: WaitResumeVerdict } | { unreachable: string }> {
  let answered: unknown
  try {
    answered = await ask(JSON.stringify({ [WAIT_RESUME_DECISION]: question }))
  } catch (error) {
    const what = `could not decide \`${WAIT_RESUME_DECISION}\``
    return { unreachable: `${SUPERVISOR_DECIDE_COMMAND} ${what}: ${String(error)}` }
  }
  const read = WaitResumeAnswerShape.safeParse(answered)
  if (read.success) return { verdict: read.data[WAIT_RESUME_DECISION] }
  const issue = read.error.issues[0]
  const at = issue === undefined || issue.path.length === 0 ? "" : ` at \`${issue.path.join(".")}\``
  const why = issue?.message ?? "no reason given"
  const what = `answered nothing this can use for \`${WAIT_RESUME_DECISION}\``
  return { unreachable: `${SUPERVISOR_DECIDE_COMMAND} ${what}${at}: ${why}` }
}
