import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, test } from "bun:test"
import { statuslineConstants } from "../audits/statusline-constants.ts"
import type { RepoView } from "../lib/check.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

const ROOT = resolve(import.meta.dir, "..", "..")

const SCRIPT = "tools/statusline.sh"
const READER = "tools/lib/seat-page-read.sh"

function live(relPath: string): string {
  return readFileSync(resolve(ROOT, relPath), "utf8")
}

const says = (slug: string, values: Readonly<Record<string, string>>): string =>
  refusalText(slug, values, ROOT)

const DECLARES = "persona domain role task"

function repo(bodies: Readonly<Record<string, string>>): RepoView {
  return {
    roots: rootsNamed({ akasha: ROOT }),
    name: "akasha",
    documents: [],
    read: (relPath) => bodies[relPath] ?? live(relPath),
    exists: () => true,
  }
}

function scriptWith(slots: string): Readonly<Record<string, string>> {
  return { [SCRIPT]: live(SCRIPT).replace(/^SEAT_RENDER=\(.*\)$/m, `SEAT_RENDER=(${slots})`) }
}

function readerWith(key: string, value: string): Readonly<Record<string, string>> {
  return {
    [READER]: live(READER).replace(new RegExp(`^${key}=".*"$`, "m"), `${key}="${value}"`),
  }
}

describe("the script as it stands", () => {
  test("passes, and the detail says what it compared", () => {
    const outcome = statuslineConstants(repo({}))
    expect(outcome.verdict).toBe("pass")
    expect(outcome.detail).toContain("persona domain role task")
  })
})

describe("the initiative riding in the render order", () => {
  test("passes, being stored as a value rather than a slug and so not compared", () => {
    const outcome = statuslineConstants(repo(scriptWith("persona domain role initiative task")))
    expect(outcome.verdict).toBe("pass")
  })

  test("passes wherever in the order it sits, the slots keeping their own order", () => {
    const outcome = statuslineConstants(repo(scriptWith("persona domain initiative role task")))
    expect(outcome.verdict).toBe("pass")
  })
})

describe("a slot list that disagrees with SLOTS", () => {
  test("reordered is refused, order being part of what is rendered", () => {
    const outcome = statuslineConstants(repo(scriptWith("persona role domain task")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("statusline-slots-disagree", { renders: "persona role domain task", declares: DECLARES })
    )
  })

  test("missing a slot is refused", () => {
    const outcome = statuslineConstants(repo(scriptWith("persona domain role")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("statusline-slots-disagree", { renders: "persona domain role", declares: DECLARES })
    )
  })

  test("carrying a slot attributes.ts does not declare is refused", () => {
    const outcome = statuslineConstants(repo(scriptWith("persona domain role task flex")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("statusline-slots-disagree", {
        renders: "persona domain role task flex",
        declares: DECLARES,
      })
    )
  })
})

describe("a page key the bash side spells differently from the writer", () => {
  test("is refused, the bash side otherwise reading a key nothing sets", () => {
    const outcome = statuslineConstants(repo(readerWith("SEAT_MODE_KEY", "started-mode")))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("statusline-page-key-disagrees", {
        key: "SEAT_MODE_KEY",
        spelled: "started-mode",
        source: "tools/lib/attributes.ts",
        declared: "start-mode",
      })
    )
  })
})

describe("a side the check cannot read at all", () => {
  test("is refused rather than passed, an unfindable constant proving nothing", () => {
    const outcome = statuslineConstants(
      repo({ [SCRIPT]: live(SCRIPT).replace(/^SEAT_RENDER=\(.*\)$/m, "") })
    )
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      says("statusline-constant-unlocated", { where: `SEAT_RENDER in ${SCRIPT}` })
    )
  })
})
