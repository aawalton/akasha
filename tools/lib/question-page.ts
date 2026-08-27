
import { type GatedAct, landBodies } from "./gated-landing.ts"
import { attachmentFileOf } from "../../page/attachment-file.ts"
import { answer, type Row, textOf } from "./page-query.ts"
import { landingTextFor, splitValues, type Value } from "./page-write.ts"
import { resolveRoots } from "../../repo/roots/roots"
import { shape } from "./shape.ts"

export const QUESTION_PAGE_TYPE_SLUG = "question"

export const OPEN_QUESTION_STATUS = "open"

const WRITER = "ask-alan-writer"

const SLUG_BOUND = 60

const BODY = "body"

const ANSWER = "answer"

export const USER_ID: string = shape
  .string()
  .default("9ba554f7-cb18-48bb-a709-ec935a895ca7")
  .parse(process.env.USER_ID)

export class PagesUnread extends Error {
  readonly pageType: string
  readonly why: string
  constructor(pageType: string, why: string) {
    super(
      `the \`${pageType}\` pages went unread, so no page can be called present or missing: ${why}`
    )
    this.name = "PagesUnread"
    this.pageType = pageType
    this.why = why
  }
}

export class PagesMissing extends Error {
  readonly pageType: string
  readonly slugs: readonly string[]
  constructor(pageType: string, slugs: readonly string[]) {
    super(
      slugs.length === 0
        ? `no \`${pageType}\` page stands, so nothing was there to read`
        : `no \`${pageType}\` page for slug(s): ${slugs.join(", ")}`
    )
    this.name = "PagesMissing"
    this.pageType = pageType
    this.slugs = slugs
  }
}

export type QuestionJson = string | number | boolean | null

export interface QuestionCondition {
  readonly key: string
  readonly eq: QuestionJson
}

export type QuestionWhere = readonly QuestionCondition[]

export function openQuestionsWhere(): QuestionWhere {
  return [{ key: "status", eq: OPEN_QUESTION_STATUS }]
}

export type QuestionRow = Readonly<Record<string, unknown>> & { readonly id: string }

export type QuestionProperties = Readonly<Record<string, unknown>>

const ON_THE_PAGE: Readonly<Record<string, string>> = {
  id: "id",
  title: "title",
  slug: "slug",
  status: "status",
  askedBy: "asked-by",
  sourceContext: "source-context",
  context: "context",
  options: "options",
  answeredAt: "answered-at",
  answeredOptionIndex: "answered-option-index",
  reconciledAt: "reconciled-at",
  answer: BODY,
}

const AS_INSTANT: ReadonlySet<string> = new Set(["answered-at", "reconciled-at"])

const SPOKEN_AS: ReadonlyMap<string, string> = new Map(
  Object.entries(ON_THE_PAGE).map(([spoken, onPage]) => [onPage, spoken])
)

const CARRIED: readonly string[] = Object.values(ON_THE_PAGE)

function mintedAtMs(id: string): number {
  const stamp = Number.parseInt(id.replace(/-/g, "").slice(0, 12), 16)
  return Number.isNaN(stamp) ? 0 : stamp
}

function spokenRow(row: Row): QuestionRow {
  const values: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(row.values)) {
    const as = SPOKEN_AS.get(key)
    if (as !== undefined) values[as] = value
  }
  const body = textOf(row.values, BODY)
  if (body === null || body.trim() === "") delete values[ANSWER]
  else values[ANSWER] = body.trim()
  values.createdAt = new Date(
    mintedAtMs(typeof values.id === "string" ? values.id : "")
  ).toISOString()
  values.userId = USER_ID
  return values as QuestionRow
}

function held(row: QuestionRow, key: string): string | null {
  const value = row[key]
  return value === undefined || value === null ? null : String(value)
}

function matches(row: QuestionRow, where: QuestionWhere): boolean {
  return where.every((one) =>
    one.eq === null ? held(row, one.key) === null : held(row, one.key) === String(one.eq)
  )
}

function everyQuestion(): readonly QuestionRow[] {
  const found = answer(resolveRoots(), { pageType: QUESTION_PAGE_TYPE_SLUG, keys: CARRIED })
  if (found === null) {
    throw new PagesUnread(QUESTION_PAGE_TYPE_SLUG, "names no page type whose pages are files")
  }
  if (found.absent.length > 0) {
    throw new PagesUnread(
      QUESTION_PAGE_TYPE_SLUG,
      `no question property is declared for key(s): ${found.absent.join(", ")}`
    )
  }
  if (found.faults.length > 0) {
    throw new PagesUnread(QUESTION_PAGE_TYPE_SLUG, found.faults.join("; "))
  }
  if (found.rows.length === 0) throw new PagesMissing(QUESTION_PAGE_TYPE_SLUG, [])
  return found.rows.map(spokenRow)
}

export function readQuestionPages(
  args: { readonly where?: QuestionWhere } = {}
): readonly QuestionRow[] {
  return everyQuestion().filter((row) => matches(row, args.where ?? []))
}

function standingSlugs(): ReadonlySet<string> {
  try {
    return new Set(everyQuestion().map((row) => held(row, "slug") ?? ""))
  } catch (thrown) {
    if (thrown instanceof PagesMissing) return new Set()
    throw thrown
  }
}

function slugFrom(title: string, taken: ReadonlySet<string>): string {
  const stem =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+/, "")
      .slice(0, SLUG_BOUND)
      .replace(/-+$/, "") || QUESTION_PAGE_TYPE_SLUG
  if (!taken.has(stem)) return stem
  for (let next = 2; ; next += 1) {
    const tail = `-${next}`
    const suffixed = `${stem.slice(0, SLUG_BOUND - tail.length)}${tail}`
    if (!taken.has(suffixed)) return suffixed
  }
}

function statedAs(key: string, value: unknown): Value {
  if (AS_INSTANT.has(key) && typeof value === "number") return new Date(value).toISOString()
  if (Array.isArray(value)) return value.map((one) => String(one))
  if (typeof value === "boolean" || typeof value === "number") return value
  return String(value)
}

function onPageValues(properties: QuestionProperties): Record<string, Value> {
  const values: Record<string, Value> = {}
  for (const [spoken, value] of Object.entries(properties)) {
    const key = ON_THE_PAGE[spoken]
    if (key === undefined || value === undefined || value === null || value === "") continue
    values[key] = statedAs(key, value)
  }
  return values
}

function act(message: string, root: string): GatedAct {
  return { repo: "memory", writer: WRITER, message, root }
}

function land(
  slug: string,
  values: Record<string, Value>,
  how: "write" | "patch",
  message: string
): void {
  const roots = resolveRoots()
  const found = landingTextFor(roots, QUESTION_PAGE_TYPE_SLUG, slug, values, how)
  if (found === null) {
    throw new PagesUnread(QUESTION_PAGE_TYPE_SLUG, "names no page type whose pages are files")
  }
  const { attachments: attachment } = splitValues(roots, QUESTION_PAGE_TYPE_SLUG, values)
  const bodies = [
    { relPath: found.at.relPath, body: found.text },
    ...Object.entries(attachment).map(([key, one]) => ({
      relPath: attachmentFileOf(found.at.relPath, key, one.extension),
      body: one.text,
    })),
  ]
  const outcome = landBodies(act(message, roots.memory), bodies)
  if (!outcome.ok) {
    throw new Error(`the \`question\` page at ${found.at.relPath} did not land: ${outcome.why}`)
  }
}

export function createQuestionRow(args: { readonly properties: QuestionProperties }): QuestionRow {
  const title = typeof args.properties.title === "string" ? args.properties.title.trim() : ""
  if (title === "") throw new Error("createQuestionRow: a question with no title names nothing")

  const slug = slugFrom(title, standingSlugs())
  const id = Bun.randomUUIDv7()
  land(slug, { ...onPageValues(args.properties), id, slug, title }, "write", `questions: ask ${slug}`)

  const back = readQuestionPages({ where: [{ key: "id", eq: id }] })[0]
  if (back === undefined) {
    throw new Error(
      `createQuestionRow: questions/${slug}.md landed and does not read back as a question`
    )
  }
  return back
}

