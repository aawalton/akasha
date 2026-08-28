import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { closeSync, mkdirSync, openSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { readingsOf } from "../lib/read-record.ts"
import { canonicalize } from "../../repo/path/path.ts"
import { toolArgv } from "../lib/tool-argv.ts"
import { type Fixture, fixture, installRepos } from "./fixture.ts"
import { indexFixture, plantSeat } from "./seat-fixture.ts"

const LIVE = `${import.meta.dir}/../..`
const AGENT = "agent-seat-read"

let at: Fixture

beforeEach(() => {
  at = fixture()
  installRepos(at.root)
  at.installRecorder()
  at.put(
    "pages/domain/global.domain.md",
    "---\nslug: global\ndomain-parent-slug: global\nrequired-reading-slugs:\n  - domain/helper\nconditional-reading-slugs:\n  - domain/widget\n---\n\n# Definition\n\n- **Global** — the domain every other sits inside.\n"
  )
  at.put(
    "pages/domain/helper.domain.md",
    "---\nslug: helper\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Helper** — the document the chain requires.\n\n# Design\n\nWhat the helper decides.\n"
  )
  at.put(
    "pages/domain/widget.domain.md",
    "---\nslug: widget\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Widget** — the one named as conditional.\n\n# Design\n\nThe body that must not arrive unasked.\n"
  )
  plantSeat(at, { agent: AGENT, name: "reading", domain: "global" })
  Bun.spawnSync(["git", "init", "-q"], { cwd: at.root })
})

afterEach(() => at.dispose())

function run(argv: readonly string[], env: Record<string, string | undefined> = {}): { code: number; out: string } {
  indexFixture(at)
  const log = `${at.root}/seat-read.log`
  const kept: Record<string, string> = {}
  for (const [key, value] of Object.entries(process.env)) {
    if (key === "AGENT_ID" || key === "CLAUDE_CODE_SESSION_ID" || value === undefined) continue
    kept[key] = value
  }
  const settled: Record<string, string> = {
    ...kept,
    HOME: at.home,
    AKASHA_ROOT: at.root,
    CODE_ROOT: LIVE,
    AGENT_ID: AGENT,
  }
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete settled[key]
    else settled[key] = value
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

function recorded(relPath: string): boolean {
  return readingsOf(AGENT)[canonicalize(`${at.root}/${relPath}`)] !== undefined
}

describe("what one seat read hands back", () => {
  test("every document the seat's attributes bind it to, whole", () => {
    const { code, out } = run(["--seat"])
    expect(code).toBe(0)
    expect(out).toContain("the domain every other sits inside.")
    expect(out).toContain("the document the chain requires.")
    expect(out).toContain("What the helper decides.")
  })

  test("records each of them, so the next act is not refused for them", () => {
    expect(recorded("pages/domain/global.domain.md")).toBe(false)
    run(["--seat"])
    expect(recorded("pages/domain/global.domain.md")).toBe(true)
    expect(recorded("pages/domain/helper.domain.md")).toBe(true)
  })
})

describe("what it hands back for a document named as conditional", () => {
  test("its definition, so the seat can judge whether it bears on the work", () => {
    const { out } = run(["--seat"])
    expect(out).toContain("cond:   domain/widget")
    expect(out).toContain("the one named as conditional.")
  })

  test("not its body, which is the whole point of naming it rather than requiring it", () => {
    expect(run(["--seat"]).out).not.toContain("The body that must not arrive unasked.")
  })

  test("and no reading is recorded against it, a definition not being the document", () => {
    run(["--seat"])
    expect(recorded("pages/domain/widget.domain.md")).toBe(false)
  })
})

describe("a context that lost the bodies while the record stands", () => {
  test("gets them again rather than a line saying it already read them", () => {
    run(["--seat"])
    const second = run(["--seat"])
    expect(second.code).toBe(0)
    expect(second.out).toContain("What the helper decides.")
    expect(second.out).not.toContain("nothing follows")
  })
})

const INITIATIVE_AT = "pages/initiative/athena-consistent-seats.initiative.md"

function carryingAnInitiative(): void {
  at.put(
    INITIATIVE_AT,
    "---\npage-type-slug: initiative\nslug: consistent-seats\ntitle: \"Consistent seats\"\n---\n\n# Intent\n\nWhat the initiative itself asks for.\n"
  )
  plantSeat(at, { agent: AGENT, name: "reading", domain: "global", initiative: "consistent-seats" })
}

describe("what a seat holding an initiative gets", () => {
  test("the initiative's own body", () => {
    carryingAnInitiative()
    const { code, out } = run(["--seat"])
    expect(code).toBe(0)
    expect(out).toContain("What the initiative itself asks for.")
  })

  test("a reading recorded against it there, so the next act is not refused for it", () => {
    carryingAnInitiative()
    expect(recorded(INITIATIVE_AT)).toBe(false)
    run(["--seat"])
    expect(recorded(INITIATIVE_AT)).toBe(true)
  })
})

const MODE_AT = "pages/domain/seat-mode-interactive.domain.md"

function inMode(mode: "interactive" | "headless"): void {
  at.put(
    MODE_AT,
    "---\nslug: seat-mode-interactive\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Seat mode interactive** — a seat with a terminal attached.\n\n# Rules\n\n## Question Last\n\nWhat the interactive mode decides.\n"
  )
  at.put(
    "pages/domain/seat-mode-headless.domain.md",
    "---\nslug: seat-mode-headless\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Seat mode headless** — a seat with no terminal attached.\n\n# Rules\n\n## Question Sent\n\nWhat the headless mode decides.\n"
  )
  plantSeat(at, { agent: AGENT, name: "reading", domain: "global", mode })
}

describe("what a seat gets for the mode it is in", () => {
  test("the body of the domain for that mode", () => {
    inMode("interactive")
    const { code, out } = run(["--seat"])
    expect(code).toBe(0)
    expect(out).toContain("What the interactive mode decides.")
  })

  test("a reading recorded against it, so the next act is not refused for it", () => {
    inMode("interactive")
    expect(recorded(MODE_AT)).toBe(false)
    run(["--seat"])
    expect(recorded(MODE_AT)).toBe(true)
  })

  test("the headless domain rather than the interactive one where no terminal is attached", () => {
    inMode("headless")
    const { out } = run(["--seat"])
    expect(out).toContain("What the headless mode decides.")
    expect(out).not.toContain("What the interactive mode decides.")
  })
})

const CHILD = `${AGENT}--delegate-of-reading`

function delegating(): void {
  at.put(
    "pages/persona/claude.persona.md",
    "---\nslug: claude\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Claude** — the persona a delegate carries.\n\n# Design\n\nWhat the default persona decides.\n"
  )
  at.put(
    "pages/role/worker.role.md",
    "---\nslug: worker\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Worker** — the role a delegate carries.\n\n# Design\n\nWhat the default role decides.\n"
  )
  at.put(
    "pages/persona/athena.persona.md",
    "---\nslug: athena\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Athena** — the persona the seat itself carries.\n\n# Design\n\nWhat the seat's own persona decides.\n"
  )
  at.put(
    "pages/role/definer.role.md",
    "---\nslug: definer\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Definer** — the role the seat itself carries.\n\n# Design\n\nWhat the seat's own role decides.\n"
  )
  plantSeat(at, { agent: AGENT, name: "reading", domain: "global", persona: "athena", role: "definer" })
  const page = `${at.root}/agent/subagent/${CHILD}.subagent.md`
  mkdirSync(dirname(page), { recursive: true })
  writeFileSync(page, `---\npage-type-slug: subagent\nsubagent-id: ${CHILD}\ntitle: "${CHILD}"\n---\n`, "utf8")
  at.sweepOnDispose(page)
}

describe("what a subagent gets when it asks what it is bound to", () => {
  test("its seat's domain, rather than a refusal that it states no attributes", () => {
    delegating()
    const { code, out } = run(["--seat"], { ACTING_AGENT_ID: CHILD })
    expect(code).toBe(0)
    expect(out).toContain("the domain every other sits inside.")
  })

  test("not the persona and role its seat carries, a delegate stating none of its own", () => {
    delegating()
    const { out } = run(["--seat"], { ACTING_AGENT_ID: CHILD })
    expect(out).not.toContain("What the seat's own persona decides.")
    expect(out).not.toContain("What the seat's own role decides.")
  })

  test("the same set whatever its own page states, so it cannot choose what binds it", () => {
    delegating()
    const first = run(["--seat"], { ACTING_AGENT_ID: CHILD }).out
    writeFileSync(
      `${at.root}/agent/subagent/${CHILD}.subagent.md`,
      `---\npage-type-slug: subagent\nsubagent-id: ${CHILD}\ntitle: "${CHILD}"\npersona-slug: athena\nrole-slug: definer\ndomain-slug: widget\n---\n`,
      "utf8"
    )
    const second = run(["--seat"], { ACTING_AGENT_ID: CHILD }).out
    expect(second).toBe(first)
  })
})

describe("what it refuses", () => {
  test("a path beside it, the whole set being what it is for", () => {
    const { code, out } = run(["--seat", "--file-path", "pages/domain/helper.md"])
    expect(code).not.toBe(0)
    expect(out).toContain("takes no --file-path beside it")
    expect(out).toContain("--seat")
  })

  test("a --repo, this reading each path from whichever repository holds it", () => {
    const { code, out } = run(["--seat", "--repo", "memory"])
    expect(code).not.toBe(0)
    expect(out).toContain("takes no --repo")
  })

  test("a call from nothing that names which seat is asking", () => {
    const { code, out } = run(["--seat"], { AGENT_ID: undefined })
    expect(code).not.toBe(0)
    expect(out).toContain("nothing identifies which seat this is")
  })
})
