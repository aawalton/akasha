
import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { agreement, refusalFor, targetOf } from "../lib/hook-merge.ts"
import { installRefusals, installRepos } from "./fixture.ts"

const SCRIPT = "$HOME/repos/akasha/tools/hooks/agent-hook-local-agent-session-start.agent-hook.code.attachment.ts"
const OTHER = "$HOME/repos/akasha/tools/hooks/agent-hook-record-epoch.agent-hook.code.attachment.ts"

function entry(command: string, rest: Record<string, unknown> = {}): Record<string, unknown> {
  return { type: "command", command, ...rest }
}

function sessionStart(...entries: Record<string, unknown>[]): unknown {
  return { hooks: { SessionStart: [{ hooks: entries }] } }
}

const ROOT = resolve(import.meta.dir, "..", "..")

function said(left: unknown, right: unknown): string {
  return agreement(left, right)
    .divergences.map((one) => refusalFor(one, "settings/agents.json", "~/.claude/settings.json", ROOT))
    .join("\n")
}

describe("what the merge does to a pair of settings files", () => {
  test("a hook both files spell identically collapses to one key", () => {
    const outcome = agreement(sessionStart(entry(SCRIPT)), sessionStart(entry(SCRIPT)))
    expect(outcome.divergences).toHaveLength(0)
    expect(outcome.shared).toBe(1)
  })

  test("one trailing space is two keys, and the hook runs twice", () => {
    const outcome = agreement(sessionStart(entry(SCRIPT)), sessionStart(entry(`${SCRIPT} `)))
    expect(outcome.divergences).toHaveLength(1)
    expect(outcome.divergences[0]?.times).toBe(2)
  })

  test("the refusal names the hook, the event, and the byte the two part at", () => {
    const message = said(sessionStart(entry(SCRIPT)), sessionStart(entry(`${SCRIPT} `)))
    expect(message).toContain("agent-hook-local-agent-session-start.agent-hook.code.attachment.ts")
    expect(message).toContain("SessionStart")
    expect(message).toContain(`byte ${SCRIPT.length}`)
  })

  test("and quotes the space, which is the only way a trailing one is visible", () => {
    expect(said(sessionStart(entry(SCRIPT)), sessionStart(entry(`${SCRIPT} `)))).toContain(
      `agent-hook-local-agent-session-start.agent-hook.code.attachment.ts "`
    )
  })

  test("a hook only one file registers fires once, and is not a divergence", () => {
    const outcome = agreement(sessionStart(entry(SCRIPT), entry(OTHER)), sessionStart(entry(SCRIPT)))
    expect(outcome.divergences).toHaveLength(0)
    expect(outcome.shared).toBe(1)
    expect(outcome.unshared).toBe(1)
  })

  test("a hook only the USER file registers is counted too, and still fires once", () => {
    const outcome = agreement(sessionStart(entry(SCRIPT)), sessionStart(entry(SCRIPT), entry(OTHER)))
    expect(outcome.divergences).toHaveLength(0)
    expect(outcome.unshared).toBe(1)
  })

  test("`timeout` is not in the dedup key, so a pair differing only there collapses", () => {
    const outcome = agreement(
      sessionStart(entry(SCRIPT, { timeout: 10 })),
      sessionStart(entry(SCRIPT, { timeout: 30 }))
    )
    expect(outcome.divergences).toHaveLength(0)
  })

  test("`matcher` is not in it either", () => {
    const under = (matcher: string): unknown => ({
      hooks: { PreToolUse: [{ matcher, hooks: [entry(SCRIPT)] }] },
    })
    expect(agreement(under("Bash"), under("")).divergences).toHaveLength(0)
  })

  test("two launcher spellings of one script are two keys, because the script is the hook", () => {
    const outcome = agreement(
      sessionStart(entry(`bun ${OTHER}`)),
      sessionStart(entry(`$HOME/.bun/bin/bun ${OTHER}`))
    )
    expect(outcome.divergences).toHaveLength(1)
  })

  test("a command naming no script is its own key, whitespace collapsed", () => {
    const bell = "printf '\\a'"
    expect(agreement(sessionStart(entry(bell)), sessionStart(entry(`${bell} `))).divergences).toHaveLength(1)
    expect(agreement(sessionStart(entry(bell)), sessionStart(entry(bell))).divergences).toHaveLength(0)
  })

  test("`$HOME`, `~` and an absolute path under home are one hook, not three", () => {
    expect(targetOf("$HOME/a/b.sh")).toBe(targetOf("~/a/b.sh"))
    expect(targetOf(`${process.env.HOME}/a/b.sh`)).toBe(targetOf("$HOME/a/b.sh"))
  })
})

interface Pair {
  readonly root: string
  readonly configDir: string
  readonly dispose: () => void
}

function pair(): Pair {
  const root = mkdtempSync(`${tmpdir()}/hooks-agree-root-`)
  installRefusals(root)
  // THE REPO PAGES SAY WHICH REPOSITORIES THERE ARE, read out of the root `AKASHA_ROOT` names, so a
  // temp repo without them makes `roots.ts` throw before the check says anything.
  installRepos(root)
  // A ROOT IS NAMED ONLY WHERE IT IS CLONED — `resolveRoots` skips a directory holding no `.git`.
  Bun.spawnSync(["git", "init", "-q"], { cwd: root })
  const configDir = mkdtempSync(`${tmpdir()}/hooks-agree-config-`)
  mkdirSync(`${root}/settings`, { recursive: true })
  return {
    root,
    configDir,
    dispose: () => {
      rmSync(root, { recursive: true, force: true })
      rmSync(configDir, { recursive: true, force: true })
    },
  }
}

function runCheck(at: Pair): { code: number; out: string } {
  const proc = Bun.spawnSync({
    cmd: ["bun", `${import.meta.dir}/../run-checks.ts`, "--check", "hooks-agree"],
    // `AKASHA_ROOT` IS WHAT NAMES THE TEMP REPO: `hooksAgree` takes its repo tier from
    // `rootFor(repo.roots, AKASHA)`, so a case that left this alone would read the live checkout's
    // `settings/agents.json` and never see the pair it had written.
    env: { ...process.env, AKASHA_ROOT: at.root, CLAUDE_CONFIG_DIR: at.configDir },
    stdout: "pipe",
    stderr: "pipe",
  })
  return { code: proc.exitCode ?? -1, out: proc.stdout.toString() + proc.stderr.toString() }
}

describe("the check, driven as the repo runs it", () => {
  test("a pair agreeing on every hook passes", () => {
    const at = pair()
    try {
      writeFileSync(`${at.root}/settings/agents.json`, JSON.stringify(sessionStart(entry(SCRIPT))))
      writeFileSync(`${at.configDir}/settings.json`, JSON.stringify(sessionStart(entry(SCRIPT))))
      const run = runCheck(at)
      expect(run.out).toContain("pass")
      expect(run.code).toBe(0)
    } finally {
      at.dispose()
    }
  })

  test("one trailing space in the user tier fails, and names the hook", () => {
    const at = pair()
    try {
      writeFileSync(`${at.root}/settings/agents.json`, JSON.stringify(sessionStart(entry(SCRIPT))))
      writeFileSync(`${at.configDir}/settings.json`, JSON.stringify(sessionStart(entry(`${SCRIPT} `))))
      const run = runCheck(at)
      expect(run.code).toBe(1)
      expect(run.out).toContain("agent-hook-local-agent-session-start.agent-hook.code.attachment.ts")
      expect(run.out).toContain(`byte ${SCRIPT.length}`)
    } finally {
      at.dispose()
    }
  })

  test("a workstation with no user tier is not-applicable rather than a pass", () => {
    const at = pair()
    try {
      writeFileSync(`${at.root}/settings/agents.json`, JSON.stringify(sessionStart(entry(SCRIPT))))
      const run = runCheck(at)
      expect(run.code).toBe(0)
      expect(run.out).toContain("not-applicable")
    } finally {
      at.dispose()
    }
  })

  test("a user tier that is not JSON fails, because nothing else reads that file", () => {
    const at = pair()
    try {
      writeFileSync(`${at.root}/settings/agents.json`, JSON.stringify(sessionStart(entry(SCRIPT))))
      writeFileSync(`${at.configDir}/settings.json`, "{ not json")
      const run = runCheck(at)
      expect(run.code).toBe(1)
      expect(run.out).toContain(`${at.configDir}/settings.json`)
    } finally {
      at.dispose()
    }
  })
})
