
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { type Standing, standingOn } from "../lib/required-reading-standing.ts"
import type { Repo } from "../../page/document/types.ts"
import { CLAIMED, type Fixture, fileKeyDeclared, fixture, personaPages, documentBody } from "./fixture.ts"

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

function landing(
  relPath: string,
  bodies: Record<string, string>,
  agent: string | null = "agent-one"
): Standing {
  return standingOn({
    relPath,
    repo: "instructions",
    root: at.root,
    agent,
    pending: {
      paths: new Set(Object.keys(bodies)),
      read: (path) => {
        const proposed = bodies[path]
        if (proposed !== undefined) return proposed
        const absolute = `${at.root}/${path}`
        return existsSync(absolute) ? readFileSync(absolute, "utf8") : null
      },
    },
  })
}

describe("what is required for a path", () => {
  test("a path nothing is required for has nothing to have read", () => {
    personaPages(at)
    at.installRecorder()
    const standing = run("tools/lib/thing.ts")
    expect(standing.kind).toBe("unrequired")
    expect(standing.refusals).toHaveLength(0)
  })

  test("one required document, read in full, passes", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.readIt("agent-one", "pages/domain/persona.md")
    const standing = run("pages/persona/aria.persona.md")
    expect(standing.kind).toBe("read")
    expect(standing.detail).toContain("1 document(s) are required reading for this path; all read in full")
  })

  test("one required document, unread, refuses and names the route to the whole of it", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.installRecorder()
    const standing = run("pages/persona/aria.persona.md")
    expect(standing.kind).toBe("missing")
    expect(said(standing)).toContain("NOT YET READ")
    expect(said(standing)).toContain(
      "`ops read --file-path pages/domain/persona.md` prints what you are " +
        "missing of it and records the read"
    )
  })

  test("several required documents refuse together, one remedy each", () => {
    fileKeyDeclared(at)
    at.document(
      "pages/domain/persona.md",
      `required-reading-slugs:\n  - naming\n${CLAIMED}: pages/persona/aria.persona.md`,
      40
    )
    at.document("pages/domain/tasks/naming.md", "slug: naming", 10)
    at.installRecorder()
    const standing = run("pages/persona/aria.persona.md")
    expect(standing.detail).toContain("2 document(s) are required reading for this path; 0 read, 2 not")
    expect(standing.refusals).toHaveLength(3)
    expect(said(standing)).toContain("pages/domain/persona.md")
    expect(said(standing)).toContain("pages/domain/tasks/naming.md")
  })

  test("a domain reached transitively through required-reading-slugs is required too", () => {
    personaPages(at)
    at.installRecorder()
    const standing = run("pages/persona/aria.persona.md")
    expect(new Set(standing.required)).toEqual(
      new Set(["pages/domain/agent-harness.domain.md", "pages/domain/global.domain.md", "pages/domain/persona.md"])
    )
  })

  test("a domain standing above one required is not itself required", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `slug: persona\n${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.document("pages/domain/global.domain.md", "slug: global", 20)
    at.document("pages/domain/under.md", "slug: under\ndomain-parent-slug: global", 20)
    at.installRecorder()
    expect(run("pages/persona/aria.persona.md").required).toEqual(["pages/domain/persona.md"])
  })

  test("reading some and not others names the ones read and refuses on the rest", () => {
    personaPages(at)
    at.readIt("agent-one", "pages/domain/global.domain.md")
    const standing = run("pages/persona/aria.persona.md")
    expect(standing.detail).toContain("3 document(s) are required reading for this path; 1 read, 2 not")
    expect(said(standing)).toContain("you have read 1 of them (pages/domain/global.domain.md)")
  })
})

describe("the repo the call would leave", () => {
  test("a document created in the same call is required from that call", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 20)
    at.readIt("agent-one", "pages/domain/global.domain.md")
    const standing = landing("pages/persona/aria.persona.md", {
      "pages/domain/persona.md": documentBody(
        `required-reading-slugs:\n  - global\n${CLAIMED}: pages/persona/aria.persona.md`,
        8
      ),
    })
    expect(new Set(standing.required)).toEqual(
      new Set(["pages/domain/global.domain.md", "pages/domain/persona.md"])
    )
  })

  test("a document created in the same call needs no read, there being no body to have read", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 20)
    at.readIt("agent-one", "pages/domain/global.domain.md")
    const standing = landing("pages/persona/aria.persona.md", {
      "pages/domain/persona.md": documentBody(
        `required-reading-slugs:\n  - global\n${CLAIMED}: pages/persona/aria.persona.md`,
        8
      ),
    })
    expect(standing.kind).toBe("read")
  })

  test("a claim added to a document already on disk is required from that call", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", "slug: persona", 40)
    at.readIt("agent-one", "pages/domain/persona.md")
    expect(landing("pages/persona/aria.persona.md", {}).kind).toBe("unrequired")
    const standing = landing("pages/persona/aria.persona.md", {
      "pages/domain/persona.md": documentBody(`slug: persona\n${CLAIMED}: pages/persona/aria.persona.md`, 40),
    })
    expect(standing.required).toEqual(["pages/domain/persona.md"])
  })

  test("a claim taken away in the same call stops required there", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.installRecorder()
    expect(landing("pages/persona/aria.persona.md", {}).kind).toBe("missing")
    const standing = landing("pages/persona/aria.persona.md", {
      "pages/domain/persona.md": documentBody("slug: persona", 40),
    })
    expect(standing.kind).toBe("unrequired")
  })

  test("a document required itself is asked for the body on disk, never the one proposed", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/tasks/itself.md", `${CLAIMED}: pages/domain/tasks/itself.md`, 40)
    at.installRecorder()
    const proposing = (): Standing =>
      landing("pages/domain/tasks/itself.md", {
        "pages/domain/tasks/itself.md": documentBody(`${CLAIMED}: pages/domain/tasks/itself.md`, 100),
      })
    expect(said(proposing())).toContain("NOT YET READ")
    at.readIt("agent-one", "pages/domain/tasks/itself.md")
    expect(proposing().kind).toBe("read")
  })
})

describe("the two repos are addressed apart", () => {
  test("a claim on a code path is required for it, and everything it names too", () => {
    fileKeyDeclared(at)
    at.document(
      "pages/domain/tasks/code-rules.md",
      `required-reading-slugs:\n  - global\n${CLAIMED}: code:infra/scripts/x.ts`,
      12
    )
    at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 20)
    at.installRecorder()
    const standing = run("infra/scripts/x.ts", "agent-one", "code")
    expect(new Set(standing.required)).toEqual(new Set(["pages/domain/global.domain.md", "pages/domain/tasks/code-rules.md"]))
    expect(said(standing)).toContain("in the code repository requires 2 document(s)")
    expect(said(standing)).toContain("--file-path infra/scripts/x.ts")
  })

  test("a code path under dirty/ is not quarantined, because dirty/ is an address here", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/tasks/code-rules.md", `${CLAIMED}: code:dirty/thing.ts`, 12)
    at.installRecorder()
    expect(run("dirty/thing.ts", "agent-one", "code").kind).toBe("missing")
  })
})

describe("what counts as having read a document", () => {
  test("read in full, then changed on disk, refuses on the body it names", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.readIt("agent-one", "pages/domain/persona.md")
    expect(run("pages/persona/aria.persona.md").kind).toBe("read")
    const absolute = `${at.root}/pages/domain/persona.md`
    writeFileSync(absolute, readFileSync(absolute, "utf8").replace("body line 1", "body line X"), "utf8")
    const standing = run("pages/persona/aria.persona.md")
    expect(standing.kind).toBe("missing")
    expect(said(standing)).toContain("CHANGED SINCE YOU READ IT")
    expect(said(standing)).toContain(
      "`ops read --file-path pages/domain/persona.md` prints what you are missing"
    )
  })

  test("a read recorded by another agent does not authorise this one", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.installRecorder("agent-one")
    at.readIt("agent-two", "pages/domain/persona.md")
    expect(said(run("pages/persona/aria.persona.md", "agent-one"))).toContain("NOT YET READ")
  })

  test("a document with no body at all needs no reading", () => {
    fileKeyDeclared(at)
    at.put("pages/domain/persona.md", "")
    at.document("pages/domain/tasks/naming.md", `${CLAIMED}: pages/persona/aria.persona.md`, 5)
    at.readIt("agent-one", "pages/domain/tasks/naming.md")
    expect(run("pages/persona/aria.persona.md").kind).toBe("read")
  })

  test("a file that does not exist yet has required reading, and authoring it blind is refused", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", `${CLAIMED}: pages/persona/aria.persona.md`, 40)
    at.installRecorder()
    expect(existsSync(`${at.root}/pages/persona/aria.persona.md`)).toBe(false)
    expect(run("pages/persona/aria.persona.md").kind).toBe("missing")
  })

  test("a document that is required for itself is asked for like any other", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/tasks/itself.md", `${CLAIMED}: pages/domain/tasks/itself.md`, 12)
    at.installRecorder()
    expect(said(run("pages/domain/tasks/itself.md"))).toContain("`pages/domain/tasks/itself.md` is required reading for this path")
  })

  test("a required document deleted between the scan and the read is not asked for", () => {
    fileKeyDeclared(at)
    at.document("pages/domain/persona.md", "slug: persona", 40)
    at.document(
      "pages/domain/tasks/naming.md",
      `required-reading-slugs:\n  - persona\n${CLAIMED}: pages/persona/aria.persona.md`,
      10
    )
    at.readIt("agent-one", "pages/domain/tasks/naming.md")
    rmSync(`${at.root}/pages/domain/persona.md`, { force: true })
    expect(run("pages/persona/aria.persona.md").kind).toBe("read")
  })
})

describe("a required document in another repository", () => {
  function crossRepo(): void {
    at.document(
      "pages/page-type/initiative.page-type.md",
      "page-type-slug: page-type\nslug: initiative\nfiles: memory:pages/initiative/**/*.md"
    )
    at.document("pages/domain/global.domain.md", "slug: global\nrequired-reading-slugs:\n  - initiative/the-plan", 20)
    at.document("pages/domain/child.md", "slug: child\ndomain-parent-slug: domain/global", 20)
    at.memoryDocument("pages/initiative/the-plan.md", "page-type-slug: initiative\nslug: the-plan", 12)
  }

  const planAt = (): string => `${at.memory}/pages/initiative/the-plan.md`

  test("nobody having read it, it is owed rather than counted as read", () => {
    crossRepo()
    at.installRecorder()
    const standing = run("pages/domain/child.md")
    expect(standing.kind).toBe("missing")
    expect(standing.owed).toContain(planAt())
  })

  test("the route it names is the path a read would accept", () => {
    crossRepo()
    at.installRecorder()
    expect(said(run("pages/domain/child.md"))).toContain(`--file-path ${planAt()}`)
  })

  test("reading it is what makes the standing read", () => {
    crossRepo()
    at.readIt("agent-one", "pages/domain/global.domain.md")
    expect(run("pages/domain/child.md").kind).toBe("missing")
    at.plantReading("agent-one", planAt())
    expect(run("pages/domain/child.md").kind).toBe("read")
  })
})
