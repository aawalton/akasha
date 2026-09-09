import { expect, test } from "bun:test"
import { SOURCE_UPDATE_EXIT_CODE } from "../watcher-updating/watcher-updating.module.code.ts"
import {
  dispatchingThrough,
  NO_ACCOUNT_FOR_TOKEN,
  openTokenSession,
  SESSION_NOT_OPEN,
  sessionHold,
  uploadQueue,
  WATCHER_UPDATING,
} from "./watcher-worker.module.code.ts"

const A_TOKEN = `wt_${"0".repeat(64)}`

test("a token the store matches opens a session naming the account the enrolment names", async () => {
  const session = await openTokenSession(
    () => A_TOKEN,
    () => Promise.resolve({ accountPageId: "account-1" })
  )
  expect(await session.auth.getUser()).toEqual({
    data: { user: { id: "account-1" } },
    error: null,
  })
})

test("a token the store matches to no enrolment opens a session carrying no user", async () => {
  const session = await openTokenSession(
    () => A_TOKEN,
    () => Promise.resolve(null)
  )
  expect(await session.auth.getUser()).toEqual({
    data: { user: null },
    error: { message: NO_ACCOUNT_FOR_TOKEN },
  })
})

test("a token that will not read opens a session carrying what went wrong", async () => {
  const session = await openTokenSession(
    () => {
      throw new Error("TEMPER_WATCHER_TOKEN is not set")
    },
    () => Promise.resolve({ accountPageId: "account-1" })
  )
  expect(await session.auth.getUser()).toEqual({
    data: { user: null },
    error: { message: "TEMPER_WATCHER_TOKEN is not set" },
  })
})

test("the token is checked once however often the session is asked", async () => {
  let checked = 0
  const session = await openTokenSession(
    () => A_TOKEN,
    () => {
      checked += 1
      return Promise.resolve({ accountPageId: "account-1" })
    }
  )
  await session.auth.getUser()
  await session.auth.getUser()
  expect(checked).toBe(1)
})

test("the upload queue runs each upload after the one before it ends", async () => {
  const order: string[] = []
  const enqueue = uploadQueue()
  let releaseFirst: (() => void) | undefined
  const first = new Promise<void>((resolve) => {
    releaseFirst = resolve
  })

  enqueue(async () => {
    await first
    order.push("first")
  })
  enqueue(async () => {
    order.push("second")
  })

  expect(order).toEqual([])
  releaseFirst?.()
  await new Promise((resolve) => setTimeout(resolve, 10))
  expect(order).toEqual(["first", "second"])
})

test("an upload that throws leaves the queue ready for the next upload", async () => {
  const order: string[] = []
  const enqueue = uploadQueue()

  enqueue(async () => {
    order.push("threw")
    throw new Error("upload failed")
  })
  enqueue(async () => {
    order.push("after")
  })

  await new Promise((resolve) => setTimeout(resolve, 10))
  expect(order).toEqual(["threw", "after"])
})

test("the updating collaborator carries the source update exit code", () => {
  expect(WATCHER_UPDATING.sourceUpdateExitCode).toBe(SOURCE_UPDATE_EXIT_CODE)
})

test("a session taken before it is open is refused", () => {
  const session = sessionHold<{ name: string }>()
  expect(() => session.take()).toThrow(SESSION_NOT_OPEN)
})

test("the session is opened once and every later take answers that same session", async () => {
  const session = sessionHold<{ name: string }>()
  let opened = 0
  const opening = async (): Promise<{ name: string }> => {
    opened += 1
    return { name: `session-${opened}` }
  }

  const first = await session.hold(opening)
  expect(first.name).toBe("session-1")
  expect(session.take()).toBe(first)
  expect(session.take()).toBe(first)
  expect(opened).toBe(1)
})

test("the dispatch handed to the start carries every path the ask names", async () => {
  const session = sessionHold<never>()
  const dispatching = dispatchingThrough(session.take)
  await expect(
    dispatching({
      fileType: "inventory",
      content: "lua",
      token: "wt_unit",
      serverUrl: "https://example.test",
      sourcePath: "/var/tmp/TemperInventory.lua",
      sourceMtimeMs: 1_700_000_000_000,
      inventoryConfigPath: "/var/tmp/TemperInventoryConfig.lua",
    })
  ).rejects.toThrow(SESSION_NOT_OPEN)
})
