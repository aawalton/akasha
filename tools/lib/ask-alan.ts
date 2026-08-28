
import { buildPageHref, PageTypeSlug } from "@shared/pages-url"
import { InputError } from "./active-core.ts"
import { createQuestionPage, getOpenQuestions, type OpenQuestion } from "./attention-question.ts"
import { QUESTION_PAGE_TYPE_SLUG } from "./question-page.ts"
import { ALAN_PERSON, type NotifyInput, notify } from "./notify.ts"
import { matchPersonaForAgent } from "./persona-match.ts"
import { listPersonaTargets } from "./persona-wake-slugs.ts"
import { seatWhoami } from "./seat-whoami.ts"

export const ASK_ALAN_KIND = "ask-alan"

const ASK_ALAN_SOURCE = "ask-alan"

export interface AskAlanResult {
  readonly personaSlug: string
  readonly questionId: string
  readonly created: boolean
  readonly notified: boolean
}

export function buildAskAlanNotifyInput(args: {
  personaSlug: string
  question: string
  link: string
}): NotifyInput {
  return {
    title: `${args.personaSlug} has a question`,
    body: args.question,
    link: args.link,
    kind: ASK_ALAN_KIND,
    source: ASK_ALAN_SOURCE,
  }
}

export function selectRetryMatch(
  openQuestions: readonly OpenQuestion[],
  question: string
): OpenQuestion | undefined {
  return openQuestions.find((q) => q.title === question)
}

export interface AskAlanExtras {
  readonly context?: string
  readonly options?: readonly string[]
}

export async function askAlanForPersona(args: {
  readonly persona: { readonly id: string; readonly slug: string }
  readonly question: string
  readonly agentId: string
  readonly extras?: AskAlanExtras
}): Promise<AskAlanResult> {
  const { persona, agentId } = args
  const question = args.question.trim()
  const extras = args.extras ?? {}

  const retryOf = selectRetryMatch(await getOpenQuestions(persona.id), question)
  if (retryOf !== undefined) {
    return { personaSlug: persona.slug, questionId: retryOf.id, created: false, notified: false }
  }

  const { id: questionId } = await createQuestionPage({
    personaId: persona.id,
    question,
    agentId,
    context: extras.context,
    options: extras.options,
  })

  const link = buildPageHref({
    pageTypeSlug: PageTypeSlug(QUESTION_PAGE_TYPE_SLUG),
    slug: undefined,
    fallbackSlugSource: question,
    id: questionId,
  })
  await notify(ALAN_PERSON, buildAskAlanNotifyInput({ personaSlug: persona.slug, question, link }))

  return { personaSlug: persona.slug, questionId, created: true, notified: true }
}

export async function runAskAlan(
  agentId: string,
  question: string,
  extras: AskAlanExtras = {}
): Promise<AskAlanResult> {
  const trimmed = question.trim()
  if (trimmed === "") throw new InputError("ask-alan requires a non-empty question")

  const agent = seatWhoami(agentId)
  if (agent === null) {
    throw new InputError(`ask-alan: nothing states who seat '${agentId}' is`)
  }

  const targets = await listPersonaTargets()
  const personaId = matchPersonaForAgent(agent.name, agent.persona, targets)
  if (personaId === null) {
    throw new InputError(
      `ask-alan: agent '${agent.name ?? agentId}' resolves to no persona. A deliberate ask must be ` +
        "persona-backed; escalate up your chain to your persona principal " +
        "(ops seat send, which with no recipient goes there), who relays to Alan."
    )
  }
  const persona = targets.find((t) => t.id === personaId)
  if (persona === undefined) {
    throw new InputError(
      `ask-alan: resolved persona ${personaId} vanished from the live target set`
    )
  }

  return askAlanForPersona({ persona, question: trimmed, agentId, extras })
}
