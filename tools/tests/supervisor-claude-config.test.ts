import { describe, expect, it } from "bun:test"
import {
  expandHome,
  readClaudeConfigDeclaration,
  reconcileClaudeConfig,
} from "../lib/supervisor-claude-config.ts"

const HOME = "/var/home/walton"

const DECLARED = {
  hasCompletedOnboarding: true,
  projects: {
    "$HOME/instructions": { hasTrustDialogAccepted: true },
    "$HOME/code": { hasTrustDialogAccepted: true },
  },
}

describe("the repository is what says which workspaces a seat trusts", () => {
  it("trusts a declared path on an account that had never heard of it", () => {
    const out = reconcileClaudeConfig(
      { projects: { [`${HOME}/code`]: { hasTrustDialogAccepted: true } } },
      DECLARED,
      HOME
    )
    const projects = out.projects as Record<string, Record<string, unknown>>
    expect(projects[`${HOME}/instructions`]?.hasTrustDialogAccepted).toBe(true)
  })

  it("overrides a path the account explicitly distrusted, which is the drift being repaired", () => {
    const out = reconcileClaudeConfig(
      { projects: { [`${HOME}/instructions`]: { hasTrustDialogAccepted: false } } },
      DECLARED,
      HOME
    )
    const projects = out.projects as Record<string, Record<string, unknown>>
    expect(projects[`${HOME}/instructions`]?.hasTrustDialogAccepted).toBe(true)
  })

  it("keeps every other key on a project it touches", () => {
    const out = reconcileClaudeConfig(
      {
        projects: {
          [`${HOME}/instructions`]: { hasTrustDialogAccepted: false, history: ["a", "b"] },
        },
      },
      DECLARED,
      HOME
    )
    const projects = out.projects as Record<string, Record<string, unknown>>
    expect(projects[`${HOME}/instructions`]?.history).toEqual(["a", "b"])
  })

  it("keeps every project the declaration does not name", () => {
    const out = reconcileClaudeConfig(
      { projects: { "/somewhere/else": { hasTrustDialogAccepted: true } } },
      DECLARED,
      HOME
    )
    const projects = out.projects as Record<string, Record<string, unknown>>
    expect(projects["/somewhere/else"]?.hasTrustDialogAccepted).toBe(true)
  })

  it("keeps top-level state the declaration says nothing about, which is where credentials sit", () => {
    const out = reconcileClaudeConfig({ oauthAccount: { uuid: "abc" } }, DECLARED, HOME)
    expect(out.oauthAccount).toEqual({ uuid: "abc" })
  })

  it("writes the onboarding flag the first boot used to seed", () => {
    expect(reconcileClaudeConfig({}, DECLARED, HOME).hasCompletedOnboarding).toBe(true)
  })
})

describe("expandHome", () => {
  it("expands the token the declaration is written with", () => {
    expect(expandHome("$HOME/instructions", HOME)).toBe(`${HOME}/instructions`)
  })

  it("leaves an absolute path alone", () => {
    expect(expandHome("/etc/somewhere", HOME)).toBe("/etc/somewhere")
  })
})

describe("the declaration that ships with this repository", () => {
  it("answers nothing rather than throwing where no declaration stands", () => {
    expect(readClaudeConfigDeclaration("/var/tmp/no-such-claude-config.json")).toBeNull()
  })
})
