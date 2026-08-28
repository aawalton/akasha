import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { closeSync, openSync, readFileSync } from "node:fs"
import { ANSWER_CEILING } from "../../agent/read-answer.ts"
import { readingsOf } from "../lib/read-record.ts"
import { canonicalize } from "../../repo/path/path.ts"
import { type Fixture, fixture, installRepos } from "./fixture.ts"
import { indexFixture, plantSeat } from "./seat-fixture.ts"
import { toolArgv } from "../lib/tool-argv.ts"
const LIVE = `${import.meta.dir}/../..`
const AGENT = "agent-answer-ceiling"
const SLUGS = ["one", "two", "three", "four", "five", "six", "seven", "eight"] as const
const PADDING = "x".repeat(60)

function relPathOf(slug: string): string {
  return `pages/domain/${slug}.domain.md`
}

function lastLineOf(slug: string, lines: number): string {
  return `line ${lines} of ${slug}`
}

function domainBody(slug: string, lines: number): string {
  const filling = Array.from({ length: lines }, (_, at) => `line ${at + 1} of ${slug} ${PADDING}`).join("\n")
  return (
    `---\nslug: ${slug}\ndomain-parent-slug: global\n---\n\n# Definition\n\n` +
    `- **${slug}** — one of the many this reads.\n\n# Design\n\n${filling}\n`
  )
}

let at: Fixture

beforeEach(() => {
  at = fixture()
  installRepos(at.root)
  at.installRecorder(AGENT)
  at.put(
    "pages/domain/global.domain.md",
    "---\nslug: global\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Global** — the domain every other sits inside.\n"
  )
  for (const slug of SLUGS) at.put(relPathOf(slug), domainBody(slug, 60))
  Bun.spawnSync(["git", "init", "-q"], { cwd: at.root })
})

afterEach(() => at.dispose())

function run(argv: readonly string[]): { readonly code: number; readonly out: string } {
  indexFixture(at)
  const log = `${at.root}/answer.log`
  const kept: Record<string, string> = {}
  for (const [key, value] of Object.entries(process.env)) {
    if (key === "AGENT_ID" || key === "CLAUDE_CODE_SESSION_ID" || key === "ACTING_AGENT_ID") continue
    if (value === undefined) continue
    kept[key] = value
  }
  const settled: Record<string, string> = {
    ...kept,
    HOME: at.home,
    AKASHA_ROOT: at.root,
    CODE_ROOT: LIVE,
    AGENT_ID: AGENT,
  }
  const fd = openSync(log, "w")
  try {
    const cmd = [process.execPath, ...toolArgv("read.ts", argv, LIVE)]
    const proc = Bun.spawnSync({ cmd, cwd: at.root, env: settled, stdout: fd, stderr: fd })
    return { code: proc.exitCode ?? -1, out: readFileSync(log, "utf8") }
  } finally {
    closeSync(fd)
  }
}

function everyPath(): readonly string[] {
  return SLUGS.flatMap((slug) => ["--file-path", relPathOf(slug)])
}

function recorded(relPath: string): boolean {
  return readingsOf(AGENT)[canonicalize(`${at.root}/${relPath}`)] !== undefined
}

function continuationIn(out: string): readonly string[] {
  const line = out.split("\n").find((one) => one.startsWith("ops read "))
  if (line === undefined) return []
  return line.split(" ").slice(2)
}

describe("a set of files too big for one answer", () => {
  test("comes back inside the ceiling rather than running past it", () => {
    const { code, out } = run(everyPath())
    expect(code).toBe(0)
    expect(out.length).toBeLessThanOrEqual(ANSWER_CEILING)
  })

  test("carries whole files only: every one it opened, it finished", () => {
    const { out } = run(everyPath())
    const opened = SLUGS.filter((slug) => out.includes(`read:   ${relPathOf(slug)} —`))
    expect(opened.length).toBeGreaterThan(0)
    expect(opened.length).toBeLessThan(SLUGS.length)
    for (const slug of opened) expect(out).toContain(lastLineOf(slug, 60))
  })

  test("names what it left, in a call that is ready to run", () => {
    const { out } = run(everyPath())
    expect(out).toContain("left unread here")
    const rest = continuationIn(out)
    expect(rest).toContain("--file-path")
    expect(rest).toContain(relPathOf("eight"))
  })

  test("records nothing for what it left, the body never having reached anyone", () => {
    const { out } = run(everyPath())
    for (const slug of SLUGS) {
      expect(recorded(relPathOf(slug))).toBe(out.includes(`read:   ${relPathOf(slug)} —`))
    }
  })

  test("the call it names takes the rest, and the reading ends recorded whole", () => {
    let rest = continuationIn(run(everyPath()).out)
    for (let round = 0; round < SLUGS.length && rest.length > 0; round += 1) {
      rest = continuationIn(run(rest).out)
    }
    expect(rest).toEqual([])
    for (const slug of SLUGS) expect(recorded(relPathOf(slug))).toBe(true)
  })
})

describe("a single file larger than the ceiling", () => {
  const OVERSIZE = 500

  test("comes back named, without the body no answer could have carried", () => {
    at.put(relPathOf("one"), domainBody("one", OVERSIZE))
    const { code, out } = run(["--file-path", relPathOf("one")])
    expect(code).toBe(1)
    expect(out).toContain(relPathOf("one"))
    expect(out).not.toContain(lastLineOf("one", OVERSIZE))
    expect(out.length).toBeLessThanOrEqual(ANSWER_CEILING)
  })

  test("leaves nothing on the record, no part of it having reached anyone", () => {
    at.put(relPathOf("one"), domainBody("one", OVERSIZE))
    run(["--file-path", relPathOf("one")])
    expect(recorded(relPathOf("one"))).toBe(false)
  })

  test("does not stop a file beside it being read and recorded", () => {
    at.put(relPathOf("one"), domainBody("one", OVERSIZE))
    const { out } = run(["--file-path", relPathOf("one"), "--file-path", relPathOf("two")])
    expect(out).toContain(lastLineOf("two", 60))
    expect(recorded(relPathOf("two"))).toBe(true)
    expect(recorded(relPathOf("one"))).toBe(false)
  })
})

describe("what a seat gets when its own set runs past the ceiling", () => {
  function boundToAll(): void {
    at.put(
      "pages/domain/global.domain.md",
      "---\nslug: global\ndomain-parent-slug: global\nrequired-reading-slugs:\n" +
        SLUGS.map((slug) => `  - domain/${slug}`).join("\n") +
        "\nconditional-reading-slugs:\n  - domain/widget\n---\n\n# Definition\n\n" +
        "- **Global** — the domain every other sits inside.\n"
    )
    at.put(
      "pages/domain/widget.domain.md",
      "---\nslug: widget\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Widget** — the one named as conditional.\n"
    )
    plantSeat(at, { agent: AGENT, domain: "global" })
  }

  test("bodies it can act on, inside the ceiling, and the call for the rest", () => {
    boundToAll()
    const { code, out } = run(["--seat"])
    expect(code).toBe(0)
    expect(out.length).toBeLessThanOrEqual(ANSWER_CEILING)
    expect(out).toContain("the domain every other sits inside.")
    expect(out).toContain("left unread here")
    expect(continuationIn(out)).toContain("--full")
  })

  test("the conditional definitions it would have got anyway, none of them lost to the ceiling", () => {
    boundToAll()
    const { out } = run(["--seat"])
    expect(out).toContain("cond:   domain/widget")
    expect(out).toContain("the one named as conditional.")
  })
})

describe("what --full forces, and what it leaves to the record", () => {
  const SUBJECT = "pages/domain/global.domain.md"

  function requiringOne(): void {
    at.put(
      SUBJECT,
      "---\nslug: global\ndomain-parent-slug: global\nrequired-reading-slugs:\n  - domain/one\n---\n\n" +
        "# Definition\n\n- **Global** — the domain every other sits inside.\n"
    )
  }

  test("the path you named, whole again, whatever the record holds of it", () => {
    requiringOne()
    run(["--file-path", SUBJECT])
    const { out } = run(["--full", "--file-path", SUBJECT])
    expect(out).toContain("the domain every other sits inside.")
  })

  test("a document carried in beside it, already held, costing a line rather than its body", () => {
    requiringOne()
    expect(run(["--file-path", SUBJECT]).out).toContain(lastLineOf("one", 60))
    const { out } = run(["--full", "--file-path", SUBJECT])
    expect(out).toContain(`${relPathOf("one")} — unchanged since you read it`)
    expect(out).not.toContain(lastLineOf("one", 60))
  })
})
