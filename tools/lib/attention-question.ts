import {
  createQuestionRow,
  OPEN_QUESTION_STATUS,
  openQuestionsWhere,
  readQuestionPages,
  USER_ID,
} from "./question-page.ts"

export interface OpenQuestion {
  id: string
  title: string
  createdAtMs: number
}

export interface AttributedOpenQuestion extends OpenQuestion {
  sourceContext: string
}

export function selectQuestionsAskedBy(
  openQuestions: readonly AttributedOpenQuestion[],
  agentId: string
): readonly AttributedOpenQuestion[] {
  return openQuestions.filter((question) => question.sourceContext === agentId)
}

function isoToMs(iso: unknown): number {
  if (typeof iso !== "string" || iso === "") return 0
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? 0 : ms
}

export async function getOpenQuestions(personaId: string): Promise<AttributedOpenQuestion[]> {
  const rows = await readQuestionPages({
    where: [{ key: "askedBy", eq: personaId }, ...openQuestionsWhere()],
  })
  return rows.map((row) => ({
    id: row.id,
    title: typeof row.title === "string" ? row.title : "",
    createdAtMs: isoToMs(row.createdAt),
    sourceContext: typeof row.sourceContext === "string" ? row.sourceContext : "",
  }))
}

export async function createQuestionPage(args: {
  personaId: string
  question: string
  agentId: string
  context?: string
  options?: readonly string[]
}): Promise<{ id: string }> {
  const page = await createQuestionRow({
    properties: {
      title: args.question,
      askedBy: args.personaId,
      status: OPEN_QUESTION_STATUS,
      sourceContext: args.agentId,
      userId: USER_ID,
      ...(args.context !== undefined && args.context !== "" ? { context: args.context } : {}),
      ...(args.options !== undefined && args.options.length > 0
        ? { options: [...args.options] }
        : {}),
    },
  })
  return { id: page.id }
}
