import { describe, expect, it } from "bun:test"
import { homedir } from "node:os"
import { resolveRoots } from "../../repo/roots/roots"
import { readClaudeConfigDeclaration } from "../lib/supervisor-claude-config.ts"

describe("the declaration that ships with this repository, read against the live installation", () => {
  it("is readable and trusts the directory every seat is spawned in", () => {
    const declared = readClaudeConfigDeclaration()
    expect(declared).not.toBeNull()
    const projects = (declared as Record<string, unknown>).projects as Record<
      string,
      Record<string, unknown>
    >
    const spawnedIn = `$HOME${resolveRoots().akasha.slice(homedir().length)}`
    expect(projects[spawnedIn]?.hasTrustDialogAccepted).toBe(true)
  })
})
