import { beforeEach, describe, expect, mock, test } from "bun:test"
import { join } from "node:path"
import { asPage, type Page } from "@akasha/pages-core/page-types"
import { shadowAt } from "@akasha/pages-system/shadow"

const TOKEN = "wt_0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
const TOKEN_SHA256 = "075ca82e4a533c9dc2cd45cbff379464a0163550bceedae2fd2e9fe27965c773"
const OTHER_TOKEN = "wt_ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
const OTHER_SHA256 = "d9489116f7a295e1dc193d47b60e04f12c31e336e673a6b1638287da2d580c77"

const ENROLMENT_ID = "019dd9b0-5ad8-7e95-9d8f-fccedf449adc"
const ACCOUNT_PAGE = "9ba554f7-cb18-48bb-a709-ec935a895ca7"

let enrolment: Page | null = null
let patchFails: Error | null = null
let patchCalls: unknown[] = []

function unreached(name: string): () => never {
  return () => {
    throw new Error(`watcher-token-check: ${name} is not stubbed and must not be reached`)
  }
}

mock.module("@akasha/pages-access/get", () => ({
  getPage: async (): Promise<Page | null> => enrolment,
  getPageByIdSuffix: unreached("getPageByIdSuffix"),
  getPageByIdSuffixAcrossTypes: unreached("getPageByIdSuffixAcrossTypes"),
  getPages: unreached("getPages"),
  shapelessWhy: unreached("shapelessWhy"),
  unfiledWhy: unreached("unfiledWhy"),
}))

mock.module("@akasha/pages-access/patch", () => ({
  patchPage: unreached("patchPage"),
  patchPageById: async (args: unknown): Promise<Page | null> => {
    patchCalls.push(args)
    if (patchFails !== null) throw patchFails
    return enrolment
  },
  patchPages: unreached("patchPages"),
  recordPageView: unreached("recordPageView"),
}))

const { ENROLMENT_KEYS, TEMPER_WATCHER_ENROLMENT_SLUG, validateWatcherToken, watcherTokenHash } =
  await import("./watcher-token-check.module.code.ts")

function enrolled(tokenHash: string): Page {
  return asPage({
    id: ENROLMENT_ID,
    tokenHash,
    accountPage: ACCOUNT_PAGE,
  })
}

async function reporting<T>(run: () => Promise<T>): Promise<{ got: T; said: string[] }> {
  const said: string[] = []
  const realError = console.error
  console.error = (...args: readonly unknown[]) => {
    said.push(args.map(String).join(" "))
  }
  try {
    return { got: await run(), said }
  } finally {
    console.error = realError
  }
}

beforeEach(() => {
  enrolment = null
  patchFails = null
  patchCalls = []
})

describe("watcherTokenHash", () => {
  test("is sha256 of the token, pinned to literals derived outside this codebase", () => {
    expect(watcherTokenHash(TOKEN)).toBe(TOKEN_SHA256)
    expect(watcherTokenHash(OTHER_TOKEN)).toBe(OTHER_SHA256)
  })
})

describe("validateWatcherToken fails closed", () => {
  test("refuses a token of the wrong shape without reaching the store", async () => {
    enrolment = enrolled(TOKEN_SHA256)
    expect(await validateWatcherToken("not-a-watcher-token")).toBeNull()
    expect(await validateWatcherToken(undefined)).toBeNull()
    expect(patchCalls).toHaveLength(0)
  })

  test("refuses when no enrolment matches the presented hash", async () => {
    enrolment = null
    expect(await validateWatcherToken(TOKEN)).toBeNull()
  })

  test("refuses when the stored hash belongs to a different token", async () => {
    enrolment = enrolled(OTHER_SHA256)
    expect(await validateWatcherToken(TOKEN)).toBeNull()
  })
})

describe("validateWatcherToken says why it granted nothing", () => {
  test("refuses when the enrolment states no account, and names the key it wanted", async () => {
    enrolment = asPage({ id: ENROLMENT_ID, tokenHash: TOKEN_SHA256 })
    const { got, said } = await reporting(async () => validateWatcherToken(TOKEN))
    expect(got).toBeNull()
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("accountPage")
    expect(said[0]).toContain(ENROLMENT_ID)
    expect(patchCalls).toHaveLength(0)
  })

  test("refuses when the enrolment states no id, and names the key it wanted", async () => {
    enrolment = asPage({ tokenHash: TOKEN_SHA256, accountPage: ACCOUNT_PAGE })
    const { got, said } = await reporting(async () => validateWatcherToken(TOKEN))
    expect(got).toBeNull()
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("id")
    expect(patchCalls).toHaveLength(0)
  })

  test("says nothing when the token is simply not ours", async () => {
    enrolment = enrolled(OTHER_SHA256)
    const { got, said } = await reporting(async () => validateWatcherToken(TOKEN))
    expect(got).toBeNull()
    expect(said).toHaveLength(0)
  })
})

describe("validateWatcherToken grants access", () => {
  test("returns the account and records the use", async () => {
    enrolment = enrolled(TOKEN_SHA256)
    expect(await validateWatcherToken(TOKEN)).toEqual({ accountPageId: ACCOUNT_PAGE })
    expect(patchCalls).toHaveLength(1)
  })

  test("still grants access when recording the use throws, and reports the failure", async () => {
    enrolment = enrolled(TOKEN_SHA256)
    patchFails = new Error("PageTypeNotFileBacked: patchPageById temper-watcher-enrolment")

    const { got, said } = await reporting(async () => validateWatcherToken(TOKEN))
    expect(got).toEqual({ accountPageId: ACCOUNT_PAGE })
    expect(patchCalls).toHaveLength(1)
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("tokenLastUsedAt")
  })
})

describe("the keys this module selects are keys the page type declares", () => {
  const declared = new Set(
    shadowAt(join(import.meta.dir, "..", "..", ".."))
      .index.propertiesOf(TEMPER_WATCHER_ENROLMENT_SLUG)
      .map((one) => one.key)
  )

  test("the instrument is alive: the page type declares the properties it is known to", () => {
    expect(declared.has("tokenHash")).toBe(true)
    expect(declared.has("token")).toBe(true)
    expect(declared.has("tokenLastUsedAt")).toBe(true)
    expect(declared.has("title")).toBe(true)
    expect(declared.has("id")).toBe(true)
  })

  test("every selected key is declared", () => {
    for (const key of ENROLMENT_KEYS) {
      expect([key, declared.has(key)]).toEqual([key, true])
    }
  })

  test("accountUserId, the key the defect asked for, is declared nowhere in the chain", () => {
    expect(declared.has("accountUserId")).toBe(false)
  })
})
