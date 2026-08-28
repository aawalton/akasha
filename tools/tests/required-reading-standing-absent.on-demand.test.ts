import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { type Standing, standingOn } from "../lib/required-reading-standing.ts"
import type { Repo } from "../../page/document/types.ts"
import { CLAIMED, type Fixture, fileKeyDeclared, fixture, personaPages } from "./fixture.ts"

let at: Fixture

beforeEach(() => {
  at = fixture()
})

afterEach(() => {
  at.dispose()
})

function run(relPath: string, agent: string | null = "agent-one", repo: Repo = "instructions"): Standing {
  return standingOn({ relPath, repo, root: at.root, agent })
}

function said(standing: Standing): string {
  return standing.refusals.join("\n")
}

describe("when the machinery is not there", () => {
  test("an agent no page carries a record for refuses, and reading cannot mend it", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    const standing = run("pages/persona/aria.persona.md")
    expect(standing.kind).toBe("unrecorded")
    expect(standing.refusals).toHaveLength(1)
    expect(said(standing)).toContain("no page carries that record")
  })

  test("nothing recording is silent where nothing is required for, so it is not noise", () => {
    personaPages(at)
    expect(run("tools/lib/thing.ts").kind).toBe("unrequired")
  })

  test("an unidentifiable agent is refused rather than charged to a shared record", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.installRecorder()
    const standing = run("pages/persona/aria.persona.md", null)
    expect(standing.kind).toBe("unattributed")
    expect(said(standing)).toContain("AGENT_ID")
    expect(said(standing)).toContain("CLAUDE_CODE_SESSION_ID")
    expect(said(standing)).toContain("pages/domain/persona.md")
  })

  test("both absent at once answers on the agent, there being none to ask for a record", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    const standing = run("pages/persona/aria.persona.md", null)
    expect(standing.kind).toBe("unattributed")
    expect(standing.refusals).toHaveLength(1)
  })
})

describe("what is nobody's business here", () => {
  test("a path under dirty/ requires nothing", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/tasks/quarantined.md", `${CLAIMED}: dirty/skills/old.md`, 12)
    at.installRecorder()
    expect(run("dirty/skills/old.md").kind).toBe("unrequired")
  })

  test("a claim under dirty/ is required for nothing", () => {
    fileKeyDeclared(at)
    at.document("dirty/skills/old.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.installRecorder()
    expect(run("pages/persona/aria.persona.md").kind).toBe("unrequired")
  })

  test("a path outside the root is the caller's bound, not this rule's, and does not throw", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.installRecorder()
    const standing = run("../elsewhere/aria.md")
    expect(standing.kind).toBe("unaskable")
    expect(standing.detail).toContain("could not be asked")
  })

  test("an absolute path is refused the same way, rather than resolved against the root", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/tasks/quarantined.md", `${CLAIMED}: dirty/skills/old.md`, 12)
    at.installRecorder()
    expect(run("/home/walton/repos/akasha/pages/persona/aria.persona.md").kind).toBe("unaskable")
  })

  test("an empty path does not throw", () => {
    at.installRecorder()
    expect(run("").kind).toBe("unaskable")
  })

  test("a document nobody can open makes the whole question unaskable, loudly", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.installRecorder()
    const absolute = `${at.root}/pages/domain/persona.md`
    Bun.spawnSync({ cmd: ["chmod", "000", absolute] })
    let standing: Standing
    try {
      standing = run("pages/persona/aria.persona.md")
    } finally {
      Bun.spawnSync({ cmd: ["chmod", "644", absolute] })
    }
    expect(standing.kind).toBe("unaskable")
    expect(standing.refusals).toHaveLength(0)
    expect(standing.detail).toContain("could not be asked")
    expect(standing.detail).toContain("pages/domain/persona.md")
  })
})

describe("the refusal stays actionable", () => {
  test("a long list is truncated and says what was left out", () => {
    fileKeyDeclared(at)
    const named = Array.from({ length: 14 }, (_, i) => `  - rule-${i + 1}`).join("\n")
    at.document("pages/domain/tasks/rule-0.md", `required-reading-slugs:\n${named}\n${CLAIMED}: pages/persona/aria.persona.md`, 5)
    for (let i = 1; i < 15; i += 1) at.document(`pages/domain/tasks/rule-${i}.md`, `slug: rule-${i}`, 5)
    at.installRecorder()
    const standing = run("pages/persona/aria.persona.md")
    expect(standing.detail).toContain("15 document(s) are required reading for this path; 0 read, 15 not")
    expect(standing.refusals).toHaveLength(14)
    expect(said(standing)).toContain("and 3 more, not listed")
  })

  test("the lead names this very path, and the one route a reading is recorded through", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.installRecorder()
    const lead = said(run("pages/persona/aria.persona.md"))
    expect(lead).toContain("`pages/persona/aria.persona.md` requires 1 document(s)")
    expect(lead).toContain("Only `ops read` lands a record there")
  })

  test("a document too long for one Read is refused no differently, the route not truncating", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 2400)
    at.installRecorder()
    expect(said(run("pages/persona/aria.persona.md"))).toContain(
      "`ops read --file-path pages/domain/persona.md` prints what you are " +
        "missing of it and records the read"
    )
  })
})
