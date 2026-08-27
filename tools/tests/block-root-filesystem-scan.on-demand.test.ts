
import { expect, test } from "bun:test"
import { fire, type Ran } from "./hook-shell.ts"

const SCRIPT = "block-root-filesystem-scan.ts"

function runHook(command: string): Ran {
  return fire(SCRIPT, { stdin: { tool_input: { command } }, env: { HOME: "/home/walton" } })
}

const BLOCKED: string[] = [
  "grep -rln X /",
  "ugrep -r X /",
  "egrep -r PATTERN /",
  "fgrep -R PATTERN /",
  "find / -name foo",
  "fd foo /",
  "fdfind foo /",
  "rg X /",
  "ripgrep X /",
  "rg X $HOME",
  "grep -r X $HOME",
  "grep -r X ${HOME}",
  "grep -r X ~",
  "grep -r X ~/",
  "find $HOME -name foo",
  "find ~ -type f",
  "grep -r X /home/walton",
  "grep -r X /proc",
  "find /sys -name foo",
  "rg X /dev",
  "FOO=1 grep -rln X /",
  "sudo find / -name foo",
  "/usr/bin/grep -rln X /",
  "grep -Rn X /",
  "grep -r X /proc/",
  "cd packages/temper && grep -rln X /",
]

const ALLOWED: string[] = [
  "grep -rln X .",
  "grep -r X packages/",
  "grep -rln X packages/temper/inventory",
  "grep -r X /home/walton/code/packages",
  "rg X packages/temper",
  "find packages/ -name foo",
  "find packages/temper -name '*.ts'",
  "fd foo packages/",
  "grep -rln X /home/walton/worktrees/12807/packages",
  "find ~/code/packages -name foo",
  "grep -r X $HOME/code",
  "grep -r X ~/code/packages",
  "grep PATTERN /etc/hosts",
  "grep X /proc/cpuinfo",
  "grep needle /sys/class/net/eth0/address",
  "ssh node-01 'grep -rln X /'",
  "kubectl exec -n ci pod -- sh -c 'find / -name foo'",
  "echo 'grep -rln X /'",
  "git status",
  "ls /",
  "cat /proc/cpuinfo",
  "bun test packages/infra/scripts",
  "",
]

test.each(BLOCKED)("blocks: %s", (cmd) => {
  const result = runHook(cmd)
  expect(result.exitCode).toBe(2)
  expect(result.stdout).toContain('"decision"')
  expect(result.stdout).toContain('"block"')
  expect(result.stderr).toContain("packages/")
})

test.each(ALLOWED)("allows: %s", (cmd) => {
  const result = runHook(cmd)
  expect(result.exitCode).toBe(0)
  expect(result.stdout).toBe("")
})

test("allows tool calls with no command field", () => {
  expect(fire(SCRIPT, { stdin: { tool_input: { file_path: "/tmp/foo" } } }).exitCode).toBe(0)
})
