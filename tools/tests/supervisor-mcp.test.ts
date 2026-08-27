
import { describe } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { reconcileDisabledMcpServers } from "../lib/supervisor-mcp.ts"
import { holdAgainstStanding, type Scenario } from "./supervisor-mcp-arm.ts"

const DECLARED = ["messages", "playwright"] as const

interface ShellAnswer extends Record<string, unknown> {
  threw: string | null
  fileExistsAfter: boolean
  byteUnchanged: boolean
  disabledForDir: unknown
  keepForDir: unknown
  numStartups: unknown
  loggedCleared: boolean
  loggedClearedPlaywright: boolean
  quiet: boolean
}

function shellCase(build: (dir: string) => string | null): ShellAnswer {
  const dir = mkdtempSync(join(tmpdir(), "mcp-reconcile-"))
  const logs: string[] = []
  const errs: string[] = []
  const realLog = console.log
  const realErr = console.error
  console.log = (...a: unknown[]): void => void logs.push(a.join(" "))
  console.error = (...a: unknown[]): void => void errs.push(a.join(" "))
  try {
    const path = build(dir)
    const before = path !== null && existsSync(path) ? readFileSync(path, "utf8") : null
    let threw: string | null = null
    try {
      reconcileDisabledMcpServers(dir, dir, DECLARED)
    } catch (err) {
      threw = err instanceof Error ? err.message : String(err)
    }
    const after = path !== null && existsSync(path) ? readFileSync(path, "utf8") : null
    const parsed =
      after === null
        ? null
        : ((): Record<string, unknown> | null => {
            try {
              return JSON.parse(after) as Record<string, unknown>
            } catch {
              return null
            }
          })()
    const projects =
      parsed !== null && typeof parsed.projects === "object" && parsed.projects !== null
        ? (parsed.projects as Record<string, Record<string, unknown>>)
        : null
    return {
      threw,
      fileExistsAfter: after !== null,
      byteUnchanged: before === after,
      disabledForDir: projects?.[dir]?.disabledMcpServers ?? null,
      keepForDir: projects?.[dir]?.keep ?? null,
      numStartups: parsed?.numStartups ?? null,
      loggedCleared: logs.some((l) => l.includes("cleared")),
      loggedClearedPlaywright: logs.some((l) => l.includes("cleared [playwright]")),
      quiet: logs.length + errs.length === 0,
    }
  } finally {
    console.log = realLog
    console.error = realErr
    rmSync(dir, { recursive: true, force: true })
  }
}

function writeConfig(dir: string, obj: unknown): string {
  const path = join(dir, ".claude.json")
  writeFileSync(path, `${JSON.stringify(obj, null, 2)}\n`)
  return path
}

const scenarios: readonly Scenario[] = [
  {
    name: "clears a registry-declared server, keeps the rest, and logs what it cleared",
    ported: () =>
      shellCase((dir) =>
        writeConfig(dir, {
          numStartups: 42,
          projects: { [dir]: { disabledMcpServers: ["playwright", "notion"], keep: "me" } },
        })
      ),
    standing: {
      threw: null,
      fileExistsAfter: true,
      byteUnchanged: false,
      disabledForDir: ["notion"],
      keepForDir: "me",
      numStartups: 42,
      loggedCleared: true,
      loggedClearedPlaywright: true,
      quiet: false,
    },
  },
  {
    name: "no-op, byte-unchanged and silent, when only unrelated servers are disabled",
    ported: () =>
      shellCase((dir) => writeConfig(dir, { projects: { [dir]: { disabledMcpServers: ["notion"] } } })),
    standing: {
      threw: null,
      fileExistsAfter: true,
      byteUnchanged: true,
      disabledForDir: ["notion"],
      keepForDir: null,
      numStartups: null,
      loggedCleared: false,
      loggedClearedPlaywright: false,
      quiet: true,
    },
  },
  {
    name: "a missing config file is a silent no-op that creates nothing",
    ported: () => shellCase((dir) => join(dir, ".claude.json")),
    standing: {
      threw: null,
      fileExistsAfter: false,
      byteUnchanged: true,
      disabledForDir: null,
      keepForDir: null,
      numStartups: null,
      loggedCleared: false,
      loggedClearedPlaywright: false,
      quiet: true,
    },
  },
  {
    name: "a malformed config fails open and is left byte-unchanged",
    ported: () =>
      shellCase((dir) => {
        const path = join(dir, ".claude.json")
        writeFileSync(path, "{ not valid json")
        return path
      }),
    standing: {
      threw: null,
      fileExistsAfter: true,
      byteUnchanged: true,
      disabledForDir: null,
      keepForDir: null,
      numStartups: null,
      loggedCleared: false,
      loggedClearedPlaywright: false,
      quiet: true,
    },
  },
  {
    name: "a config naming no matching project key is a no-op",
    ported: () =>
      shellCase((dir) =>
        writeConfig(dir, { projects: { "/some/other/path": { disabledMcpServers: ["playwright"] } } })
      ),
    standing: {
      threw: null,
      fileExistsAfter: true,
      byteUnchanged: true,
      disabledForDir: null,
      keepForDir: null,
      numStartups: null,
      loggedCleared: false,
      loggedClearedPlaywright: false,
      quiet: true,
    },
  },
]

describe("reconcileDisabledMcpServers", () => {
  holdAgainstStanding(scenarios)
})
