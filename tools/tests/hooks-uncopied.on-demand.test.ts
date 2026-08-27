
import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { hooksUncopied, registeredHooks } from "../audits/hooks-uncopied.ts"
import type { CheckOutcome, RepoView } from "../lib/check.ts"
import { fromDisk, refusalText } from "../lib/refusal.ts"
import { installRefusals } from "./fixture.ts"

const ROOT = resolve(import.meta.dir, "..", "..")

const ROOTS: string[] = []
afterAll(() => {
  for (const root of ROOTS) rmSync(root, { recursive: true, force: true })
})

function scratch(prefix: string): string {
  const root = mkdtempSync(`${tmpdir()}/${prefix}-`)
  ROOTS.push(root)
  return root
}

function write(root: string, relPath: string, body: string): void {
  const at = relPath.split("/").slice(0, -1).join("/")
  if (at !== "") mkdirSync(`${root}/${at}`, { recursive: true })
  writeFileSync(`${root}/${relPath}`, body)
}

function registering(...commands: readonly string[]): string {
  return JSON.stringify({
    hooks: { PreToolUse: [{ matcher: "Bash", hooks: commands.map((command) => ({ command })) }] },
  })
}

function codeRepo(...relPaths: readonly string[]): string {
  const root = scratch("hooks-uncopied-code")
  Bun.spawnSync(["git", "-C", root, "init", "-q"], { stdout: "pipe", stderr: "pipe" })
  for (const relPath of relPaths) write(root, relPath, "#!/usr/bin/env bash\n")
  if (relPaths.length > 0) {
    Bun.spawnSync(["git", "-C", root, "add", "-A"], { stdout: "pipe", stderr: "pipe" })
  }
  return root
}

function ran(settings: string | null, code: string): CheckOutcome {
  const root = scratch("hooks-uncopied-instructions")
  installRefusals(root)
  if (settings !== null) write(root, "settings/agents.json", settings)
  const repo: RepoView = {
    roots: { instructions: root, code, memory: "/nonexistent", books: "/nonexistent", stories: "/nonexistent", "code-editor": "/nonexistent", target: "instructions" },
    name: "instructions",
    documents: [],
    read: (relPath) => require("node:fs").readFileSync(`${root}/${relPath}`, "utf8") as string,
    exists: (absolute) => require("node:fs").existsSync(absolute) as boolean,
  }
  return hooksUncopied(repo)
}

const HOOK = "bash $HOME/instructions/tools/hooks/block-direct-main-writes.sh"

describe("a hook the fleet fires with a twin in the code repository", () => {
  test("is refused, and the refusal names both the hook and where the copy sits", () => {
    const outcome = ran(registering(HOOK), codeRepo("packages/infra/scripts/block-direct-main-writes.sh"))
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      refusalText(
        "hook-copied-into-code",
        {
          name: "block-direct-main-writes.sh",
          registered: "instructions/tools/hooks/block-direct-main-writes.sh",
          path: "packages/infra/scripts/block-direct-main-writes.sh",
        },
        ROOT,
        fromDisk
      )
    )
  })

  test("is refused wherever in that repo the copy sits, the name being what is shared", () => {
    const outcome = ran(registering(HOOK), codeRepo("somewhere/else/block-direct-main-writes.sh"))
    expect(outcome.verdict).toBe("fail")
  })

  test("with no twin there, the check passes over every hook it read", () => {
    const outcome = ran(registering(HOOK), codeRepo("packages/infra/scripts/something-else.sh"))
    expect(outcome.verdict).toBe("pass")
    expect(outcome.population.measured).toBe(1)
  })
})

describe("a hook registered out of the code repository", () => {
  const tail = "packages/infra/scripts/some-guard.sh"
  const registration = `$HOME/code/${tail}`

  test("is refused where its file is tracked there, no registration being excepted now", () => {
    expect(ran(registering(registration), codeRepo(tail)).verdict).toBe("fail")
  })

  test("is refused wherever in that repo the file sits, the name being what is shared", () => {
    expect(ran(registering(registration), codeRepo("elsewhere/some-guard.sh")).verdict).toBe("fail")
  })
})

describe("the silences that are not a clean repo", () => {
  test("a code root that is no git repository is not-applicable rather than a pass", () => {
    const outcome = ran(registering(HOOK), `${scratch("hooks-uncopied-bare")}/nothing-here`)
    expect(outcome.verdict).toBe("not-applicable")
    expect(outcome.population.measured).toBe(0)
  })

  test("a settings file registering no hook says so rather than passing over nothing", () => {
    const outcome = ran(registering("printf '\\a'"), codeRepo("packages/infra/scripts/a.sh"))
    expect(outcome.verdict).toBe("not-applicable")
    expect(outcome.population.measured).toBe(0)
  })

  test("no settings file at all is skipped rather than judged", () => {
    expect(ran(null, codeRepo("a.sh")).verdict).toBe("not-applicable")
  })
})

describe("which registrations count as hooks the fleet fires", () => {
  test("both repos, so a code-repository registration is reachable rather than skipped", () => {
    const found = registeredHooks(
      JSON.parse(registering(HOOK, "$HOME/code/packages/infra/scripts/some-guard.sh"))
    )
    expect([...found.keys()].sort()).toEqual(["block-direct-main-writes.sh", "some-guard.sh"].sort())
  })

  test("an interpreter is not a hook, so the script it runs is what is filed", () => {
    const found = registeredHooks(
      JSON.parse(registering("$HOME/.bun/bin/bun $HOME/instructions/tools/hooks/hold-seat.ts"))
    )
    expect([...found.keys()]).toEqual(["hold-seat.ts"])
  })

  test("a command naming neither repo registers nothing", () => {
    expect(registeredHooks(JSON.parse(registering("printf '\\a'"))).size).toBe(0)
  })
})
