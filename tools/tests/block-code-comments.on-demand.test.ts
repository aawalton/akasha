import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { type Fixture, fixture, installPages } from "./fixture.ts"

const HOOK = `${import.meta.dir}/../hooks/block-code-comments.ts`

const PROSE = "// this line is prose and nothing parses it"
const FORM = "// biome-ignore lint/suspicious/noExplicitAny: the payload is untyped"

let at: Fixture
let code = ""

beforeEach(() => {
  at = fixture()
  installPages(at.root, [
    "pages/domain/code-comment.domain.md",
    "pages/list/code-comment-forms.list.md",
    "pages/file-kind/file-kind-ts.file-kind-domain.md",
  ])
  code = mkdtempSync(`${tmpdir()}/commenttest-code-`)
  mkdirSync(`${code}/.git`, { recursive: true })
})

afterEach(() => {
  at.dispose()
  rmSync(code, { recursive: true, force: true })
})

interface Ran {
  readonly exitCode: number
  readonly said: Record<string, unknown> | null
}

function fire(payload: unknown): Ran {
  const env: Record<string, string> = {}
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) env[key] = value
  }
  const run = Bun.spawnSync({
    cmd: [process.execPath, HOOK],
    stdin: Buffer.from(typeof payload === "string" ? payload : JSON.stringify(payload)),
    env: { ...env, HOME: at.home, AKASHA_ROOT: at.root, CODE_ROOT: code },
    stdout: "pipe",
    stderr: "pipe",
  })
  const stdout = run.stdout.toString()
  return {
    exitCode: run.exitCode ?? -1,
    said: stdout.trim() === "" ? null : (JSON.parse(stdout) as Record<string, unknown>),
  }
}

function refusal(ran: Ran): string {
  const specific = ran.said?.hookSpecificOutput
  if (specific === undefined || specific === null || typeof specific !== "object") return ""
  const fields = specific as Record<string, unknown>
  return fields.permissionDecision === "deny" ? String(fields.permissionDecisionReason) : ""
}

function warning(ran: Ran): string {
  return typeof ran.said?.systemMessage === "string" ? ran.said.systemMessage : ""
}

function written(filePath: string, content: string): Record<string, unknown> {
  return {
    hook_event_name: "PreToolUse",
    tool_name: "Write",
    cwd: code,
    tool_input: { file_path: filePath, content },
  }
}

function edited(filePath: string, older: string, newer: string): Record<string, unknown> {
  return {
    hook_event_name: "PreToolUse",
    tool_name: "Edit",
    cwd: code,
    tool_input: { file_path: filePath, old_string: older, new_string: newer },
  }
}

function standing(relPath: string, body: string): string {
  const absolute = `${code}/${relPath}`
  mkdirSync(absolute.slice(0, absolute.lastIndexOf("/")), { recursive: true })
  writeFileSync(absolute, body, "utf8")
  return absolute
}

function worktree(name: string): string {
  const beside = `${code}-wt-${name}`
  mkdirSync(beside, { recursive: true })
  writeFileSync(`${beside}/.git`, `gitdir: ${code}/.git/worktrees/${name}\n`, "utf8")
  return beside
}

describe("what it refuses", () => {
  test("a written body carrying prose is refused, and the refusal names the line", () => {
    const ran = fire(written(`${code}/packages/one/a.ts`, `${PROSE}\nexport const a = 1\n`))
    expect(ran.exitCode).toBe(0)
    expect(refusal(ran)).toContain("packages/one/a.ts")
    expect(refusal(ran)).toContain("line 1")
    expect(refusal(ran)).toContain("this line is prose")
  })

  test("a comment that is one of the forms is not a violation", () => {
    const ran = fire(written(`${code}/packages/one/a.ts`, `${FORM}\nexport const a = 1\n`))
    expect(refusal(ran)).toBe("")
    expect(warning(ran)).toBe("")
  })

  test("an edit that introduces prose is refused at the line the edit puts it on", () => {
    standing("packages/one/a.ts", "export const a = 1\nexport const b = 2\n")
    const ran = fire(edited(`${code}/packages/one/a.ts`, "export const b", `${PROSE}\nexport const b`))
    expect(refusal(ran)).toContain("line 2")
  })

  test("an edit that introduces no comment passes", () => {
    standing("packages/one/a.ts", "export const a = 1\n")
    const ran = fire(edited(`${code}/packages/one/a.ts`, "const a", "const alpha"))
    expect(refusal(ran)).toBe("")
  })

  test("a path in a linked worktree is spelled as the repository spells it", () => {
    const ran = fire(written(`${worktree("19291")}/packages/one/a.ts`, `${PROSE}\n`))
    expect(refusal(ran)).toContain("`packages/one/a.ts`")
    expect(refusal(ran)).not.toContain(code)
  })

  test("a replacement carrying a substitution pattern is read as the text it is", () => {
    standing("packages/one/a.ts", "export const a = 1\n")
    const ran = fire(edited(`${code}/packages/one/a.ts`, "export", "// costs $& and $1\nexport"))
    expect(refusal(ran)).toContain("costs $& and $1")
  })
})

describe("what it stands aside from", () => {
  test("a path no file kind requiring the domain reaches is not judged", () => {
    const ran = fire(written(`${code}/README.md`, `${PROSE}\n`))
    expect(refusal(ran)).toBe("")
  })

  test("a path inside the akasha root is left to that repo's own gate", () => {
    const ran = fire(written(`${at.root}/tools/one.ts`, `${PROSE}\n`))
    expect(refusal(ran)).toBe("")
  })

  test("a body declaring itself generated belongs to whatever writes it", () => {
    const ran = fire(written(`${code}/packages/one/a.ts`, `// GENERATED by a compiler\n${PROSE}\n`))
    expect(refusal(ran)).toBe("")
  })

  test("a path in no repository at all is none of its business", () => {
    const ran = fire(written(`${tmpdir()}/loose.ts`, `${PROSE}\n`))
    expect(refusal(ran)).toBe("")
  })

  test("an edit whose old_string is not in the file is left for the tool to refuse", () => {
    standing("packages/one/a.ts", "export const a = 1\n")
    const ran = fire(edited(`${code}/packages/one/a.ts`, "nowhere in this file", PROSE))
    expect(refusal(ran)).toBe("")
  })
})

describe("what it does when it cannot judge", () => {
  test("a payload it cannot parse is announced rather than refused", () => {
    const ran = fire("this is not JSON")
    expect(refusal(ran)).toBe("")
    expect(warning(ran)).toContain("would not parse")
  })

  test("a break admits the write rather than holding every seat", () => {
    rmSync(`${at.root}/pages/list/code-comment-forms.list.md`)
    const ran = fire(written(`${code}/packages/one/a.ts`, `${PROSE}\n`))
    expect(refusal(ran)).toBe("")
    expect(warning(ran)).toContain("proceeded unchecked")
  })
})
