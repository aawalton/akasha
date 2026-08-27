
import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, rmSync, symlinkSync } from "node:fs"
import { fire, type Ran } from "./hook-shell.ts"

const SCRIPT = "block-instructions-direct-write.sh"

const ROOT = "/var/tmp/test-instructions-write-root"
const NEAR_ROOT = "/var/tmp/test-instructions-write-root-other"
const LINK = "/var/tmp/test-instructions-write-link"
const HOME = "/home/walton"

function runHook(filePath: string | null): Ran {
  return fire(SCRIPT, {
    stdin: { tool_input: filePath === null ? {} : { file_path: filePath } },
    env: { INSTRUCTIONS_ROOT: ROOT, HOME },
  })
}

const MEMORY = "/var/tmp/test-instructions-write-memory"
const BOOKS = "/var/tmp/test-instructions-write-books"
const STORIES = "/var/tmp/test-instructions-write-stories"

function runOnRoots(filePath: string): Ran {
  return fire(SCRIPT, {
    stdin: { tool_input: { file_path: filePath } },
    env: { INSTRUCTIONS_ROOT: ROOT, MEMORY_ROOT: MEMORY, BOOKS_ROOT: BOOKS, STORIES_ROOT: STORIES, HOME },
  })
}

function expectBlocked(result: Ran) {
  expect(result.exitCode).toBe(2)
  expect(result.stdout).toContain('"decision"')
  expect(result.stdout).toContain('"block"')
}

function expectAllowed(result: Ran) {
  expect(result.exitCode).toBe(0)
  expect(result.stdout).toBe("")
}

beforeAll(() => {
  mkdirSync(`${ROOT}/skills/deliver`, { recursive: true })
  rmSync(LINK, { force: true })
  symlinkSync(ROOT, LINK)
})

afterAll(() => {
  rmSync(LINK, { force: true })
  rmSync(ROOT, { recursive: true, force: true })
})

describe("refuses a direct write inside the instructions root", () => {
  test("a doc", () => {
    expectBlocked(runHook(`${ROOT}/docs/agent-instructions.md`))
  })

  test("a skill", () => {
    expectBlocked(runHook(`${ROOT}/skills/deliver/SKILL.md`))
  })

  test("a file that does not exist yet", () => {
    expectBlocked(runHook(`${ROOT}/docs/brand-new-file.md`))
  })

  test("the root itself", () => {
    expectBlocked(runHook(`${ROOT}/anything.md`))
  })

  test("through a symlink pointed at the root", () => {
    expectBlocked(runHook(`${LINK}/skills/deliver/SKILL.md`))
  })

  test("through a symlink, to a file that does not exist yet", () => {
    expectBlocked(runHook(`${LINK}/docs/new.md`))
  })

  test("names the sanctioned command", () => {
    expect(runHook(`${ROOT}/docs/x.md`).stderr).toContain("ops write")
  })

  test("names the edit command too — this hook is what an Edit tool call hits", () => {
    expect(runHook(`${ROOT}/docs/x.md`).stderr).toContain("ops edit")
  })
})

describe("names the command that actually takes the blocked path", () => {
  test("a tools/*.ts file is routed to the repo's own command", () => {
    const { stderr } = runHook(`${ROOT}/tools/gate.ts`)
    expect(stderr).toContain("ops write")
    expect(stderr).toContain("ops edit")
  })

  test("a markdown document takes the same command, not ops instructions", () => {
    const { stderr } = runHook(`${ROOT}/pages/domain/global.domain.md`)
    expect(stderr).toContain("ops write")
    expect(stderr).toContain("ops edit")
    expect(stderr).not.toContain("ops instructions")
  })

  test("the blocked path is carried into the message, relative to the root", () => {
    expect(runHook(`${ROOT}/tools/gate.ts`).stderr).toContain("`tools/gate.ts`")
  })
})

describe("ships no copy of an interface it does not own", () => {
  for (const path of ["docs/x.md", "tools/gate.ts"]) {
    test(`prints no flag spelling for ${path}`, () => {
      const { stderr } = runHook(`${ROOT}/${path}`)
      expect(stderr).not.toContain("--path")
      expect(stderr).not.toContain("--from")
      expect(stderr).not.toContain("--edits-file")
      expect(stderr).not.toContain("--content-file")
    })
  }

  test("sends the reader to the command's own --help instead", () => {
    expect(runHook(`${ROOT}/docs/x.md`).stderr).toContain("--help")
  })
})

describe("allows everything else", () => {
  test("a worktree path", () => {
    expectAllowed(runHook(`${HOME}/worktrees/16450/packages/infra/scripts/x.ts`))
  })

  test("a path in the code repo", () => {
    expectAllowed(runHook(`${HOME}/code/.claude/settings.json`))
  })

  test("a sibling directory whose name merely starts with the root's", () => {
    expectAllowed(runHook(`${NEAR_ROOT}/docs/x.md`))
  })

  test("a tool call carrying no file_path at all", () => {
    expectAllowed(runHook(null))
  })

  test("an unrelated absolute path", () => {
    expectAllowed(runHook("/var/tmp/scratch/notes.md"))
  })
})

describe("every gated repo is refused, and each is sent to its own command", () => {
  const GATED = [
    ["instructions", ROOT, ""],
    ["memory", MEMORY, " --repo memory"],
    ["books", BOOKS, " --repo books"],
    ["stories", STORIES, " --repo stories"],
  ] as const

  for (const [repo, root, aim] of GATED) {
    test(`a write into the ${repo} root is refused`, () => {
      const ran = runOnRoots(`${root}/a/b.md`)
      expectBlocked(ran)
      expect(ran.stderr).toContain(`it lands inside the ${repo} root`)
    })

    test(`the ${repo} refusal sends the reader to the command that takes that repo`, () => {
      const { stderr } = runOnRoots(`${root}/a/b.md`)
      expect(stderr).toContain(`ops write${aim}`)
      expect(stderr).toContain(`ops edit${aim}`)
    })
  }

  test("the instructions refusal names no repo at all, that being the default", () => {
    expect(runOnRoots(`${ROOT}/a/b.md`).stderr).not.toContain("--repo")
  })
})

