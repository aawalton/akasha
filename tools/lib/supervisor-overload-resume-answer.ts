
import { shape } from "./shape.ts"
import { type Infer } from "./shape-core"
import { SUPERVISOR_DECIDE_COMMAND } from "./supervisor-limit-resume-effects.ts"

export const OVERLOAD_RESUME_DECISION = "overloadResume"

export type AskDecide = (stdin: string) => Promise<unknown>

const OverloadResumeAnswerShape = shape.object({
  [OVERLOAD_RESUME_DECISION]: shape.discriminatedUnion("kind", [
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

export type OverloadResumeVerdict =
  Infer<typeof OverloadResumeAnswerShape>[typeof OVERLOAD_RESUME_DECISION]

export type OverloadResumeQuestion = {
  readonly overloadDetected: true
  readonly consecutiveOverloads: number
  readonly lastNudgeAtMs: number | null
  readonly now: number
}

export async function askOverloadResume(
  ask: AskDecide,
  question: OverloadResumeQuestion
): Promise<{ verdict: OverloadResumeVerdict } | { unreachable: string }> {
  let answered: unknown
  try {
    answered = await ask(JSON.stringify({ [OVERLOAD_RESUME_DECISION]: question }))
  } catch (error) {
    const what = `could not decide \`${OVERLOAD_RESUME_DECISION}\``
    return { unreachable: `${SUPERVISOR_DECIDE_COMMAND} ${what}: ${String(error)}` }
  }
  const read = OverloadResumeAnswerShape.safeParse(answered)
  if (read.success) return { verdict: read.data[OVERLOAD_RESUME_DECISION] }
  const issue = read.error.issues[0]
  const at = issue === undefined || issue.path.length === 0 ? "" : ` at \`${issue.path.join(".")}\``
  const why = issue?.message ?? "no reason given"
  const what = `answered nothing this can use for \`${OVERLOAD_RESUME_DECISION}\``
  return { unreachable: `${SUPERVISOR_DECIDE_COMMAND} ${what}${at}: ${why}` }
}
