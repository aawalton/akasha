import { beforeEach, describe, expect, mock, test } from "bun:test"
import { Page } from "@shared/pages-core/page-types"

const TOKEN = "wt_0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
const TOKEN_SHA256 = "075ca82e4a533c9dc2cd45cbff379464a0163550bceedae2fd2e9fe27965c773"
const OTHER_TOKEN = "wt_ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
const OTHER_SHA256 = "d9489116f7a295e1dc193d47b60e04f12c31e336e673a6b1638287da2d580c77"

const ENROLMENT_ID = "019dd9b0-5ad8-7e95-9d8f-fccedf449adc"
const ACCOUNT_PAGE = "9ba554f7-cb18-48bb-a709-ec935a895ca7"
const USER_ID = "3f2a1c44-7b9e-4d21-8a55-2c6e0f9b7d13"

let enrolment: Page | null = null
let patchFails: Error | null = null
let patchCalls: unknown[] = []

mock.module("@shared/pages-access/get", () => ({
  getPage: async (): Promise<Page | null> => enrolment,
}))

mock.module("@shared/pages-access/patch", () => ({
  patchPageById: async (args: unknown): Promise<Page | null> => {
    patchCalls.push(args)
    if (patchFails !== null) throw patchFails
    return enrolment
  },
}))

const { validateWatcherToken, watcherTokenHash } = await import("./watcher-auth")

function enrolled(tokenHash: string): Page {
  return Page({
    id: ENROLMENT_ID,
    tokenHash,
    accountUserId: USER_ID,
    accountPage: ACCOUNT_PAGE,
  })
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

  test("refuses when the enrolment states no account", async () => {
    enrolment = Page({
      id: ENROLMENT_ID,
      tokenHash: TOKEN_SHA256,
      accountUserId: USER_ID,
    })
    expect(await validateWatcherToken(TOKEN)).toBeNull()
  })
})

describe("validateWatcherToken grants access", () => {
  test("returns the account and records the use", async () => {
    enrolment = enrolled(TOKEN_SHA256)
    expect(await validateWatcherToken(TOKEN)).toEqual({
      userId: USER_ID,
      accountPageId: ACCOUNT_PAGE,
    })
    expect(patchCalls).toHaveLength(1)
  })

  test("still grants access when recording the use throws, and reports the failure", async () => {
    enrolment = enrolled(TOKEN_SHA256)
    patchFails = new Error("PageTypeNotFileBacked: patchPageById temper-watcher-enrolment")

    const reported: unknown[] = []
    const realError = console.error
    console.error = (...args: readonly unknown[]) => {
      reported.push(args)
    }
    try {
      expect(await validateWatcherToken(TOKEN)).toEqual({
        userId: USER_ID,
        accountPageId: ACCOUNT_PAGE,
      })
    } finally {
      console.error = realError
    }

    expect(patchCalls).toHaveLength(1)
    expect(reported).toHaveLength(1)
  })
})
