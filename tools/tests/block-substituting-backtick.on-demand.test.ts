
import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { scanCommand } from "../lib/substituting-backtick.ts"
import { fire, type Ran } from "./hook-shell.ts"

const SCRIPT = "agent-hook-block-substituting-backtick.agent-hook.code.attachment.ts"

const HEALTH = mkdtempSync(`${tmpdir()}/backtick-health-`)
afterAll(() => rmSync(HEALTH, { recursive: true, force: true }))

function runHook(command: string): Ran {
  return fire(SCRIPT, {
    stdin: { tool_name: "Bash", tool_input: { command } },
    env: { CLAUDE_HOOK_HEALTH_DIR: HEALTH },
  })
}

const AGAINST_BASH: string[] = [
  'echo "a `echo RAN` b"',
  "cat <<EOF\na `echo RAN` b\nEOF",
  "echo 'a `echo RAN` b'",
  'cat <<"EOF"\na `echo RAN` b\nEOF',
  'echo "a \\`echo RAN\\` b"',
  "cat <<'EOF'\na `echo RAN` b\nEOF",
  "cat <<\\EOF\na `echo RAN` b\nEOF",
  "cat <<-EOF\n\ta `echo RAN` b\n\tEOF",
  'cat <<-"EOF"\n\ta `echo RAN` b\n\tEOF',
  "cat <<EOF\na \\`echo RAN\\` b\nEOF",
  'cat <<<"a `echo RAN` b"',
  "cat <<<'a `echo RAN` b'",
  'echo "${x:-`echo RAN`}"',
  "echo a#b`echo RAN`",
  "echo x # a `echo RAN` b",
  "echo \"$(echo 'a `echo RAN` b')\"",
  'echo "$(echo "a `echo RAN` b")"',
  "echo $'a \\`echo RAN\\` b'",
  "echo a \\`echo RAN\\` c",
  "echo `echo RAN`",
  'echo "a" `echo RAN` "b"',
  'printf "%s" "see `echo RAN` here"',
  "printf '%s' 'see `echo RAN` here'",
  'echo one; echo "two `echo RAN`"',
  "echo one; echo 'two `echo RAN`'",
  "x=`echo RAN`; echo $x",
  "x='`echo RAN`'; echo \"$x\"",
]

test.each(AGAINST_BASH)("agrees with bash about: %s", (command) => {
  const run = Bun.spawnSync({ cmd: ["bash", "-c", command], stdout: "pipe", stderr: "pipe" })
  const output = run.stdout.toString()
  const substituted = output.includes("RAN") && !output.includes("echo RAN")
  expect(scanCommand(command).kind === "hazard").toBe(substituted)
})

const REFUSED: string[] = [
  'gh pr create --body "fixes `the thing`"',
  "cat <<EOF\nrun `date` first\nEOF",
  "echo `date`",
  'printf "%s" "see `ops seat send` first"',
]

test.each(REFUSED)("refuses: %s", (command) => {
  const result = runHook(command)
  expect(result.exitCode).toBe(2)
  expect(result.stderr).toContain("backtick standing where bash would substitute it")
  expect(result.stderr).toContain("$( )")
  expect(result.stderr).toContain("<<'EOF'")
})

const ALLOWED: string[] = [
  "printf '%s' 'see `ops seat send` first'",
  'printf "%s" "see \\`ops seat send\\` first"',
  "cat <<'EOF' > /tmp/x\nrun `date` first\nEOF",
  "git status",
  "ops project commit --message-file /tmp/m",
  "",
]

test.each(ALLOWED)("allows: %s", (command) => {
  const result = runHook(command)
  expect(result.exitCode).toBe(0)
  expect(result.stdout).toBe("")
})

test("a command it cannot parse refuses nothing and says it inspected nothing", () => {
  const result = runHook('echo "a `b` c')
  expect(result.exitCode).toBe(0)
  expect(result.stdout).toContain("systemMessage")
  expect(result.stdout).toContain("did not inspect")
  expect(result.stderr).toContain("NOT inspected")
  const written = readFileSync(`${HEALTH}/block-substituting-backtick.jsonl`, "utf8")
  expect(written).toContain("uninspected")
})

test("a tool that is not Bash is not inspected at all", () => {
  const result = fire(SCRIPT, {
    stdin: { tool_name: "Write", tool_input: { file_path: "/tmp/a`b`c" } },
    env: { CLAUDE_HOOK_HEALTH_DIR: HEALTH },
  })
  expect(result.exitCode).toBe(0)
  expect(result.stdout).toBe("")
})

test("it declares its own scope, including what it gives up", () => {
  const result = fire(SCRIPT, { args: ["--scope"], env: { CLAUDE_HOOK_HEALTH_DIR: HEALTH } })
  expect(result.exitCode).toBe(0)
  expect(result.stdout).toContain("DOES NOT COVER")
  expect(result.stdout).toContain("${ }")
  expect(result.stdout).toContain("HEALTH")
})
