
import { expect, test } from "bun:test"
import { fire, type Ran } from "./hook-shell.ts"

const SCRIPT = "agent-hook-block-addon-direct-install.agent-hook.code.attachment.ts"

function runHook(command: string): Ran {
  return fire(SCRIPT, { stdin: { tool_input: { command } } })
}

const BLOCKED: string[] = [
  "ops temper addon install --addon TemperInventory",
  "ops temper addon install --addon TemperCatalog --code-root /var/home/walton/repos/akasha",
  "bun tools/ops/cli.ts temper addon install --addon TemperCharacters",
  "cd packages/temper/addons && ops temper addon install --addon TemperSales",
  "ops temper addon install --addon TemperInventory \\\n  --code-root /var/home/walton/repos/akasha",
  "ops temper addon build TemperInventory",
  "ops temper addon build --all",
  "ops temper addon build TemperInventory --verbose",
  "cd packages/temper/addons && ops temper addon build TemperInventory",
  "ops temper addon build TemperInventory && echo done",
  "CODE_ROOT=/var/home/walton/repos/akasha ops temper addon build TemperSales",
  "bun tools/ops/cli.ts temper addon build TemperCatalog",
  "ops temper addon build \\\n  TemperSales",
]

const ALLOWED: string[] = [
  "ops temper addon build TemperInventory --build-only",
  "ops temper addon build TemperCharacters --watch",
  "ops temper addon build --build-only TemperInventory",
  "ops temper addon build TemperSales --build-only --code-root /var/home/walton/repos/akasha",
  "bun tools/ops/cli.ts temper addon build TemperCatalog --build-only",
  "ops temper addon build --help",
  "ops temper addon build -h",
  "ops temper addon build TemperInventory --help",
  "ops temper addon build TemperSales \\\n  --build-only \\\n  --code-root /var/home/walton/repos/akasha",
  "ops temper addon list",
  "ops project deploy --seq 12143",
  "ops temper addon install --help",
  "ops temper addon install -h",
  "ops project commit --seq 12215 --message fix --path tools/commands/temper/addon/install.ts",
  "ops project commit --seq 12215 --message fix --path tools/commands/temper/addon/build.ts",
  "ops rm --dry-run \\\n  /w/packages/temper/addons/scripts/build/install-addon.ts \\\n  /w/packages/temper/addons/scripts/build/copy-metadata.ts",
  "cat pages/old-ops-command/ops-temper-addon-build.old-ops-command.md",
  "grep flock tools/commands/temper/addon/install.ts",
  "ls tools/commands/temper/addon/",
  "echo 'ops temper addon build TemperInventory'",
  "echo 'ops temper addon install --addon TemperInventory'",
  "git status",
  "bun test packages/temper/addons",
  "",
]

test.each(BLOCKED)("blocks: %s", (cmd) => {
  const result = runHook(cmd)
  expect(result.exitCode).toBe(2)
  expect(result.stdout).toContain('"decision"')
  expect(result.stdout).toContain('"block"')
  expect(result.stderr).toContain("Direct ESO addon installs are prohibited")
})

test.each(ALLOWED)("allows: %s", (cmd) => {
  const result = runHook(cmd)
  expect(result.exitCode).toBe(0)
  expect(result.stdout).toBe("")
})

test("allows tool calls with no command field", () => {
  expect(fire(SCRIPT, { stdin: { tool_input: { file_path: "/var/tmp/foo" } } }).exitCode).toBe(0)
})
