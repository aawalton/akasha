import { expect, test } from "bun:test"
import {
  computingOver,
  type Held,
  type Subject,
} from "akasha/page/modules/computing/page-computing.module.code.ts"
import { work } from "akasha/temper/player/progress/temper-task/properties/character-sort-order.computed-property.code.ts"

const ERIN = "character/erin"

const ORDER = { slug: "character-sort-order", key: "characterSortOrder", holds: "number", work }

function orderOf(task: Held, character: Held = { displayOrder: 1 }): unknown {
  const pages: Readonly<Record<string, Subject>> = {
    [ERIN]: { id: "erin", value: character, computed: [] },
    task: { id: "task", value: task, computed: [ORDER] },
  }
  const worked = computingOver({ subjectAt: (slug) => pages[slug] ?? null }).workedAt("task")
  return worked?.value["characterSortOrder"]
}

test("a task's sort order is its effective character's display order", () => {
  expect(orderOf({ effectiveCharacter: ERIN })).toBe(1)
})

test("a task naming only a character that is not its effective one has no sort order", () => {
  expect(orderOf({ character: ERIN })).toBeUndefined()
})

test("a task whose effective character is not there has no sort order", () => {
  expect(orderOf({ effectiveCharacter: "character/gone" })).toBeUndefined()
})

test("a character stating no display order gives its tasks no sort order", () => {
  expect(orderOf({ effectiveCharacter: ERIN }, {})).toBeUndefined()
})
