import { expect, test } from "bun:test"
import { readTaskCompletions } from "akasha/temper/watcher/modules/watcher-task-capture/watcher-task-capture.module.code.ts"

const TASK = "11111111-1111-7000-8000-000000000001"

const CHARACTER = "8796093022338107"

interface Snapshot {
  readonly value: number
  readonly reached?: number
}

function luaOf(snapshots: Readonly<Record<string, Snapshot>>): string {
  const lines: string[] = []
  for (const [key, one] of Object.entries(snapshots)) {
    lines.push(`                    ["${key}"] =`)
    lines.push(`                    {`)
    lines.push(`                        ["date"] = "2026-09-22",`)
    lines.push(`                        ["value"] = ${one.value},`)
    if (one.reached !== undefined) {
      lines.push(`                        ["reached"] = ${one.reached},`)
    }
    lines.push(`                        ["charId"] = "${key.slice(37)}",`)
    lines.push(`                    },`)
  }
  return `TemperCharacters_SavedVariables =
{
    ["Default"] =
    {
        ["@aawal"] =
        {
            ["$AccountWide"] =
            {
                ["taskProgressSnapshots"] =
                {
${lines.join("\n")}
                },
            },
        },
    },
}
`
}

test("a snapshot a character opened the day on and has not passed is no progress", () => {
  const read = readTaskCompletions(luaOf({ [`${TASK}:${CHARACTER}`]: { value: 4000 } }))
  expect(read.progressed).toEqual([])
})

test("a snapshot reaching above the reading it opened on is progress", () => {
  const read = readTaskCompletions(
    luaOf({ [`${TASK}:${CHARACTER}`]: { value: 3900, reached: 4000 } })
  )
  expect(read.progressed).toEqual([{ taskId: TASK, characterId: CHARACTER }])
})

test("a snapshot reaching no higher than its opening is no progress", () => {
  const read = readTaskCompletions(
    luaOf({ [`${TASK}:${CHARACTER}`]: { value: 4000, reached: 4000 } })
  )
  expect(read.progressed).toEqual([])
})

test("a snapshot opened at nothing and reaching above it is progress", () => {
  const read = readTaskCompletions(luaOf({ [`${TASK}:${CHARACTER}`]: { value: 0, reached: 1 } }))
  expect(read.progressed).toEqual([{ taskId: TASK, characterId: CHARACTER }])
})

test("a snapshot naming the whole task rather than one character is left out", () => {
  const read = readTaskCompletions(luaOf({ [TASK]: { value: 10, reached: 20 } }))
  expect(read.progressed).toEqual([])
})
