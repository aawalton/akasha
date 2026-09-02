import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { parse as parseYaml } from "yaml"
import { uuidVersion7 } from "../../akasha/command-system/value-minting/value-minting.module.code.ts"
import { camelizeKey } from "../lib/tracking/keys.ts"
import { compareCorpora } from "./compare.ts"
import { readCorpus } from "./read-corpus.ts"

const CORPUS = process.argv[2] ?? "pages/daily-tracking"
const YARD = process.argv[3] ?? "/tmp/daily-tracking-fidelity-proof"
if (!YARD.startsWith("/tmp/")) {
  process.stderr.write("the proof writes corrupted copies and must be given a /tmp directory\n")
  process.exit(2)
}
const BASE = join(YARD, "base")
const GOOD = join(YARD, "migrated-good")
const PAGES = join(YARD, "migrated-pages")
const MD = ".daily-tracking.md"
const SESSIONS = ".daily-tracking.sessions.jsonl"
const TASKS = ".daily-tracking.completed-tasks.jsonl"

rmSync(YARD, { recursive: true, force: true })
mkdirSync(BASE, { recursive: true })
for (const name of readdirSync(CORPUS)) {
  if (name.endsWith(".md") || name.endsWith(".jsonl")) {
    writeFileSync(join(BASE, name), readFileSync(join(CORPUS, name), "utf8"))
  }
}

mkdirSync(GOOD, { recursive: true })
const idMap: Record<string, string> = {}
for (const name of readdirSync(BASE)) {
  const text = readFileSync(join(BASE, name), "utf8")
  if (!name.endsWith(MD)) {
    writeFileSync(join(GOOD, name), text)
    continue
  }
  const day = name.slice(0, -MD.length)
  let sawSlug = false
  const out: string[] = []
  for (const line of text.split("\n")) {
    const idAt = /^id: (.+)$/.exec(line)
    if (idAt !== null) {
      const old = idAt[1] as string
      if (old[14] !== "7") {
        const fresh = uuidVersion7()
        idMap[old] = fresh
        out.push(`id: ${fresh}`)
        continue
      }
      out.push(line)
      continue
    }
    const slugAt = /^slug: (.+)$/.exec(line)
    if (slugAt !== null) {
      sawSlug = true
      out.push(`slug: day-${slugAt[1]}`)
      continue
    }
    out.push(line)
  }
  if (!sawSlug) out.splice(out.indexOf("---", 1), 0, `slug: day-${day}`)
  writeFileSync(join(GOOD, name), out.join("\n"))
}

mkdirSync(PAGES, { recursive: true })
const pageStem = (day: string): string => `day-${day}.daily-tracking`
for (const name of readdirSync(GOOD).filter((f) => f.endsWith(MD))) {
  const day = name.slice(0, -MD.length)
  const fence = /^---\n([\s\S]*?)\n---/.exec(readFileSync(join(GOOD, name), "utf8"))
  const doc = parseYaml((fence as RegExpExecArray)[1] as string) as Record<string, unknown>
  const value: Record<string, unknown> = {}
  for (const [key, held] of Object.entries(doc)) value[camelizeKey(key)] = held
  for (const [suffix, propertySlug] of [[SESSIONS, "sessions"], [TASKS, "completed-tasks"]] as const) {
    const beside = join(GOOD, `${day}${suffix}`)
    if (!existsSync(beside)) continue
    value[camelizeKey(propertySlug)] = "jsonl"
    writeFileSync(join(PAGES, `${pageStem(day)}.${propertySlug}.jsonl`), readFileSync(beside, "utf8"))
  }
  const body = Object.entries(value)
    .map(([key, held]) => `  ${key}: ${JSON.stringify(held)},`)
    .join("\n")
  writeFileSync(
    join(PAGES, `${pageStem(day)}.ts`),
    `export const ${camelizeKey(`day-${day}`)} = {\n${body}\n} as const\n`,
  )
}

type Row = Record<string, unknown>
type Case = { name: string; damage: string; expect: string; apply: (dir: string) => void }

const mdNames = (dir: string): string[] => readdirSync(dir).filter((f) => f.endsWith(MD)).sort()
const editMd = (dir: string, day: string, fn: (lines: string[]) => string[]): void => {
  const path = join(dir, `${day}${MD}`)
  writeFileSync(path, fn(readFileSync(path, "utf8").split("\n")).join("\n"))
}
const rowsOf = (path: string): Row[] =>
  readFileSync(path, "utf8").split("\n").filter((l) => l.trim()).map((l) => JSON.parse(l) as Row)
const editRows = (dir: string, file: string, fn: (rows: Row[]) => Row[]): void => {
  const path = join(dir, file)
  writeFileSync(path, `${fn(rowsOf(path)).map((r) => JSON.stringify(r)).join("\n")}\n`)
}
const anyFile = (dir: string, suffix: string): string =>
  readdirSync(dir).filter((f) => f.endsWith(suffix)).sort()[0] as string
const dayCarrying = (dir: string, key: string): string => {
  for (const name of mdNames(dir)) {
    if (readFileSync(join(dir, name), "utf8").includes(`\n${key}:`)) return name.slice(0, -MD.length)
  }
  throw new Error(`no day carries ${key}`)
}
const rowFileCarrying = (dir: string, suffix: string, key: string): string => {
  for (const name of readdirSync(dir).filter((f) => f.endsWith(suffix)).sort()) {
    if (readFileSync(join(dir, name), "utf8").includes(`"${key}":`)) return name
  }
  throw new Error(`no ${suffix} carries ${key}`)
}

const CASES: Case[] = [
  {
    name: "01-frontmatter-key-dropped",
    damage: "a day loses its task-points key entirely",
    expect: "key-vanished",
    apply: (dir) =>
      editMd(dir, dayCarrying(dir, "task-points"), (lines) =>
        lines.filter((l) => !l.startsWith("task-points:"))),
  },
  {
    name: "02-value-emptied",
    damage: "a title becomes an empty string rather than keeping its text",
    expect: "value-changed",
    apply: (dir) =>
      editMd(dir, dayCarrying(dir, "title"), (lines) =>
        lines.map((l) => (l.startsWith("title:") ? 'title: ""' : l))),
  },
  {
    name: "03-float-truncated",
    damage: "a fractional health-points is rounded to a whole number",
    expect: "value-changed",
    apply: (dir) => {
      for (const name of mdNames(dir)) {
        const text = readFileSync(join(dir, name), "utf8")
        const at = /\nhealth-points: (\d+\.\d+)\n/.exec(text)
        if (at === null) continue
        const whole = String(Math.trunc(Number(at[1])))
        writeFileSync(join(dir, name), text.replace(at[0] as string, `\nhealth-points: ${whole}\n`))
        return
      }
      throw new Error("no fractional health-points found")
    },
  },
  {
    name: "04-version-numberified",
    damage: "a quoted float-looking version becomes a number",
    expect: "type-changed",
    apply: (dir) =>
      editMd(dir, dayCarrying(dir, "version"), (lines) =>
        lines.map((l) => (l.startsWith("version:") ? "version: 1" : l))),
  },
  {
    name: "05-timestamp-zone-dropped",
    damage: "a session start-time loses its trailing Z so its zone becomes a guess",
    expect: "unzoned-target-instant",
    apply: (dir) =>
      editRows(dir, anyFile(dir, SESSIONS), (rows) => {
        const first = rows[0] as Row
        first["start-time"] = String(first["start-time"]).replace(/Z$/, "")
        return rows
      }),
  },
  {
    name: "06-timestamp-shifted",
    damage: "a completed-at is shifted by one hour, as a naive local-time read would",
    expect: "value-changed",
    apply: (dir) =>
      editRows(dir, anyFile(dir, TASKS), (rows) => {
        const first = rows[0] as Row
        first["completed-at"] = new Date(
          Date.parse(first["completed-at"] as string) + 3600000,
        ).toISOString()
        return rows
      }),
  },
  {
    name: "07-list-emptied",
    damage: "a populated relationships list becomes an empty one",
    expect: "value-changed",
    apply: (dir) =>
      editRows(dir, rowFileCarrying(dir, SESSIONS, "relationships"), (rows) => {
        const target = rows.find(
          (r) => Array.isArray(r["relationships"]) && (r["relationships"] as unknown[]).length > 0,
        )
        if (target !== undefined) target["relationships"] = []
        return rows
      }),
  },
  {
    name: "08-row-deleted",
    damage: "one completed-task row is dropped",
    expect: "row-missing",
    apply: (dir) => editRows(dir, anyFile(dir, TASKS), (rows) => rows.slice(1)),
  },
  {
    name: "09-rows-reordered",
    damage: "two session rows swap places, losing the order the file carried",
    expect: "row-order-changed",
    apply: (dir) => {
      for (const name of readdirSync(dir).filter((f) => f.endsWith(SESSIONS)).sort()) {
        const lines = readFileSync(join(dir, name), "utf8").split("\n").filter((l) => l.trim())
        if (lines.length < 2) continue
        writeFileSync(join(dir, name), `${[lines[1], lines[0], ...lines.slice(2)].join("\n")}\n`)
        return
      }
      throw new Error("no sessions file with two rows")
    },
  },
  {
    name: "10-id-reminted-off-the-map",
    damage: "a day identity is silently replaced with a fresh one",
    expect: "id-map-missing",
    apply: (dir) => {
      const name = mdNames(dir).at(-1) as string
      editMd(dir, name.slice(0, -MD.length), (lines) =>
        lines.map((l) => (l.startsWith("id: ") ? `id: ${uuidVersion7()}` : l)))
    },
  },
  {
    name: "11-list-tail-lost",
    damage: "the last entry of a persona-days list is dropped",
    expect: "value-changed",
    apply: (dir) => {
      for (const name of mdNames(dir)) {
        const lines = readFileSync(join(dir, name), "utf8").split("\n")
        const at = lines.findIndex((l) => l.startsWith("persona-days:"))
        if (at === -1) continue
        let last = at
        while (last + 1 < lines.length && (lines[last + 1] as string).startsWith("  - ")) last += 1
        if (last - at < 2) continue
        writeFileSync(join(dir, name), [...lines.slice(0, last), ...lines.slice(last + 1)].join("\n"))
        return
      }
      throw new Error("no persona-days list with two entries")
    },
  },
  {
    name: "12-number-from-text-changed",
    damage: "an integer-looking safety-level text becomes a number of another value",
    expect: "value-changed",
    apply: (dir) =>
      editRows(dir, rowFileCarrying(dir, SESSIONS, "safety-level"), (rows) => {
        const target = rows.find((r) => r["safety-level"] !== undefined) as Row
        target["safety-level"] = Number(target["safety-level"]) + 1
        return rows
      }),
  },
  {
    name: "13-whole-day-file-deleted",
    damage: "one day page file is gone; a lenient reader would call it empty",
    expect: "day-missing",
    apply: (dir) => rmSync(join(dir, anyFile(dir, MD))),
  },
  {
    name: "14-file-truncated-mid-json",
    damage: "a sidecar is truncated mid-row; a lenient reader would skip it",
    expect: "read-fault",
    apply: (dir) => {
      const file = anyFile(dir, TASKS)
      const text = readFileSync(join(dir, file), "utf8")
      writeFileSync(join(dir, file), text.slice(0, Math.floor(text.length / 2)))
    },
  },
  {
    name: "15-unledgered-key-added",
    damage: "a key nobody declared a policy for appears on a row",
    expect: "key-unledgered",
    apply: (dir) =>
      editRows(dir, anyFile(dir, SESSIONS), (rows) => {
        ;(rows[0] as Row)["mood-points"] = 4
        return rows
      }),
  },
  {
    name: "16-slug-left-bare",
    damage: "one day keeps its bare date slug, which is no TypeScript export name",
    expect: "slug-not-prefixed",
    apply: (dir) => {
      const day = dayCarrying(dir, "slug")
      editMd(dir, day, (lines) => lines.map((l) => (l.startsWith("slug: day-") ? `slug: ${day}` : l)))
    },
  },
  {
    name: "17-row-moved-to-another-day",
    damage: "a session row's daily-tracking reference points at a different day",
    expect: "id-map-missing",
    apply: (dir) => {
      const files = readdirSync(dir).filter((f) => f.endsWith(SESSIONS)).sort()
      const other = rowsOf(join(dir, files[1] as string))[0] as Row
      editRows(dir, files[0] as string, (rows) => {
        ;(rows[0] as Row)["daily-tracking"] = other["daily-tracking"]
        return rows
      })
    },
  },
  {
    name: "18-required-key-absent",
    damage: "a task row loses its seq, the only ordering key it has",
    expect: "required-key-absent",
    apply: (dir) =>
      editRows(dir, anyFile(dir, TASKS), (rows) => {
        delete (rows[0] as Row)["seq"]
        return rows
      }),
  },
  {
    name: "19-calendar-date-shifted",
    damage: "a due-date moves one calendar day",
    expect: "value-changed",
    apply: (dir) =>
      editRows(dir, rowFileCarrying(dir, TASKS, "due-date"), (rows) => {
        const target = rows.find((r) => r["due-date"] !== undefined) as Row
        const moved = new Date(Date.parse(`${target["due-date"] as string}T00:00:00Z`) + 86400000)
        target["due-date"] = moved.toISOString().slice(0, 10)
        return rows
      }),
  },
  {
    name: "20-true-empty-list-dropped",
    damage: "a relationships key holding an empty list is dropped rather than kept empty",
    expect: "key-vanished",
    apply: (dir) => {
      for (const name of readdirSync(dir).filter((f) => f.endsWith(SESSIONS)).sort()) {
        const rows = rowsOf(join(dir, name))
        const target = rows.find(
          (r) => Array.isArray(r["relationships"]) && (r["relationships"] as unknown[]).length === 0,
        )
        if (target === undefined) continue
        delete target["relationships"]
        writeFileSync(join(dir, name), `${rows.map((r) => JSON.stringify(r)).join("\n")}\n`)
        return
      }
      throw new Error("no session row carries an empty relationships list")
    },
  },
]

for (const one of CASES) {
  const dir = join(YARD, "cases", one.name)
  rmSync(dir, { recursive: true, force: true })
  cpSync(GOOD, dir, { recursive: true })
  one.apply(dir)
}

type PageCase = { name: string; damage: string; expect: string; apply: (dir: string) => void }

const PAGE_CASES: PageCase[] = [
  {
    name: "21-stated-entry-file-gone",
    damage: "a page states sessions: jsonl and the file beside it is deleted",
    expect: "read-fault",
    apply: (dir) => {
      const gone = readdirSync(dir).filter((f) => f.endsWith(".sessions.jsonl")).sort()[0] as string
      rmSync(join(dir, gone))
    },
  },
  {
    name: "22-entry-file-nothing-states",
    damage: "rows sit beside a page that never names them, so nothing would read them",
    expect: "read-fault",
    apply: (dir) => {
      for (const page of readdirSync(dir).filter((f) => f.endsWith(".daily-tracking.ts")).sort()) {
        if (readFileSync(join(dir, page), "utf8").includes("completedTasks:")) continue
        const stem = page.slice(0, -".ts".length)
        writeFileSync(join(dir, `${stem}.completed-tasks.jsonl`), '{"id":"x","seq":1}\n')
        return
      }
      throw new Error("every page states completed-tasks")
    },
  },
  {
    name: "23-entry-row-key-dropped",
    damage: "a row inside an entry file loses a key it carried",
    expect: "key-vanished",
    apply: (dir) => {
      for (const name of readdirSync(dir).filter((f) => f.endsWith(".completed-tasks.jsonl")).sort()) {
        const rows = rowsOf(join(dir, name))
        const target = rows.find((r) => r["category"] !== undefined)
        if (target === undefined) continue
        delete target["category"]
        writeFileSync(join(dir, name), `${rows.map((r) => JSON.stringify(r)).join("\n")}\n`)
        return
      }
      throw new Error("no task row carries a category")
    },
  },
  {
    name: "24-entry-rows-reordered",
    damage: "two lines of an entry file swap, which under this shape is the only way order is lost",
    expect: "row-order-changed",
    apply: (dir) => {
      for (const name of readdirSync(dir).filter((f) => f.endsWith(".sessions.jsonl")).sort()) {
        const lines = readFileSync(join(dir, name), "utf8").split("\n").filter((l) => l.trim())
        if (lines.length < 2) continue
        writeFileSync(join(dir, name), `${[lines[1], lines[0], ...lines.slice(2)].join("\n")}\n`)
        return
      }
      throw new Error("no entry file with two rows")
    },
  },
]

for (const one of PAGE_CASES) {
  const dir = join(YARD, "cases-pages", one.name)
  rmSync(dir, { recursive: true, force: true })
  cpSync(PAGES, dir, { recursive: true })
  one.apply(dir)
}

const before = await readCorpus(BASE)
let failures = 0

async function judge(name: string, dir: string, expect: string): Promise<void> {
  const after = await readCorpus(dir)
  const verdict = compareCorpora(before, after, idMap)
  const kinds = new Map<string, number>()
  for (const fault of verdict.faults) kinds.set(fault.kind, (kinds.get(fault.kind) ?? 0) + 1)
  const found = [...kinds].map(([k, n]) => `${k}(${n})`).join(" ") || "lossless"
  const ok = expect === "lossless" ? verdict.faults.length === 0 : kinds.has(expect)
  if (!ok) failures += 1
  process.stdout.write(`  ${ok ? "PASS" : "FAIL"}  ${name.padEnd(34)} ${found}\n`)
}

process.stdout.write(
  `\nold corpus  days=${before.days.size} sessions=${before.sessions.length} tasks=${before.tasks.length} read-faults=${before.faults.length}\n`,
)
process.stdout.write(`re-minted   ${Object.keys(idMap).length} uuid version 5 identities\n\n`)
process.stdout.write("control\n")
await judge("faithful migration, markdown", GOOD, "lossless")
await judge("faithful migration, entries shape", PAGES, "lossless")
process.stdout.write("\ncorruption cases\n")
for (const one of CASES) await judge(one.name, join(YARD, "cases", one.name), one.expect)
for (const one of PAGE_CASES) await judge(one.name, join(YARD, "cases-pages", one.name), one.expect)
process.stdout.write(`\n${failures === 0 ? "every case landed as declared" : `${failures} case(s) did not`}\n`)
process.exit(failures === 0 ? 0 : 1)
