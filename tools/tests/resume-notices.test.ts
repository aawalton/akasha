import { readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { describe, expect, test } from "bun:test"
import { resumeNotices } from "../audits/resume-notices.ts"
import { noticesIn, render } from "../compose-notices.ts"
import type { RepoView } from "../lib/check.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

const ROOT = resolve(import.meta.dir, "..", "..")
const DOCUMENT = "pages/notice/resume.notice.md"

const live = readFileSync(join(ROOT, DOCUMENT), "utf8")

const ASKER = "tools/lib/supervisor-resume-notices.ts"

const PINNED_KEYS = ["restart-immediate", "restart-deferred", "restart-recovery-clause"]

const CLAUSE = "restart-recovery-clause"

const asks = (keys: readonly string[]): string =>
  `export const KEYS = [${keys.map((key) => `"${key}"`).join(", ")}]\n`

const says = (slug: string, values: Readonly<Record<string, string>> = {}): string =>
  refusalText(slug, values, ROOT)

function repo(body: string | null, asker: string = asks(PINNED_KEYS)): RepoView {
  return {
    roots: rootsNamed({ akasha: ROOT }),
    name: "akasha",
    documents: [],
    read: (relPath) => {
      if (relPath === ASKER) return asker
      if (relPath !== DOCUMENT) return readFileSync(join(ROOT, relPath), "utf8")
      if (body === null) throw new Error("not there")
      return body
    },
    exists: () => true,
  }
}

function renamed(from: string, to: string): string {
  return live.replace(`## ${from}\n`, `## ${to}\n`)
}

function bodyOf(heading: string, text: string): string {
  const at = live.indexOf(`## ${heading}\n`)
  const from = at + `## ${heading}\n`.length
  const next = live.indexOf("\n## ", from)
  const end = next === -1 ? live.length : next + 1
  return `${live.slice(0, from)}\n${text}\n${live.slice(end)}`
}

describe("the document as it stands", () => {
  test("passes, and the detail says what it compared", () => {
    const outcome = resumeNotices(repo(live))
    expect(outcome.verdict).toBe("pass")
    expect(outcome.detail).toContain(DOCUMENT)
    expect(outcome.population.measured).toBe(5)
  })
})

describe("a notice the supervisor asks for that the document no longer declares", () => {
  test("a renamed heading is refused, naming the key that went", () => {
    const outcome = resumeNotices(repo(renamed("restart-deferred", "restart-handed-back")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(says("resume-notice-absent", { key: "restart-deferred" }))
  })

  test("an emptied notice is refused — an empty argv turn is the resume-idle shape", () => {
    const outcome = resumeNotices(repo(bodyOf("restart-immediate", "")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(says("resume-notice-absent", { key: "restart-immediate" }))
  })
})

describe("a notice that stopped looking like a machine's", () => {
  test("losing the `[supervisor]` opening is refused", () => {
    const outcome = resumeNotices(
      repo(bodyOf("restart-immediate", "You have been restarted, and your context is preserved."))
    )
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("resume-notice-unstamped", { key: "restart-immediate" })
    )
  })
})

describe("the recovery clause", () => {
  test("emptied is ACCEPTED, an empty clause being the retired state", () => {
    const outcome = resumeNotices(repo(bodyOf("restart-recovery-clause", "")))
    expect(outcome.verdict).toBe("pass")
  })

  test("removed outright is refused, an absent name being indistinguishable from a renamed one", () => {
    const outcome = resumeNotices(repo(renamed("restart-recovery-clause", "recovery")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(says("restart-clause-absent"))
  })
})

describe("the asker, now that it stands in this repo", () => {
  test("an asker that stopped naming a key is refused", () => {
    const outcome = resumeNotices(
      repo(live, asks(PINNED_KEYS.filter((key) => key !== "restart-deferred")))
    )
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("resume-notice-unasked", { asker: ASKER, key: "restart-deferred" })
    )
  })
})

describe("a notice handed on a message row", () => {
  test("a renamed heading is refused, the caller's lookup answering `undefined` rather than failing", () => {
    const outcome = resumeNotices(repo(renamed("limit-resume-nudge", "limit-nudge")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("notice-on-row-absent", {
        key: "limit-resume-nudge",
        caller: "The limit-resume decision",
      })
    )
  })

  test("an emptied one is refused, an empty nudge being a message with no words in it", () => {
    const outcome = resumeNotices(repo(bodyOf("editor-revive", "")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("notice-on-row-absent", { key: "editor-revive", caller: "The editor extension" })
    )
  })

  test("GAINING the `[supervisor]` opening is refused, which is the inverse of the argv arm", () => {
    const outcome = resumeNotices(
      repo(bodyOf("editor-revive", "[supervisor] You were stopped from the Agents panel."))
    )
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(says("notice-on-row-stamped", { key: "editor-revive" }))
  })
})

describe("a document that cannot be read at all", () => {
  test("is refused rather than passed, an unreadable document certifying nothing", () => {
    const outcome = resumeNotices(repo(null))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.population.measured).toBe(0)
  })
})

describe("rendering the wrapping out of a notice", () => {
  test("the lines of a paragraph are joined with a space", () => {
    expect(render("one line\nand its\ncontinuation")).toBe("one line and its continuation")
  })

  test("a blank line between paragraphs survives as one", () => {
    expect(render("first\npart\n\nsecond part")).toBe("first part\n\nsecond part")
  })

  test("leading and trailing blank lines are not paragraphs", () => {
    expect(render("\n\nonly this\n\n")).toBe("only this")
  })

  test("every notice the document declares renders to something a seat can be handed", () => {
    const notices = noticesIn(live)
    expect(Object.keys(notices)).toEqual(expect.arrayContaining([...PINNED_KEYS]))
    for (const [key, text] of Object.entries(notices)) {
      if (key !== CLAUSE) expect(text.length).toBeGreaterThan(0)
      expect(text).not.toContain("\n\n\n")
    }
  })
})
