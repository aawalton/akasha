
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { shape } from "../lib/shape.ts"

import { handleCredentialFileChange, writeCredentialFile } from "../lib/oauth-file.ts"
import type { OAuthCredential } from "../lib/oauth-types.ts"

let tmpDir: string

function writeCredentialFixture(dir: string, expiresAt: number): undefined {
  writeFileSync(
    join(dir, ".credentials.json"),
    JSON.stringify({
      claudeAiOauth: {
        accessToken: "at",
        refreshToken: "rt",
        expiresAt,
        scopes: [],
        subscriptionType: null,
        rateLimitTier: null,
      },
    })
  )
}

function writeRawCredentialFile(dir: string, raw: string): undefined {
  writeFileSync(join(dir, ".credentials.json"), raw)
}

interface Calls {
  readonly push: ReadonlyArray<{ account: string; credentialDir: string }>
  readonly reauth: readonly string[]
  readonly order: readonly string[]
}

function makeSpies(): {
  calls: Calls
  push: (account: string, credentialDir: string) => Promise<void>
  onReauthDetected: (account: string) => void
} {
  const pushCalls: { account: string; credentialDir: string }[] = []
  const reauthCalls: string[] = []
  const order: string[] = []
  return {
    calls: { push: pushCalls, reauth: reauthCalls, order },
    push: async (account, credentialDir) => {
      pushCalls.push({ account, credentialDir })
      order.push("push")
    },
    onReauthDetected: (account) => {
      reauthCalls.push(account)
      order.push("onReauthDetected")
    },
  }
}

beforeEach(() => {
  tmpDir = mkdtempSync(join("/var/tmp", "oauth-file-test-"))
})

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true })
})

describe("handleCredentialFileChange", () => {
  test("first fire seeds, never re-auth", async () => {
    writeCredentialFixture(tmpDir, 5000)
    const spies = makeSpies()

    const result = await handleCredentialFileChange({
      account: "acme",
      credentialDir: tmpDir,
      prevObservedExpiresAt: null,
      shouldSkip: () => false,
      push: spies.push,
      onReauthDetected: spies.onReauthDetected,
    })

    expect(spies.calls.push.length).toBe(1)
    expect(spies.calls.push[0]).toEqual({ account: "acme", credentialDir: tmpDir })
    expect(spies.calls.reauth.length).toBe(0)
    expect(result.reauthDetected).toBe(false)
    expect(result.observedExpiresAt).toBe(5000)
    expect(result.pushed).toBe(true)
  })

  test("routine refresh (not terminal) — pushes, reauthDetected=true, callback not invoked", async () => {
    writeCredentialFixture(tmpDir, 2000)
    const spies = makeSpies()

    const result = await handleCredentialFileChange({
      account: "acme",
      credentialDir: tmpDir,
      prevObservedExpiresAt: 1000,
      shouldSkip: () => false,
      push: spies.push,
      onReauthDetected: spies.onReauthDetected,
    })

    expect(spies.calls.push.length).toBe(1)
    expect(spies.calls.reauth.length).toBe(0)
    expect(result.reauthDetected).toBe(true)
    expect(result.pushed).toBe(true)
    expect(result.observedExpiresAt).toBe(2000)
  })

  test("terminal + re-auth detected — onReauthDetected then push", async () => {
    writeCredentialFixture(tmpDir, 2000)
    const spies = makeSpies()

    const result = await handleCredentialFileChange({
      account: "acme",
      credentialDir: tmpDir,
      prevObservedExpiresAt: 1000,
      shouldSkip: () => true,
      push: spies.push,
      onReauthDetected: spies.onReauthDetected,
    })

    expect(spies.calls.reauth).toEqual(["acme"])
    expect(spies.calls.push.length).toBe(1)
    expect(spies.calls.push[0]).toEqual({ account: "acme", credentialDir: tmpDir })
    expect(result.reauthDetected).toBe(true)
    expect(result.pushed).toBe(true)
    expect(result.observedExpiresAt).toBe(2000)
  })

  test("terminal + no jump — skip path, no callbacks fire", async () => {
    writeCredentialFixture(tmpDir, 2000)
    const spies = makeSpies()

    const result = await handleCredentialFileChange({
      account: "acme",
      credentialDir: tmpDir,
      prevObservedExpiresAt: 2000,
      shouldSkip: () => true,
      push: spies.push,
      onReauthDetected: spies.onReauthDetected,
    })

    expect(spies.calls.push.length).toBe(0)
    expect(spies.calls.reauth.length).toBe(0)
    expect(result.pushed).toBe(false)
    expect(result.observedExpiresAt).toBe(2000)
    expect(result.reauthDetected).toBe(false)
  })

  test("terminal + file expiresAt less than prev — skip path, no callbacks", async () => {
    writeCredentialFixture(tmpDir, 1500)
    const spies = makeSpies()

    const result = await handleCredentialFileChange({
      account: "acme",
      credentialDir: tmpDir,
      prevObservedExpiresAt: 2000,
      shouldSkip: () => true,
      push: spies.push,
      onReauthDetected: spies.onReauthDetected,
    })

    expect(spies.calls.push.length).toBe(0)
    expect(spies.calls.reauth.length).toBe(0)
    expect(result.pushed).toBe(false)
    expect(result.observedExpiresAt).toBe(1500)
    expect(result.reauthDetected).toBe(false)
  })

  test("missing file — no-op, prevObservedExpiresAt carried through", async () => {
    const spies = makeSpies()

    const result = await handleCredentialFileChange({
      account: "acme",
      credentialDir: tmpDir,
      prevObservedExpiresAt: 1234,
      shouldSkip: () => false,
      push: spies.push,
      onReauthDetected: spies.onReauthDetected,
    })

    expect(spies.calls.push.length).toBe(0)
    expect(spies.calls.reauth.length).toBe(0)
    expect(result.pushed).toBe(false)
    expect(result.observedExpiresAt).toBe(1234)
    expect(result.reauthDetected).toBe(false)
  })

  test("missing file with null prev — observedExpiresAt stays null", async () => {
    const spies = makeSpies()

    const result = await handleCredentialFileChange({
      account: "acme",
      credentialDir: tmpDir,
      prevObservedExpiresAt: null,
      shouldSkip: () => false,
      push: spies.push,
      onReauthDetected: spies.onReauthDetected,
    })

    expect(spies.calls.push.length).toBe(0)
    expect(result.pushed).toBe(false)
    expect(result.observedExpiresAt).toBe(null)
    expect(result.reauthDetected).toBe(false)
  })

  test("malformed JSON — no-op, prev carried through", async () => {
    writeRawCredentialFile(tmpDir, "this is not json {{{")
    const spies = makeSpies()

    const result = await handleCredentialFileChange({
      account: "acme",
      credentialDir: tmpDir,
      prevObservedExpiresAt: 999,
      shouldSkip: () => false,
      push: spies.push,
      onReauthDetected: spies.onReauthDetected,
    })

    expect(spies.calls.push.length).toBe(0)
    expect(spies.calls.reauth.length).toBe(0)
    expect(result.pushed).toBe(false)
    expect(result.observedExpiresAt).toBe(999)
    expect(result.reauthDetected).toBe(false)
  })

  test("JSON missing claudeAiOauth.expiresAt — no-op, prev carried through", async () => {
    writeRawCredentialFile(tmpDir, JSON.stringify({ claudeAiOauth: { accessToken: "at" } }))
    const spies = makeSpies()

    const result = await handleCredentialFileChange({
      account: "acme",
      credentialDir: tmpDir,
      prevObservedExpiresAt: 999,
      shouldSkip: () => false,
      push: spies.push,
      onReauthDetected: spies.onReauthDetected,
    })

    expect(spies.calls.push.length).toBe(0)
    expect(spies.calls.reauth.length).toBe(0)
    expect(result.pushed).toBe(false)
    expect(result.observedExpiresAt).toBe(999)
    expect(result.reauthDetected).toBe(false)
  })

  test("callback ordering: onReauthDetected fires BEFORE push", async () => {
    writeCredentialFixture(tmpDir, 5000)
    const spies = makeSpies()

    await handleCredentialFileChange({
      account: "acme",
      credentialDir: tmpDir,
      prevObservedExpiresAt: 1000,
      shouldSkip: () => true,
      push: spies.push,
      onReauthDetected: spies.onReauthDetected,
    })

    expect(spies.calls.order).toEqual(["onReauthDetected", "push"])
  })
})

function makeCredential(overrides: Partial<OAuthCredential> = {}): OAuthCredential {
  return {
    account: "acme",
    accessToken: "new-at",
    refreshToken: "new-rt",
    expiresAt: 7000,
    scopes: ["user:inference"],
    subscriptionType: "max",
    rateLimitTier: "tier-1",
    ...overrides,
  }
}

const CREDENTIAL_JSON_SCHEMA = shape.record(shape.string(), shape.unknown())

function readCredentialJson(dir: string): Record<string, unknown> {
  return CREDENTIAL_JSON_SCHEMA.parse(
    JSON.parse(readFileSync(join(dir, ".credentials.json"), "utf-8"))
  )
}

describe("writeCredentialFile", () => {
  test("preserves unknown top-level keys, replaces claudeAiOauth", () => {
    const mcpOAuth = {
      "notion|abc123": {
        accessToken: "mcp-at",
        refreshToken: "mcp-rt",
        expiresAt: 999,
        serverName: "notion",
      },
    }
    const someFutureKey = { a: 1 }
    writeRawCredentialFile(
      tmpDir,
      JSON.stringify({
        claudeAiOauth: {
          accessToken: "old-at",
          refreshToken: "old-rt",
          expiresAt: 100,
          scopes: [],
          subscriptionType: null,
          rateLimitTier: null,
        },
        mcpOAuth,
        someFutureKey,
      })
    )

    writeCredentialFile(tmpDir, makeCredential())

    const after = readCredentialJson(tmpDir)
    expect(after.mcpOAuth).toEqual(mcpOAuth)
    expect(after.someFutureKey).toEqual(someFutureKey)
    expect(after.claudeAiOauth).toEqual({
      accessToken: "new-at",
      refreshToken: "new-rt",
      expiresAt: 7000,
      scopes: ["user:inference"],
      subscriptionType: "max",
      rateLimitTier: "tier-1",
    })
  })

  test("fresh write when no file exists — exactly the claudeAiOauth section", () => {
    writeCredentialFile(tmpDir, makeCredential())

    const after = readCredentialJson(tmpDir)
    expect(after).toEqual({
      claudeAiOauth: {
        accessToken: "new-at",
        refreshToken: "new-rt",
        expiresAt: 7000,
        scopes: ["user:inference"],
        subscriptionType: "max",
        rateLimitTier: "tier-1",
      },
    })
  })

  test("malformed existing file does not throw — reset semantics", () => {
    writeRawCredentialFile(tmpDir, "not json {{{")

    expect(() => writeCredentialFile(tmpDir, makeCredential())).not.toThrow()

    const after = readCredentialJson(tmpDir)
    expect(after.claudeAiOauth).toEqual({
      accessToken: "new-at",
      refreshToken: "new-rt",
      expiresAt: 7000,
      scopes: ["user:inference"],
      subscriptionType: "max",
      rateLimitTier: "tier-1",
    })
  })

  test("claudeAiOauth fully replaced, not merged", () => {
    writeRawCredentialFile(
      tmpDir,
      JSON.stringify({
        claudeAiOauth: {
          accessToken: "old-at",
          refreshToken: "old-rt",
          expiresAt: 100,
          scopes: [],
          subscriptionType: null,
          rateLimitTier: null,
          staleField: true,
        },
      })
    )

    writeCredentialFile(tmpDir, makeCredential())

    const after = readCredentialJson(tmpDir)
    expect(after.claudeAiOauth).not.toContainKey("staleField")
  })

  test("reject-and-log: an empty accessToken does NOT overwrite a good on-disk file (#15294)", () => {
    writeCredentialFile(tmpDir, makeCredential())
    writeCredentialFile(tmpDir, makeCredential({ accessToken: "" }))

    const after = readCredentialJson(tmpDir)
    expect(after.claudeAiOauth).toEqual({
      accessToken: "new-at",
      refreshToken: "new-rt",
      expiresAt: 7000,
      scopes: ["user:inference"],
      subscriptionType: "max",
      rateLimitTier: "tier-1",
    })
  })

  test("reject-and-log: an empty refreshToken is refused too, and no file is created from scratch (#15294)", () => {
    writeCredentialFile(tmpDir, makeCredential({ refreshToken: "" }))
    expect(() => readFileSync(join(tmpDir, ".credentials.json"), "utf-8")).toThrow()
  })
})
