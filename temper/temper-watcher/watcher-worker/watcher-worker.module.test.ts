import { expect, test } from "bun:test"
import { SOURCE_UPDATE_EXIT_CODE } from "../watcher-updating/watcher-updating.module.code.ts"
import {
  dispatchingThrough,
  SESSION_NOT_OPEN,
  sessionHold,
  uploadQueue,
  WATCHER_UPDATING,
} from "./watcher-worker.module.code.ts"

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
