import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { hooksUncopied, registeredHooks } from "../audits/hooks-uncopied.ts"
import type { CheckOutcome, RepoView } from "../lib/check.ts"
import { refusalText } from "../../refusal/refusal.ts"
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

function viewOf(root: string): RepoView {
  return {
    roots: { akasha: root, target: "akasha" },
    name: "akasha",
    documents: [],
    read: (relPath) => require("node:fs").readFileSync(`${root}/${relPath}`, "utf8") as string,
    exists: (absolute) => require("node:fs").existsSync(absolute) as boolean,
  }
}

/**
 * One repository holding the settings and every file a copy could be, which is the world there is:
 * `instructions` and `code` were absorbed into akasha, so the tree registering a hook and the tree a
 * stray copy of it would be tracked in are the same tree.
 */
function ran(settings: string | null, tracked: readonly string[], versioned = true): CheckOutcome {
  const root = scratch("hooks-uncopied")
  installRefusals(root)
  if (settings !== null) write(root, "settings/agents.json", settings)
  for (const relPath of tracked) write(root, relPath, "#!/usr/bin/env bash\n")
  if (versioned) {
    Bun.spawnSync(["git", "-C", root, "init", "-q"], { stdout: "pipe", stderr: "pipe" })
    if (tracked.length > 0) {
      Bun.spawnSync(["git", "-C", root, "add", "--", ...tracked], {
        stdout: "pipe",
        stderr: "pipe",
      })
    }
  }
  return hooksUncopied(viewOf(root))
}

const REGISTERED = "tools/hooks/block-direct-main-writes.sh"

const HOOK = `bash $HOME/repos/akasha/${REGISTERED}`

describe("a hook the fleet fires with a twin elsewhere in the tree", () => {
  test("is refused, and the refusal names both the hook and where the copy sits", () => {
    const outcome = ran(registering(HOOK), [
      REGISTERED,
      "infra/scripts/block-direct-main-writes.sh",
    ])
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(
      refusalText(
        "hook-copied-into-code",
        {
          name: "block-direct-main-writes.sh",
          registered: `akasha/${REGISTERED}`,
          path: "infra/scripts/block-direct-main-writes.sh",
        },
        ROOT
      )
    )
  })

  test("is refused wherever the copy sits, the name being what is shared", () => {
    const outcome = ran(registering(HOOK), [
      REGISTERED,
      "somewhere/else/block-direct-main-writes.sh",
    ])
    expect(outcome.verdict).toBe("fail")
  })

  test("with no twin, the check passes over every hook it read", () => {
    const outcome = ran(registering(HOOK), [REGISTERED, "infra/scripts/something-else.sh"])
    expect(outcome.verdict).toBe("pass")
    expect(outcome.population.measured).toBe(1)
  })

  test("the file the registration itself names is not a twin of itself", () => {
    const outcome = ran(registering(HOOK), [REGISTERED])
    expect(outcome.verdict).toBe("pass")
    expect(outcome.population.measured).toBe(1)
  })
})

describe("the silences that are not a clean repo", () => {
  test("a root that is no git repository is not-applicable rather than a pass", () => {
    const outcome = ran(registering(HOOK), [REGISTERED], false)
    expect(outcome.verdict).toBe("not-applicable")
    expect(outcome.population.measured).toBe(0)
  })

  test("a settings file registering no hook says so rather than passing over nothing", () => {
    const outcome = ran(registering("printf '\\a'"), ["infra/scripts/a.sh"])
    expect(outcome.verdict).toBe("not-applicable")
    expect(outcome.population.measured).toBe(0)
  })

  test("no settings file at all is skipped rather than judged", () => {
    expect(ran(null, ["a.sh"]).verdict).toBe("not-applicable")
  })
})

describe("which registrations count as hooks the fleet fires", () => {
  test("a path under the repository, whether or not it is spelled through `repos/`", () => {
    const found = registeredHooks(
      JSON.parse(registering(HOOK, "$HOME/akasha/infra/scripts/some-guard.sh"))
    )
    expect([...found.keys()].sort()).toEqual(
      ["block-direct-main-writes.sh", "some-guard.sh"].sort()
    )
  })

  test("an interpreter is not a hook, so the script it runs is what is filed", () => {
    const found = registeredHooks(
      JSON.parse(registering("$HOME/.bun/bin/bun $HOME/repos/akasha/tools/hooks/hold-seat.ts"))
    )
    expect([...found.keys()]).toEqual(["hold-seat.ts"])
  })

  test("a command naming the repository nowhere registers nothing", () => {
    expect(registeredHooks(JSON.parse(registering("printf '\\a'"))).size).toBe(0)
  })

  test("a path under a repository absorbed into akasha registers nothing, there being none", () => {
    expect(
      registeredHooks(JSON.parse(registering("$HOME/code/packages/infra/scripts/some-guard.sh")))
        .size
    ).toBe(0)
  })
})
