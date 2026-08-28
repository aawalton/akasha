import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { endsOf, lastWordsIn, reportOf, transcriptsOf } from "./subagent-end.ts"

const SESSION = "0917ff8f-ddf9-4d67-b06c-6c59dec5f283"

const OTHER_SESSION = "beb04e61-d7e2-471d-8a27-5b1bf50251f3"

const DIED = "API Error: Connection lost mid-response. The response above may be incomplete."

function assistant(text: string): string {
  return JSON.stringify({
    type: "assistant",
    timestamp: "2026-08-28T03:48:28.000Z",
    message: { role: "assistant", content: [{ type: "text", text }] },
  })
}

function toolResult(text: string): string {
  return JSON.stringify({
    type: "user",
    message: { role: "user", content: [{ type: "tool_result", tool_use_id: "t1", content: text }] },
  })
}

interface Planted {
  readonly root: string
  readonly plant: (session: string, id: string, lines: readonly string[]) => string
}

function planting(): Planted {
  const root = mkdtempSync("/var/tmp/akasha-subagent-end-")
  return {
    root,
    plant(session, id, lines) {
      const dir = `${root}/-var-home-walton-repos/${session}/tasks`
      mkdirSync(dir, { recursive: true })
      const at = `${dir}/${id}.output`
      writeFileSync(at, `${lines.join("\n")}\n`)
      return at
    },
  }
}

describe("finding a subagent's transcript by its id alone", () => {
  test("an id is found under a session other than the one asking, which is the restart case", () => {
    const at = planting()
    try {
      const wrote = at.plant(OTHER_SESSION, "a95af44d76de11b66", [assistant(DIED)])
      const found = transcriptsOf(["a95af44d76de11b66"], at.root)
      expect(found.get("a95af44d76de11b66")).toBe(wrote)
    } finally {
      rmSync(at.root, { recursive: true, force: true })
    }
  })

  test("an id with no transcript anywhere is absent rather than guessed at", () => {
    const at = planting()
    try {
      at.plant(SESSION, "a95af44d76de11b66", [assistant("done")])
      const found = transcriptsOf(["a242e7230b38f7ba1"], at.root)
      expect(found.size).toBe(0)
    } finally {
      rmSync(at.root, { recursive: true, force: true })
    }
  })

  test("several ids spread across sessions are all found in one pass", () => {
    const at = planting()
    try {
      at.plant(SESSION, "aaa", [assistant("one")])
      at.plant(OTHER_SESSION, "bbb", [assistant("two")])
      const found = transcriptsOf(["aaa", "bbb"], at.root)
      expect(found.size).toBe(2)
    } finally {
      rmSync(at.root, { recursive: true, force: true })
    }
  })
})

describe("the last words a transcript ends on", () => {
  test("a transport death is reported as the words it died saying", () => {
    expect(lastWordsIn([assistant("working on it"), assistant(DIED)])).toBe(DIED)
  })

  test("records after the last assistant one are stepped over rather than reported", () => {
    expect(lastWordsIn([assistant(DIED), toolResult("exit 0")])).toBe(DIED)
  })

  test("a transcript with nothing an assistant said has no last words", () => {
    expect(lastWordsIn([toolResult("exit 0")])).toBe(null)
  })

  test("a line that is not JSON is stepped over rather than throwing", () => {
    expect(lastWordsIn([assistant(DIED), "{half an object"])).toBe(DIED)
  })

  test("words past the ceiling are cut and marked, so one report cannot flood a boot", () => {
    const said = lastWordsIn([assistant("x".repeat(500))])
    expect(said).toHaveLength(301)
    expect(said?.endsWith("…")).toBe(true)
  })
})

describe("what a restarted seat is told", () => {
  test("a subagent that died is reported with its cause and where to read the rest", () => {
    const at = planting()
    try {
      const wrote = at.plant(OTHER_SESSION, "a95af44d76de11b66", [assistant("looking"), assistant(DIED)])
      const ends = endsOf([{ name: "athena--a95af44d76de11b66", dispatchedAs: "Explore" }], at.root)
      expect(ends).toHaveLength(1)
      expect(ends[0]?.lastWords).toBe(DIED)
      expect(ends[0]?.transcript).toBe(wrote)
      const said = reportOf(ends)
      expect(said).toContain("1 subagent was still out")
      expect(said).toContain(`ended saying: ${DIED}`)
      expect(said).toContain(wrote)
    } finally {
      rmSync(at.root, { recursive: true, force: true })
    }
  })

  test("a subagent whose transcript is gone says that, rather than reporting nothing", () => {
    const at = planting()
    try {
      const ends = endsOf([{ name: "athena--a242e7230b38f7ba1", dispatchedAs: "Explore" }], at.root)
      expect(ends[0]?.transcript).toBe(null)
      expect(reportOf(ends)).toContain("left no transcript to read")
    } finally {
      rmSync(at.root, { recursive: true, force: true })
    }
  })

  test("several are counted and worded as several", () => {
    const at = planting()
    try {
      at.plant(SESSION, "aaa", [assistant(DIED)])
      at.plant(SESSION, "bbb", [assistant("finished the sweep")])
      const said = reportOf(
        endsOf(
          [
            { name: "athena--aaa", dispatchedAs: "Explore" },
            { name: "athena--bbb", dispatchedAs: "general-purpose" },
          ],
          at.root
        )
      )
      expect(said).toContain("2 subagents were still out")
      expect(said).toContain(DIED)
      expect(said).toContain("finished the sweep")
    } finally {
      rmSync(at.root, { recursive: true, force: true })
    }
  })

  test("no subagent standing prints nothing at all, so a clean boot stays clean", () => {
    expect(reportOf([])).toBe("")
  })

  test("a transcript past the tail bound still reports the words it ended on", () => {
    const at = planting()
    try {
      const padding = Array.from({ length: 400 }, (_, n) => assistant(`${String(n)} ${"p".repeat(400)}`))
      at.plant(SESSION, "aaa", [...padding, assistant(DIED)])
      const ends = endsOf([{ name: "athena--aaa", dispatchedAs: "Explore" }], at.root)
      expect(ends[0]?.lastWords).toBe(DIED)
    } finally {
      rmSync(at.root, { recursive: true, force: true })
    }
  })
})
