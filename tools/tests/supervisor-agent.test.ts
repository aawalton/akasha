import { beforeEach, describe, expect, it } from "bun:test"
import { selectAccountAndWriteCredential } from "../lib/supervisor-agent.ts"
import {
  expiringCred,
  freshCred,
  makeDeps,
  staleCred,
  type Write,
} from "./supervisor-agent-carried-fixture.ts"

let writes: Write[]

beforeEach(() => {
  writes = []
})

const AT = (account: string) => ({
  configDir: `/home/test/.claude/accounts/${account}`,
  account,
})

describe("selectAccountAndWriteCredential — a token upkeep has kept live", () => {
  it("writes the credential it was given", async () => {
    const deps = makeDeps(writes, { getCredentialByAccount: async () => freshCred("aawalton") })
    expect(await selectAccountAndWriteCredential("aawalton", deps)).toBe("aawalton")
    expect(writes).toEqual([AT("aawalton")])
  })

  it("still writes one inside the reader's buffer, because upkeep being behind does not stop a seat", async () => {
    const deps = makeDeps(writes, { getCredentialByAccount: async () => expiringCred("aawalton") })
    expect(await selectAccountAndWriteCredential("aawalton", deps)).toBe("aawalton")
    expect(writes).toEqual([AT("aawalton")])
  })
})

describe("selectAccountAndWriteCredential — a token that has already expired", () => {
  it("throws for a headless session, naming the account and what renews one", async () => {
    const deps = makeDeps(writes, { getCredentialByAccount: async () => staleCred("aawalton") })
    await expect(selectAccountAndWriteCredential("aawalton", deps)).rejects.toThrow(/aawalton/)
    await expect(selectAccountAndWriteCredential("aawalton", deps)).rejects.toThrow(/upkeep/i)
    expect(writes).toHaveLength(0)
  })

  it("does NOT throw for an interactive session; returns the account and skips the disk write", async () => {
    const deps = makeDeps(writes, { getCredentialByAccount: async () => staleCred("audhdalan") })
    expect(await selectAccountAndWriteCredential("audhdalan", deps, true)).toBe("audhdalan")
    expect(writes).toHaveLength(0)
  })
})
