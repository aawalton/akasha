import { afterAll, expect, test } from "bun:test"
import type { Adding } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  repoWith,
  scratch,
} from "akasha/check/test/fixture/repo-seeding/repo-seeding.test-fixture.code.ts"
import {
  baseOf,
  changeOf,
} from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { generateChange } from "akasha/temper/player/character/stat/temper-metric/modules/metric-ids-keeping/metric-ids-keeping.change-generator.code.ts"

afterAll(scratch.sweep)

function stat(name: string, slug: string, subject: string): Adding {
  return {
    kind: "add",
    path: `akasha/${slug}.temper-metric.ts`,
    content: `export const ${name} = { type: "page-type/temper-metric", slug: "${slug}", subject: "${subject}" }\n`,
  }
}

function written(stats: readonly Adding[]): readonly string[] {
  const root = repoWith()
  return generateChange(changeOf(root, baseOf(root), stats)).edits.map((one) =>
    one.kind === "add" ? one.content : one.contentTo
  )
}

test("the ids are written in the order they sort in, a companion's apart", () => {
  const stats = [
    stat("power", "power", "player"),
    stat("armor", "armor", "player"),
    stat("companionArmor", "companion-armor", "companion"),
  ]
  expect(written(stats)).toEqual([
    'export type MetricId =\n  | "armor"\n  | "power"\n\nexport type CompanionMetricId =\n  | "companion-armor"\n',
  ])
})

test("a type no stat page falls under names nothing", () => {
  expect(written([stat("companionArmor", "companion-armor", "companion")])).toEqual([
    'export type MetricId = never\n\nexport type CompanionMetricId =\n  | "companion-armor"\n',
  ])
})
