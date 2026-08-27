
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { CLAIMED, type Fixture, fileKeyDeclared, fixture, installRepos } from "./fixture.ts"

const HOOK = `${import.meta.dir}/../hooks/block-unread-writes.ts`
const AGENT = "agent-one"

let at: Fixture
let code = ""

beforeEach(() => {
  at = fixture()
  installRepos(at.root)
  fileKeyDeclared(at)
  code = mkdtempSync(`${tmpdir()}/hooktest-code-`)
  mkdirSync(`${code}/.git`, { recursive: true })
})

afterEach(() => {
  at.dispose()
  rmSync(code, { recursive: true, force: true })
})

function document(relPath: string, frontmatter: string): void {
  at.document(relPath, frontmatter, 8)
}

function installRecorder(): void {
  at.installRecorder()
}

function readIt(relPath: string, agent = AGENT): void {
  at.readIt(agent, relPath)
}

function worktree(name: string): string {
  const at = `${code}-wt-${name}`
  mkdirSync(at, { recursive: true })
  writeFileSync(`${at}/.git`, `gitdir: ${code}/.git/worktrees/${name}\n`, "utf8")
  return at
}

interface Ran {
  readonly exitCode: number
  readonly stdout: string
  readonly said: Record<string, unknown> | null
}

function fire(payload: unknown, options: { agent?: string | null } = {}): Ran {
  const agent = options.agent === undefined ? AGENT : options.agent
  const env: Record<string, string> = {}
  for (const [key, value] of Object.entries(process.env)) {
    if (key === "AGENT_ID" || key === "CLAUDE_CODE_SESSION_ID" || value === undefined) continue
    env[key] = value
  }
  if (agent !== null) env.AGENT_ID = agent
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
    stdout,
    said: stdout.trim() === "" ? null : (JSON.parse(stdout) as Record<string, unknown>),
  }
}

function write(filePath: string, extra: Record<string, unknown> = {}): Record<string, unknown> {
  return { hook_event_name: "PreToolUse", tool_name: "Write", cwd: code, tool_input: { file_path: filePath }, ...extra }
}

function reason(ran: Ran): string {
  const specific = ran.said?.hookSpecificOutput
  if (specific === undefined || specific === null || typeof specific !== "object") return ""
  const fields = specific as Record<string, unknown>
  return fields.permissionDecision === "deny" ? String(fields.permissionDecisionReason) : ""
}

function warning(ran: Ran): string {
  return typeof ran.said?.systemMessage === "string" ? ran.said.systemMessage : ""
}

describe("which repo a path is in", () => {
  test("a path in the main code checkout is judged against what names it", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    installRecorder()
    const ran = fire(write(`${code}/packages/infra/x.ts`))
    expect(ran.exitCode).toBe(0)
    expect(reason(ran)).toContain("NOT YET READ")
    expect(reason(ran)).toContain("tasks/code-rules.md")
  })

  test("a path in a linked worktree is spelled as the repository spells it", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    installRecorder()
    const ran = fire(write(`${worktree("17353")}/packages/infra/x.ts`))
    expect(reason(ran)).toContain("`packages/infra/x.ts` in the code repository")
    expect(reason(ran)).toContain("--file-path packages/infra/x.ts")
  })

  test("a real `git worktree` is recognised by the gitdir pointer git actually writes", () => {
    const repo = mkdtempSync(`${tmpdir()}/hooktest-real-`)
    try {
      const git = (...args: string[]): void => {
        const run = Bun.spawnSync({
          cmd: ["git", ...args],
          cwd: repo,
          env: { ...process.env, GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@t", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@t" },
        })
        expect(run.exitCode).toBe(0)
      }
      git("init", "-q", "-b", "main", ".")
      writeFileSync(`${repo}/seed`, "seed\n", "utf8")
      git("add", "seed")
      git("commit", "-qm", "seed")
      git("worktree", "add", "-q", "-b", "wt", `${repo}-wt`)
      document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
      installRecorder()
      const run = Bun.spawnSync({
        cmd: [process.execPath, HOOK],
        stdin: Buffer.from(JSON.stringify(write(`${repo}-wt/packages/infra/x.ts`))),
        env: { ...process.env, AGENT_ID: AGENT, HOME: at.home, AKASHA_ROOT: at.root, CODE_ROOT: repo },
        stdout: "pipe",
        stderr: "pipe",
      })
      expect(run.exitCode).toBe(0)
      expect(run.stdout.toString()).toContain("NOT YET READ")
    } finally {
      rmSync(repo, { recursive: true, force: true })
      rmSync(`${repo}-wt`, { recursive: true, force: true })
    }
  })

  test("a path in some other git repository is not this rule's business", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/x.ts`)
    installRecorder()
    const other = mkdtempSync(`${tmpdir()}/hooktest-other-`)
    try {
      mkdirSync(`${other}/.git`, { recursive: true })
      expect(fire(write(`${other}/packages/x.ts`)).said).toBeNull()
    } finally {
      rmSync(other, { recursive: true, force: true })
    }
  })

  test("a path in no repository at all is not this rule's business", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:loose-file.ts`)
    installRecorder()
    expect(fire(write(`${tmpdir()}/loose-file.ts`)).said).toBeNull()
  })

  test("a path inside the akasha root is left to the command's gate", () => {
    document("tasks/aria-rule.md", `${CLAIMED}: pages/persona/aria.persona.md`)
    document("tasks/code-rules.md", `${CLAIMED}: code:pages/persona/aria.persona.md`)
    installRecorder()
    expect(fire(write(`${at.root}/pages/persona/aria.persona.md`)).said).toBeNull()
  })

  test("a relative path is judged where the session would land it", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    installRecorder()
    expect(reason(fire(write("packages/infra/x.ts", { cwd: code })))).toContain("NOT YET READ")
  })

  test("a `~` path is expanded before it is placed", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    installRecorder()
    const run = Bun.spawnSync({
      cmd: [process.execPath, HOOK],
      stdin: Buffer.from(JSON.stringify(write("~/packages/infra/x.ts"))),
      env: { ...process.env, AGENT_ID: AGENT, HOME: code, AKASHA_ROOT: at.root, CODE_ROOT: code },
      stdout: "pipe",
      stderr: "pipe",
    })
    expect(run.stdout.toString()).toContain("`packages/infra/x.ts` in the code repository")
  })
})

describe("what it does about what it finds", () => {
  test("a path with required reading whose documents are all read passes in silence", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    readIt("tasks/code-rules.md")
    const ran = fire(write(`${code}/packages/infra/x.ts`))
    expect(ran.exitCode).toBe(0)
    expect(ran.said).toBeNull()
  })

  test("a path nothing is required for passes in silence", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:docs/readme.md`)
    installRecorder()
    expect(fire(write(`${code}/packages/infra/x.ts`)).said).toBeNull()
  })

  test("a refusal is a deny payload at exit 0, never an exit code", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    installRecorder()
    const ran = fire(write(`${code}/packages/infra/x.ts`))
    expect(ran.exitCode).toBe(0)
    const specific = ran.said?.hookSpecificOutput as Record<string, unknown>
    expect(specific.hookEventName).toBe("PreToolUse")
    expect(specific.permissionDecision).toBe("deny")
  })

  test("an Edit is judged exactly as a Write is", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    installRecorder()
    const ran = fire(write(`${code}/packages/infra/x.ts`, { tool_name: "Edit" }))
    expect(reason(ran)).toContain("NOT YET READ")
  })

  test("a subagent is judged on its own reads rather than on its seat's", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    readIt("tasks/code-rules.md")
    at.installRecorder(`${AGENT}--sub-a`)
    at.installRecorder(`${AGENT}--sub-b`)
    const call = write(`${code}/packages/infra/x.ts`)
    expect(reason(fire({ ...call, agent_id: "sub-a" }))).toContain("NOT YET READ")
    expect(reason(fire({ ...call, agent_id: "sub-b" }))).toContain("NOT YET READ")
  })

  test("a subagent's own reading clears it, and clears nothing beside it", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    readIt("tasks/code-rules.md", `${AGENT}--sub-a`)
    at.installRecorder(`${AGENT}--sub-b`)
    const call = write(`${code}/packages/infra/x.ts`)
    expect(fire({ ...call, agent_id: "sub-a" }).said).toBeNull()
    expect(reason(fire({ ...call, agent_id: "sub-b" }))).toContain("NOT YET READ")
    expect(reason(fire(call))).toContain("NOT YET READ")
  })
})

describe("when the machinery is not there", () => {
  test("no page carrying a record refuses, a guard that stopped guarding being worse than none", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    const ran = fire(write(`${code}/packages/infra/x.ts`))
    expect(ran.exitCode).toBe(0)
    expect(reason(ran)).toContain("no page carries that record")
  })

  test("an unidentifiable agent is refused", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    installRecorder()
    const ran = fire(write(`${code}/packages/infra/x.ts`), { agent: null })
    expect(reason(ran)).toContain("AGENT_ID")
    expect(reason(ran)).toContain("CLAUDE_CODE_SESSION_ID")
  })

  test("an unnamed environment still names the agent from the payload's session", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    readIt("tasks/code-rules.md", "session-xyz")
    const ran = fire(write(`${code}/packages/infra/x.ts`, { session_id: "session-xyz" }), { agent: null })
    expect(ran.said).toBeNull()
  })

  test("both absent at once refuses too, answering on the agent there is none of", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/infra/x.ts`)
    const ran = fire(write(`${code}/packages/infra/x.ts`), { agent: null })
    expect(reason(ran)).toContain("AGENT_ID")
  })
})

describe("payloads that are not what it expects", () => {
  test("a payload that will not parse permits, and says nothing was checked", () => {
    const ran = fire("{not json")
    expect(ran.exitCode).toBe(0)
    expect(warning(ran)).toContain("would not parse")
  })

  test("an empty payload permits and says nothing was checked", () => {
    expect(warning(fire(""))).toContain("would not parse")
  })

  test("a payload that is not an object is silent", () => {
    expect(fire('"a string"').said).toBeNull()
    expect(fire("null").said).toBeNull()
    expect(fire("[1,2,3]").said).toBeNull()
  })

  test("a payload with no tool_input is silent", () => {
    expect(fire({ hook_event_name: "PreToolUse", tool_name: "Write" }).said).toBeNull()
  })

  test("a payload with no file_path is silent — including a Bash call, the hatch", () => {
    document("tasks/code-rules.md", `${CLAIMED}: code:packages/x.ts`)
    installRecorder()
    expect(fire({ tool_name: "Write", tool_input: {} }).said).toBeNull()
    expect(fire({ tool_name: "Write", tool_input: { file_path: "" } }).said).toBeNull()
    expect(fire({ tool_name: "Bash", tool_input: { command: `echo x > ${code}/packages/x.ts` } }).said).toBeNull()
  })

  test("a file_path that is not a string is silent", () => {
    expect(fire({ tool_name: "Write", tool_input: { file_path: 17 } }).said).toBeNull()
  })

  test("every shape above exits 0, so nothing it meets can read as a crash", () => {
    for (const payload of ["{not json", "", "null", '"s"', "[]", "{}", '{"tool_input":{}}']) {
      expect(fire(payload).exitCode).toBe(0)
    }
  })
})
