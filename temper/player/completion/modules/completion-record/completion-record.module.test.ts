import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  accountCompletionSchema,
  characterCompletionSchema,
  companionCompletionSchema,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import type { z } from "zod"

const PAGES = "temper/player/character"

function bodiesOf(pageTypeSlug: string): readonly { path: string; text: string }[] {
  const glob = new Bun.Glob(`${pageTypeSlug}/pages/**/*.${pageTypeSlug}.completion.json`)
  const root = join(akashaRoot(), PAGES)
  return [...glob.scanSync({ cwd: root })].map((path) => ({
    path,
    text: readFileSync(join(root, path), "utf8"),
  }))
}

function refusalsOf(schema: z.ZodType, pageTypeSlug: string): readonly string[] {
  const bodies = bodiesOf(pageTypeSlug)
  expect(bodies.length).toBeGreaterThan(0)
  const refused: string[] = []
  for (const body of bodies) {
    const parsed = schema.safeParse(JSON.parse(body.text))
    if (!parsed.success) refused.push(`${body.path}: ${parsed.error.message}`)
  }
  return refused
}

test("every account body in the tree parses", () => {
  expect(refusalsOf(accountCompletionSchema, "temper-account")).toEqual([])
})

test("every character body in the tree parses", () => {
  expect(refusalsOf(characterCompletionSchema, "temper-account-character")).toEqual([])
})

test("every companion body in the tree parses", () => {
  expect(refusalsOf(companionCompletionSchema, "temper-companion-progress")).toEqual([])
})

test("a list stored as a numbered object comes back as an array in key order", () => {
  const parsed = characterCompletionSchema.parse({
    quests: { "1": 40, "2": 7, "10": 3 },
    dailyWritStates: { date: "2026-09-25", seen: { "1": 5 }, completed: [] },
  })
  expect(parsed.quests).toEqual([40, 7, 3])
  expect(parsed.dailyWritStates?.seen).toEqual([5])
})

test("an account body with no achievements is refused", () => {
  expect(accountCompletionSchema.safeParse({ championPointsEarned: 3 }).success).toBe(false)
})

test("a character body whose level is text is refused", () => {
  expect(characterCompletionSchema.safeParse({ level: "50" }).success).toBe(false)
})

test("a character body carrying a key the record does not declare is refused", () => {
  expect(characterCompletionSchema.safeParse({ level: 50, levle: 50 }).success).toBe(false)
})

test("a list holding text where numbers belong is refused", () => {
  expect(characterCompletionSchema.safeParse({ quests: { "1": "x" } }).success).toBe(false)
})

test("a companion body that is no object is refused", () => {
  expect(companionCompletionSchema.safeParse([1, 2]).success).toBe(false)
})
