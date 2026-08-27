
import { describe, expect, test } from "bun:test"
import { fire, type Ran } from "./hook-shell.ts"

const SCRIPT = "block-instructions-direct-commit.sh"

const ROOT = "/var/tmp/test-instructions-root"
const HOME = "/home/walton"

function runHook(command: string, cwd = `${HOME}/worktrees/16450`): Ran {
  return fire(SCRIPT, {
    stdin: { tool_input: { command }, cwd },
    env: { INSTRUCTIONS_ROOT: ROOT, HOME },
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

describe("blocks a direct commit inside the instructions root", () => {
  test("cd into the root, then commit", () => {
    expectBlocked(runHook(`cd ${ROOT} && git commit -m "x"`))
  })

  test("cd into a subdirectory of the root, then commit", () => {
    expectBlocked(runHook(`cd ${ROOT}/skills/agent-harness && git commit -m "x"`))
  })

  test("git -C pointed at the root", () => {
    expectBlocked(runHook(`git -C ${ROOT} commit -m "x"`))
  })

  test("a commit whose only directory signal is the session cwd", () => {
    expectBlocked(runHook('git commit -m "x"', ROOT))
  })

  test("commit --amend inside the root", () => {
    expectBlocked(runHook(`cd ${ROOT} && git commit --amend`))
  })

  test("git add staged first, then commit — the commit is still the command", () => {
    expectBlocked(runHook(`cd ${ROOT} && git add . && git commit -m "x"`))
  })

  test("a relative cd from a session cwd already inside the root", () => {
    expectBlocked(runHook('cd skills && git commit -m "x"', ROOT))
  })

  test("the refusal names the sanctioned command so the author knows what to do instead", () => {
    const result = runHook(`cd ${ROOT} && git commit -m "x"`)
    expect(result.stderr).toContain("ops write")
  })

  test("the refusal names the root it is protecting", () => {
    expect(runHook(`cd ${ROOT} && git commit -m "x"`).stderr).toContain(ROOT)
  })

  test("names both of the repo's own commands, which take every path in that root", () => {
    const { stderr } = runHook(`cd ${ROOT} && git commit -m "x"`)
    expect(stderr).toContain("ops write")
    expect(stderr).toContain("ops edit")
  })

  test("routes a markdown document to the same command, not to ops instructions", () => {
    expect(runHook(`cd ${ROOT} && git commit -m "x"`).stderr).not.toContain("ops instructions")
  })

  test("names the recovery form — a file on disk handed to a command as its own source", () => {
    const { stderr } = runHook(`cd ${ROOT} && git commit -m "x"`)
    expect(stderr).toContain("as its own source")
    expect(stderr).toContain(ROOT)
  })

  test("ships no copy of an interface it does not own", () => {
    const { stderr } = runHook(`cd ${ROOT} && git commit -m "x"`)
    expect(stderr).not.toContain("--path")
    expect(stderr).not.toContain("--from")
    expect(stderr).toContain("--help")
  })
})

describe("allows everything it is not for", () => {
  test("a commit in the code repo", () => {
    expectAllowed(runHook(`cd ${HOME}/code && git commit -m "x"`))
  })

  test("a commit in a worktree, with no cd at all", () => {
    expectAllowed(runHook('git commit -m "x"'))
  })

  test("a non-commit git command inside the root — reads are never gated", () => {
    expectAllowed(runHook(`cd ${ROOT} && git status`))
    expectAllowed(runHook(`cd ${ROOT} && git log --oneline`))
    expectAllowed(runHook(`cd ${ROOT} && git diff`))
  })

  test("git add inside the root without a commit", () => {
    expectAllowed(runHook(`cd ${ROOT} && git add .`))
  })

  test("the sanctioned write command itself", () => {
    expectAllowed(runHook("ops write --input-file /var/tmp/x.json"))
  })

  test("a sibling directory sharing the root's name prefix", () => {
    expectAllowed(runHook(`cd ${ROOT}-scratch && git commit -m "x"`))
  })

  test("a commit inside a remote shell payload", () => {
    expectAllowed(runHook(`ssh host 'cd ${ROOT} && git commit -m "x"'`))
  })

  test("an empty command", () => {
    expectAllowed(runHook(""))
  })

  test("a cd into the root followed by a cd back out, then a commit", () => {
    expectAllowed(runHook(`cd ${ROOT} && cd ${HOME}/code && git commit -m "x"`))
  })

  test("a word merely containing the root path is not a commit there", () => {
    expectAllowed(runHook(`echo ${ROOT} && git commit -m "x"`))
  })
})
