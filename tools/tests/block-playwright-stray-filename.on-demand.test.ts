
import { expect, test } from "bun:test"
import { fire, type Ran } from "./hook-shell.ts"

const SCRIPT = "block-playwright-stray-filename.ts"

const OUTPUT_DIR = "/home/walton/.playwright-mcp"

function runHook(toolInput: Record<string, unknown>): Ran {
  return fire(SCRIPT, {
    stdin: { tool_input: toolInput },
    env: { PLAYWRIGHT_MCP_OUTPUT_DIR: OUTPUT_DIR },
  })
}

const BLOCKED: Array<[string, string]> = [
  ["recurrence-popover-snapshot.yml", "bare relative filename"],
  ["./snapshot.yml", "dot-relative"],
  ["../snapshot.yml", "parent-relative"],
  ["sub/dir/foo.png", "nested relative"],
  ["/tmp/snapshot.yml", "absolute outside output-dir"],
  ["/home/walton/code/snapshot.yml", "absolute in repo root"],
  ["/home/walton/.playwright-mcp", "the dir itself, no trailing slash"],
  ["/home/walton/.playwright-mcp-evil/foo.yml", "prefix-collision attempt"],
]

for (const [filename, label] of BLOCKED) {
  test(`blocks: ${label} (${filename})`, () => {
    const r = runHook({ filename })
    expect(r.exitCode).toBe(2)
    expect(r.stderr).toContain(OUTPUT_DIR)
  })
}

const ALLOWED: Array<[Record<string, unknown>, string]> = [
  [{}, "no filename"],
  [{ filename: "" }, "empty filename"],
  [{ filename: `${OUTPUT_DIR}/foo.yml` }, "absolute under output-dir"],
  [{ filename: `${OUTPUT_DIR}/sub/foo.png` }, "nested under output-dir"],
  [{ url: "https://example.com" }, "non-filename tool args (e.g. browser_navigate)"],
]

for (const [toolInput, label] of ALLOWED) {
  test(`allows: ${label}`, () => {
    const r = runHook(toolInput)
    expect(r.exitCode).toBe(0)
    expect(r.stdout).toBe("")
  })
}
