
import { mock } from "bun:test"

interface OpenQuestionRow {
  id: string
  title: string
  createdAtMs: number
}

interface Recorded {
  readonly title: string
  readonly body?: string
  readonly link?: string
  readonly kind?: string
  readonly source?: string
}

let openQuestions: OpenQuestionRow[] = []
let notified: Recorded[] = []

mock.module("../lib/attention-question.ts", () => ({
  getOpenQuestions: (): Promise<OpenQuestionRow[]> => Promise.resolve([...openQuestions]),
  createQuestionPage: (args: { question: string }): Promise<{ id: string }> => {
    const id = `question-${openQuestions.length + 1}`
    openQuestions.push({ id, title: args.question, createdAtMs: openQuestions.length + 1 })
    return Promise.resolve({ id })
  },
}))

mock.module("../lib/notify.ts", () => ({
  ALAN_PERSON: "alan",
  notify: (_personSlug: string, input: Recorded): Promise<void> => {
    notified.push(input)
    return Promise.resolve()
  },
}))

const { askAlanForPersona } = await import("../lib/ask-alan.ts")

const persona = { id: "persona-1", slug: "zadi" }

function ask(question: string): ReturnType<typeof askAlanForPersona> {
  return askAlanForPersona({ persona, question, agentId: "agent-1" })
}

function reset(): undefined {
  openQuestions = []
  notified = []
}

async function scenario<T>(run: () => Promise<T>): Promise<{
  result: T
  notified: readonly Recorded[]
  openQuestions: readonly OpenQuestionRow[]
}> {
  reset()
  const result = await run()
  return { result, notified: [...notified], openQuestions: [...openQuestions] }
}

const observations = {
  twoDifferentQuestions: await scenario(async () => {
    const first = await ask("Should the migration land tonight?")
    const second = await ask("Which account should the pod rotate to?")
    return { first, second }
  }),
  burstOfThree: await scenario(async () => {
    await ask("one")
    await ask("two")
    await ask("three")
    return null
  }),
  identicalReask: await scenario(async () => {
    const first = await ask("Should the migration land tonight?")
    const retry = await ask("Should the migration land tonight?")
    return { first, retry }
  }),
  whitespaceOnlyDifference: await scenario(async () => {
    await ask("Should the migration land tonight?")
    return { retry: await ask("  Should the migration land tonight?\n") }
  }),
  freshAsk: await scenario(async () => ask("Which auth provider should the new endpoint use?")),
}

console.log(JSON.stringify(observations))
