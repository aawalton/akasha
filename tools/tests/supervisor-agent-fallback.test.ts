
import { beforeEach, describe, expect, it } from "bun:test"
import { selectAccountAndWriteCredential } from "../lib/supervisor-agent.ts"
import {
  credPick,
  freshCred,
  makeDeps,
  staleCred,
  type Write,
} from "./supervisor-agent-carried-fixture.ts"

let writes: Write[]

beforeEach(() => {
  writes = []
})

describe("selectAccountAndWriteCredential — bootstrap mode (explicit pin, interactive, no page)", () => {
  it("bootstraps the pinned account: returns it, skips the disk write, never falls back", async () => {
    let getBestCalls = 0
    const deps = makeDeps(writes, {
      getCredentialByAccount: async () => null,
      getBestCredential: async () => {
        getBestCalls += 1
        return credPick("aawalton")
      },
    })
    const picked = await selectAccountAndWriteCredential("ctw", deps, true)
    expect(picked).toBe("ctw")
    expect(getBestCalls).toBe(0)
    expect(writes).toHaveLength(0)
  })

  it("headless explicit pin to a missing account still falls back (no bootstrap)", async () => {
    let getBestCalls = 0
    const deps = makeDeps(writes, {
      getCredentialByAccount: async () => null,
      getBestCredential: async () => {
        getBestCalls += 1
        return credPick("alanwalton")
      },
    })
    const picked = await selectAccountAndWriteCredential("ctw", deps, false)
    expect(picked).toBe("alanwalton")
    expect(getBestCalls).toBe(1)
    expect(writes).toEqual([
      { configDir: "/home/test/.claude/accounts/alanwalton", account: "alanwalton" },
    ])
  })

  it("refuses an explicit pin whose account has no claude-account page, before any page is minted", async () => {
    let getBestCalls = 0
    const deps = makeDeps(writes, {
      getCredentialByAccount: async () => null,
      claudeAccountPageExists: async () => false,
      getBestCredential: async () => {
        getBestCalls += 1
        return credPick("aawalton")
      },
    })
    await expect(
      selectAccountAndWriteCredential("no-such-account-boot-assertion-fixture", deps, true)
    ).rejects.toThrow(/no-such-account-boot-assertion-fixture/)
    expect(getBestCalls).toBe(0)
    expect(writes).toHaveLength(0)
  })

  it("still bootstraps when the page exists but carries no token material yet", async () => {
    let existenceChecks = 0
    const deps = makeDeps(writes, {
      getCredentialByAccount: async () => null,
      claudeAccountPageExists: async () => {
        existenceChecks += 1
        return true
      },
    })
    const picked = await selectAccountAndWriteCredential("ctw", deps, true)
    expect(picked).toBe("ctw")
    expect(existenceChecks).toBe(1)
    expect(writes).toHaveLength(0)
  })

  it("unpinned (undefined) missing account still falls back even when interactive (no bootstrap)", async () => {
    let getBestCalls = 0
    const deps = makeDeps(writes, {
      getCredentialByAccount: async () => null,
      getBestCredential: async () => {
        getBestCalls += 1
        return credPick("alanwalton")
      },
    })
    const picked = await selectAccountAndWriteCredential(undefined, deps, true)
    expect(picked).toBe("alanwalton")
    expect(getBestCalls).toBe(1)
    expect(writes).toEqual([
      { configDir: "/home/test/.claude/accounts/alanwalton", account: "alanwalton" },
    ])
  })
})

describe("selectAccountAndWriteCredential — unpinned via empty string (no --account)", () => {
  it("defaults to aawalton when the page exists (does NOT bootstrap-return the empty string)", async () => {
    const getByAccountArgs: string[] = []
    let getBestCalls = 0
    const cred = freshCred("aawalton")
    const deps = makeDeps(writes, {
      getCredentialByAccount: async (account) => {
        getByAccountArgs.push(account)
        return cred
      },
      getBestCredential: async () => {
        getBestCalls += 1
        return null
      },
    })
    const picked = await selectAccountAndWriteCredential("", deps, true)
    expect(picked).toBe("aawalton")
    expect(getByAccountArgs).toEqual(["aawalton"])
    expect(getBestCalls).toBe(0)
    expect(writes).toEqual([
      { configDir: "/home/test/.claude/accounts/aawalton", account: "aawalton" },
    ])
  })

  it("falls back to getBestCredential when aawalton's page is missing, even interactive (no bootstrap)", async () => {
    let getBestCalls = 0
    const deps = makeDeps(writes, {
      getCredentialByAccount: async () => null,
      getBestCredential: async () => {
        getBestCalls += 1
        return credPick("alanwalton")
      },
    })
    const picked = await selectAccountAndWriteCredential("", deps, true)
    expect(picked).toBe("alanwalton")
    expect(getBestCalls).toBe(1)
    expect(writes).toEqual([
      { configDir: "/home/test/.claude/accounts/alanwalton", account: "alanwalton" },
    ])
  })
})

describe("selectAccountAndWriteCredential — pinned account, no page", () => {
  it("falls back to getBestCredential silently", async () => {
    const deps = makeDeps(writes, {
      getCredentialByAccount: async () => null,
      getBestCredential: async () => credPick("alanwalton"),
    })
    const picked = await selectAccountAndWriteCredential("aawalton", deps)
    expect(picked).toBe("alanwalton")
    expect(writes).toEqual([
      { configDir: "/home/test/.claude/accounts/alanwalton", account: "alanwalton" },
    ])
  })

  it("throws when no managed credential is available at all", async () => {
    const deps = makeDeps(writes, {
      getCredentialByAccount: async () => null,
      getBestCredential: async () => null,
    })
    await expect(selectAccountAndWriteCredential("aawalton", deps)).rejects.toThrow(
      /No managed credential/
    )
  })
})

describe("selectAccountAndWriteCredential — unpinned (no --account)", () => {
  it("defaults to aawalton when the page exists (claude.ai remote control stays attached to the primary identity)", async () => {
    const getByAccountArgs: string[] = []
    let getBestCalls = 0
    const cred = freshCred("aawalton")
    const deps = makeDeps(writes, {
      getCredentialByAccount: async (account) => {
        getByAccountArgs.push(account)
        return cred
      },
      getBestCredential: async () => {
        getBestCalls += 1
        return null
      },
    })
    const picked = await selectAccountAndWriteCredential(undefined, deps)
    expect(picked).toBe("aawalton")
    expect(getByAccountArgs).toEqual(["aawalton"])
    expect(getBestCalls).toBe(0)
    expect(writes).toEqual([
      { configDir: "/home/test/.claude/accounts/aawalton", account: "aawalton" },
    ])
  })

  it("falls back to getBestCredential when aawalton's page is missing", async () => {
    const getByAccountArgs: string[] = []
    const deps = makeDeps(writes, {
      getCredentialByAccount: async (account) => {
        getByAccountArgs.push(account)
        return null
      },
      getBestCredential: async () => credPick("alanwalton"),
    })
    const picked = await selectAccountAndWriteCredential(undefined, deps)
    expect(picked).toBe("alanwalton")
    expect(getByAccountArgs).toEqual(["aawalton"])
    expect(writes).toEqual([
      { configDir: "/home/test/.claude/accounts/alanwalton", account: "alanwalton" },
    ])
  })
})
