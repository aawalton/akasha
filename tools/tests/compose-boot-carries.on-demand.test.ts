
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { readingsOf } from "../lib/read-record.ts"
import { canonicalize } from "../../repo/path/path"
import { type Fixture, fixture, installRepos } from "./fixture.ts"
import { plantSeat } from "./seat-fixture.ts"

const COMMAND = `${import.meta.dir}/../compose-boot.ts`
const AGENT = "agent-boot-carries"

let at: Fixture

beforeEach(() => {
  at = fixture()
  installRepos(at.root)
  at.put("pages/domain/global.domain.md", "---\nslug: global\ndomain-parent-slug: global\nrequired-reading-slugs:\n  - widget\n---\n\n# Definition\n\n- **Global** — the domain every other sits inside.\n")
  at.put("pages/domain/widget.md", "---\nslug: widget\ndomain-parent-slug: global\n---\n\n# Definition\n\n- **Widget** — the term the manifest names.\n\n# Design\n\nWhat was decided about a widget.\n")
})

afterEach(() => at.dispose())

function stateSeat(): void {
  plantSeat(at, { agent: AGENT, name: "booting", domain: "global" })
}

function boot(): string {
  const out = `${at.root}/composed.txt`
  const run = Bun.spawnSync({
    cmd: [process.execPath, COMMAND, "--agent", AGENT, "--out", out],
    env: { ...process.env, HOME: at.home, AKASHA_ROOT: at.root, AGENT_ID: AGENT },
    stdout: "pipe",
    stderr: "pipe",
  })
  expect(new TextDecoder().decode(run.stderr)).toBe("")
  return readFileSync(out, "utf8")
}

describe("what a boot prompt carries, now that it carries no document", () => {
  test("it names who the seat is, and embeds no document body", () => {
    stateSeat()
    const composed = boot()
    expect(composed).toContain("domain `global`")
    expect(composed).not.toContain("<document path=")
    expect(composed).not.toContain("What was decided about a widget.")
    expect(composed).not.toContain("the term the manifest names.")
  })

  test("it names no reading and no gate on having read", () => {
    stateSeat()
    const composed = boot()
    expect(composed).not.toContain("ops read")
    expect(composed).not.toContain("document(s)")
    expect(composed).not.toContain("refused")
  })

  test("composing it credits nothing, so the seat still owes every document", () => {
    stateSeat()
    boot()
    const embedded = canonicalize(`${at.root}/pages/domain/global.domain.md`)
    const carried = canonicalize(`${at.root}/pages/domain/widget.md`)
    const log = readingsOf(AGENT)
    expect(log[embedded]).toBeUndefined()
    expect(log[carried]).toBeUndefined()
  })

  test("writes nothing beside the prompt for anything to credit from", () => {
    stateSeat()
    boot()
    expect(existsSync(`${at.root}/composed.txt.reads.json`)).toBe(false)
  })
})
