import { expect, test } from "bun:test"
import { buildDateLine } from "akasha/temper/web/modules/build-date-line/build-date-line.module.code.ts"
import type { WebPhrases } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { buildDateLineCreated } from "akasha/temper/web/phrase/pages/build-date-line-created.temper-web-phrase.ts"
import { buildDateLineUpdated } from "akasha/temper/web/phrase/pages/build-date-line-updated.temper-web-phrase.ts"

const CREATED = Date.parse("2026-09-20T12:00:00.000Z")

const UPDATED = Date.parse("2026-09-22T12:00:00.000Z")

const PHRASES: WebPhrases = new Map([
  [buildDateLineCreated.slug, { title: buildDateLineCreated.title, description: null }],
  [buildDateLineUpdated.slug, { title: buildDateLineUpdated.title, description: null }],
])

test("a build never updated says when it was created", () => {
  expect(buildDateLine({ createdAt: CREATED, updatedAt: 0 }, PHRASES)).toBe(
    `Created ${new Date(CREATED).toLocaleDateString()}`
  )
  expect(buildDateLine({ createdAt: CREATED, updatedAt: CREATED }, PHRASES)).toBe(
    `Created ${new Date(CREATED).toLocaleDateString()}`
  )
})

test("a build updated after it was created says when it was updated", () => {
  expect(buildDateLine({ createdAt: CREATED, updatedAt: UPDATED }, PHRASES)).toBe(
    `Updated ${new Date(UPDATED).toLocaleDateString()}`
  )
})

test("a build with neither time says no date rather than 1969 or 1970", () => {
  expect(buildDateLine({ createdAt: null, updatedAt: 0 }, PHRASES)).toBe("")
})
